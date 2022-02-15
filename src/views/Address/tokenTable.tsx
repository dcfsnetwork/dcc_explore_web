import TokenIcon from '@/components/TokenIcon/Index'
import useGetAddressTokenList from '@/hooks/useGetAddressToken'
import { Table, Tooltip } from 'antd'
import { useState } from 'react'
import shortid from 'shortid'

interface TokenProps {
  address: any
  width: any
  render: any
}

const TokenTable: React.FC<TokenProps> = ({ address, width, render }) => {
  const [params, setParams] = useState({
    address,
    page: 1,
    count: 10
  })
  const columns = [
    {
      title: 'Txn Hash',
      dataIndex: 'transactionHash',
      width: 150,
      key: 'transactionHash',
      render: render('/tx/')
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
      dataIndex: 'val',
      key: 'val',
      render: (text: any) => <div>{text.value15}</div>
    },
    {
      title: 'Token',
      dataIndex: 'type',
      key: 'type',
      render: (text: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TokenIcon symbol={text.icon} size="18px" />
          &nbsp;{text.name}
        </div>
      )
    }
  ]

  const { token, tokenloading } = useGetAddressTokenList(params.page, params.count, params.address)

  return (
    <>
      <Table
        rowKey={() => shortid.generate()}
        columns={columns}
        dataSource={token?.tokenTxList}
        loading={!tokenloading}
        pagination={{
          position: ['bottomRight'],
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

export default TokenTable
