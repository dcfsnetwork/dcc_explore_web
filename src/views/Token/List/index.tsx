import ListContainer from '@/components/ListContainer'
import { useState } from 'react'
import right from '@/assets/right.svg'
import page from '@/assets/page.png'
import { Tooltip } from 'antd'
import useGetTokenList from '@/hooks/useGetTokenTransfer'
import TokenIcon from '@/components/TokenIcon/Index'

const width = 150
const css = {
  display: 'inline-block',
  width: '90%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: '12px'
}

const icon_2 = <img style={{ marginLeft: 25 }} src={right} alt="" />
const icon_1 = (
  <Tooltip title="Contract">
    <img style={{ marginRight: 25, cursor: 'pointer' }} src={page} alt="" />
  </Tooltip>
)

const render = (url: any, cewidth?: any, style?: any, img_1?: any, img_2?: any) => {
  return (text: any) => (
    <div style={{ width: cewidth || width }}>
      <span style={{ whiteSpace: 'nowrap' }}>
        {text.type && img_1}
        <a className="g-c" style={style || css} href={`${url}${text}`}>
          {text.address || text}
        </a>
        {img_2}
      </span>
    </div>
  )
}

const List: React.FC = () => {
  const [params, setParams] = useState({
    page: 1,
    count: 10
  })
  const { token, tokenloading } = useGetTokenList(params.page, params.count)

  const columns = [
    {
      title: 'Txn Hash',
      dataIndex: 'transactionHash',
      width,
      key: 'transactionHash',
      render: render('/tokentransfer/')
    },
    {
      title: 'Age',
      dataIndex: 'time',
      key: 'time',
      render: (text: any) => (
        <Tooltip title={text.utc}>
          <span style={{ cursor: 'pointer' }}>{text.ago}</span>
        </Tooltip>
      )
    },
    {
      title: 'From',
      width: 260,
      dataIndex: 'from',
      key: 'from',
      render: render('/address/', '', '', icon_1, icon_2)
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render: render('/address/', '', '', icon_1)
    },
    {
      title: 'Value',
      dataIndex: 'val',
      key: 'val',
      render: (text: any) => <>{text.value15}</>
    },
    {
      title: 'Token',
      dataIndex: 'type',
      key: 'type',
      render: (text: any) => (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TokenIcon symbol={text.icon} size="18px" /> &nbsp;{text.name}
          </div>
        </>
      )
    }
  ]

  return (
    <>
      <ListContainer
        loading={!tokenloading}
        subTitle={
          <>
            TokenTransfers<span style={{ padding: '3px 5px', backgroundColor: '#f0f0f0', marginLeft: '10px' }}>DEP-20</span>
          </>
        }
        data={token?.tokenTxList}
        columns={columns}
        pagination={{
          position: ['topRight', 'bottomRight'],
          onChange: (page: any, pageSize: any) => {
            setParams((pre: any) => {
              return { ...pre, ...{ page, count: pageSize } }
            })
          },
          total: token?.totalCount,
          current: params.page
        }}
      />
    </>
  )
}

export default List
