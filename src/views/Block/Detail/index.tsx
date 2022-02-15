import DetailTable from '@/components/Detail'
import ListItem from '@/components/ListItem'
import useGetBlock from '@/hooks/useGetBlockDetail'
import { useLocation } from 'react-router-dom'
import { LeftSquareTwoTone, RightSquareTwoTone } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import clock from '@/assets/clock.svg'
import DetailLoading from '@/components/DetailLoading'
import useGetSummary from '@/hooks/useGetSummary'

const Detail: React.FC = () => {
  const { pathname } = useLocation()
  const blockNum = pathname.slice(7)
  const { block, blockLoading } = useGetBlock(blockNum)
  const { data } = useGetSummary()

  const title = (
    <div>
      Blocks<span className="l-c font-16"> #{blockNum}</span>
    </div>
  )

  const aside = [
    {
      left: 'Block Height:',
      children: (
        <>
          {block?.blockNumber}
          <Tooltip title={Number(block?.blockNumber) - 1 < 0 ? 'You have reached the earliest block' : 'View previous block'}>
            <Button
              href={`/block/${Number(block?.blockNumber) - 1}`}
              disabled={Number(block?.blockNumber) - 1 < 0}
              size="small"
              type="link"
              icon={<LeftSquareTwoTone twoToneColor={'#00C299'} />}
              style={{ marginLeft: 15 }}
            />
          </Tooltip>
          <Tooltip title={block?.blockNumber === data?.height ? 'You have reached the latest block' : 'View next block'}>
            <Button
              href={`/block/${Number(block?.blockNumber) + 1}`}
              disabled={block?.blockNumber === data?.height}
              size="small"
              type="link"
              icon={<RightSquareTwoTone twoToneColor={'#00C299'} />}
            />
          </Tooltip>
        </>
      )
    },
    {
      left: 'Timestamp:',
      children: (
        <>
          <img src={clock} style={{ width: 18, marginRight: 5, position: 'relative', top: -2 }} alt="" />
          {block?.ago} ({block?.blockTime})
        </>
      )
    },
    {
      left: 'Transactions:',
      children:
        block?.transactionCount === 0 ? (
          <>
            <span style={{ padding: '5px 10px', backgroundColor: 'rgba(88, 97, 106, 0.1)', borderRadius: 5 }}>{block?.transactionCount} transaction </span>
            <span style={{ paddingLeft: 5 }}> in this block</span>
          </>
        ) : (
          <>
            <a style={{ padding: '5px 10px', marginRight: 5, backgroundColor: '#e9f4ff', borderRadius: 5 }} href={`/txs/${block?.blockNumber}`}>
              {block?.transactionCount} transactions
            </a>
            in this block
          </>
        )
    },
    {
      left: 'Validated by:',
      children: (
        <>
          <a href={`/address/${block?.validator}`}>{block?.validator}</a>
        </>
      )
    },
    {
      left: 'Block Reward:',
      children: <>{block?.blockReward} DCC</>
    },
    {
      left: 'Hash:',
      children: <>{block?.blockHash}</>
    },
    {
      left: 'Parent Hash:',
      children: (
        <>
          <a href={`/block/${block?.parentHash}`}>{block?.parentHash}</a>
        </>
      )
    },
    {
      left: 'Sha3Uncles:',
      children: <>{block?.sha3Uncle}</>
    },
    {
      left: 'Nonce:',
      children: <>{block?.nonce}</>
    }
  ]

  return (
    <>
      {blockLoading ? (
        <DetailTable title={title}>
          {aside.map((item, index) => (
            <ListItem key={index} left={item.left} children={item.children} />
          ))}
        </DetailTable>
      ) : (
        <DetailLoading isBlock={true} title={title} />
      )}
    </>
  )
}

export default Detail
