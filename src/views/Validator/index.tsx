import { _getValidator } from '@/config/http'
import { ValidatorListDataType } from '@/config/type'
import { CHANGE_NUMBER, GET_PERCENTAGE } from '@/config/util'
import { Table } from 'antd'
import Search from '../../components/Search'
import { useCallback, useEffect, useState } from 'react'
import shortid from 'shortid'
import style from './index.module.scss'

const width = 150
const css = {
  display: 'inline-block',
  width: '90%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: '12px'
}
const render = (url: any, cewidth?: any, style?: any) => {
  return (text: any) => (
    <div style={{ width: cewidth || width }}>
      <a className="g-c" style={style || css} href={`${url}${text}`}>
        {text}
      </a>
    </div>
  )
}

const columns = [
  {
    title: 'Validator',
    dataIndex: 'address',
    width,
    key: 'address',
    render: render('/address/')
  },
  {
    title: 'The pledge number',
    dataIndex: 'totalVote',
    key: 'totalVote'
  },
  {
    title: 'The pledge weight ',
    dataIndex: 'totalVoteRate',
    key: 'totalVoteRate',
    render: (text: any) => <>{text} %</>
  },
  {
    title: 'The total reward',
    dataIndex: 'totalReward',
    key: 'totalReward',
    render: (text: any) => <>{text} DCC</>
  },
  {
    title: 'The reward',
    dataIndex: 'reward24hours',
    key: 'reward24hours',
    render: (text: any) => <>{text} DCC</>
  },
  {
    title: 'State ',
    dataIndex: 'active',
    key: 'active',
    render: (text: any) => (
      <div style={{ backgroundColor: '#e9f4f0', textAlign: 'center', width: '71.55px', height: '22px', lineHeight: '20px', borderRadius: 3 }} className="g-c">
        {text}
      </div>
    )
  }
]

const Validator: React.FC = () => {
  const [data, setData] = useState<ValidatorListDataType>()
  const [params, setParams] = useState({
    page: 1,
    count: 10
  })
  const [Vloading, setLoading] = useState<boolean>()
  const getValidator = useCallback(async () => {
    try {
      const newdata = await _getValidator({ page: params.page, count: params.count })
      newdata?.validatorList.forEach((item: any) => {
        item?.active === 1 ? (item.active = 'active') : (item.active = '')
        item.reward24hours = CHANGE_NUMBER(item.reward24hours, 18, 18)
        item.totalReward = CHANGE_NUMBER(item.totalReward, 18, 18)
        item.totalVote = CHANGE_NUMBER(item.totalVote, 18, 18)
        item.totalVoteRate = GET_PERCENTAGE(item.totalVoteRate)
      })
      setData(newdata)
      setLoading(true)
    } catch (error) {
      throw error
    }
  }, [params])

  useEffect(() => {
    getValidator()
  }, [getValidator])

  return (
    <>
      <div className="search_box">
        <Search />
      </div>
      <div className={style.validator}>
        <div className="d-title">Verifier</div>
        <div className={style.verBox}>
          <div>
            <Table
              rowKey={() => shortid.generate()}
              columns={columns}
              loading={!Vloading}
              dataSource={data?.validatorList}
              pagination={{
                onChange: (page: any, pageSize: any) => {
                  setParams((pre: any) => {
                    return { ...pre, ...{ page, count: pageSize } }
                  })
                },
                total: data?.totalCount,
                current: params.page
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Validator
