import ListContainer from '@/components/ListContainer'
import useGetBlocks from '@/hooks/useGetBlockList'
import { Tooltip } from 'antd'
import { useState } from 'react'

const columns = [
  {
    title: 'Block',
    dataIndex: 'blockNumber',
    key: 'blockNumber',
    render: (text: any) => (
      <a className="g-c" href={`/block/${text}`}>
        {text}
      </a>
    )
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
    title: 'Txn',
    dataIndex: 'transactionCount',
    key: 'transactionCount'
  },
  {
    title: 'Validator',
    dataIndex: 'validator',
    key: 'validator',
    render: (text: any) => (
      <a className="g-c" href={`/address/${text}`}>
        {text}
      </a>
    )
  },
  {
    title: 'Reward',
    dataIndex: 'blockReward',
    key: 'blockReward',
    render: (text: any) => <>{text} DCC</>
  }
]

const List: React.FC = () => {
  const [params, setParams] = useState({
    page: 1,
    count: 10
  })
  const { blocks, blockloading } = useGetBlocks(params.page, params.count)

  const length = blocks?.blockList.length || 0

  const subTitle = (
    <>
      {length >= 10
        ? `Blocks #${blocks?.blockList[blocks.blockList.length - 1]?.blockNumber} to #  ${blocks?.blockList[0].blockNumber}(Total of ${
            blocks?.totalCount
          } blocks)`
        : ''}
    </>
  )

  return (
    <>
      <ListContainer
        title={'Blocks'}
        loading={!blockloading}
        subTitle={subTitle}
        data={blocks?.blockList}
        columns={columns}
        pagination={{
          position: ['topRight', 'bottomRight'],
          onChange: (page: any, pageSize: any) => {
            setParams((pre: any) => {
              return { ...pre, ...{ page, count: pageSize } }
            })
          },
          hideOnSinglePage: true,
          total: blocks?.totalPage,
          current: params.page
        }}
      />
    </>
  )
}

export default List
