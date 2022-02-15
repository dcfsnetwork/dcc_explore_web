import ListContainer from '@/components/ListContainer'
import useGetTxs from '@/hooks/useGetTxList'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import right from '@/assets/right.svg'
import page from '@/assets/page.png'
import { Tooltip } from 'antd'

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
  const { pathname } = useLocation()

  const block = Number(pathname.slice(5))
  const [params, setParams] = useState({
    blockNumber: block,
    page: 1,
    count: 10
  })
  const { txs, txsloading } = useGetTxs(params.page, params.count, params.blockNumber)
  const columns = [
    {
      title: 'Txn Hash',
      dataIndex: 'hash',
      width,
      key: 'hash',
      render: render('/tx/')
    },
    // {
    //   title: 'Method',
    //   dataIndex: 'Method',
    //   key: 'Method'
    // },
    {
      title: 'Block',
      dataIndex: 'blockNumber',
      key: 'blockNumber',
      render: render('/block/', 'fit-content', { display: 'inline' })
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
      render: (text: any) => <>{text.value15} DCC</>
    },
    {
      title: '[ Txn Fee ]',
      dataIndex: 'fee',
      key: 'fee',
      render: (text: any) => <>{text} DCC</>
    }
  ]
  const length = Number(txs?.totalCount)

  return (
    <>
      <ListContainer
        title={'Transactions'}
        loading={!txsloading}
        subTitle={<>{length > params.count ? ` ${txs?.totalCount} transactions found` : ''}</>}
        data={txs?.txList}
        columns={columns}
        pagination={{
          position: ['topRight', 'bottomRight'],
          onChange: (page: any, pageSize: any) => {
            setParams((pre: any) => {
              return { ...pre, ...{ page, count: pageSize } }
            })
          },
          total: txs?.totalCount,
          current: params.page
        }}
      />
    </>
  )
}

export default List
