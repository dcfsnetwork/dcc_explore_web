import useGetAddressTxs from '@/hooks/useGetAddressTxList'
import { Table, Tooltip } from 'antd'
import { useState } from 'react'
import shortid from 'shortid'

interface TranProps {
  address: any
  width: any
  render: any
}

const TransTable: React.FC<TranProps> = ({ address, width, render }) => {
  const [params, setParams] = useState({
    address,
    page: 1,
    count: 10
  })

  const columns = [
    {
      title: 'Txn Hash',
      dataIndex: 'hash',
      width: 150,
      key: 'hash',
      render: render('/tx/')
    },
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
      dataIndex: 'from',
      width,
      key: 'from',
      render: render('/address/')
    },
    {
      title: 'To',
      dataIndex: 'to',
      width,
      key: 'to',
      render: render('/address/')
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text: any) => <div>{text} DCC</div>
    },
    {
      title: '[ Txn Fee ]',
      dataIndex: 'fee',
      key: 'fee',
      render: (text: any) => <div>{text} DCC</div>
    }
  ]

  const { addresstxs, addressLoading } = useGetAddressTxs(params.page, params.count, params.address)

  return (
    <>
      <Table
        rowKey={() => shortid.generate()}
        columns={columns}
        dataSource={addresstxs?.txList}
        loading={!addressLoading}
        pagination={{
          position: ['bottomRight'],
          onChange: (page: any, pageSize: any) => {
            setParams((pre: any) => {
              return { ...pre, ...{ page, count: pageSize } }
            })
          },
          total: addresstxs?.totalCount,
          current: params.page
        }}
      />
    </>
  )
}

export default TransTable
