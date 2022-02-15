import Copy from '@/components/Copy'
import DetailTable from '@/components/Detail'
import ListItem from '@/components/ListItem'
import useGetTx from '@/hooks/useGetTxDetail'
import { useHistory } from 'react-router-dom'
import clock from '@/assets/clock.svg'
import right from '@/assets/token_right.svg'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { Skeleton } from 'antd'
import style from './index.module.scss'
import DetailLoading from '@/components/DetailLoading'
import TokenIcon from '@/components/TokenIcon/Index'

const Detail: React.FC = () => {
  const history = useHistory()
  const hash = history.location.pathname.slice(15)
  const { tx, txLoading } = useGetTx(hash)

  const aside = [
    {
      left: 'Transaction Hash:',
      children: (
        <>
          {tx?.hash}&nbsp;&nbsp;&nbsp;&nbsp;
          <Copy text={tx?.hash} />
        </>
      )
    },
    {
      left: 'Status:',
      children: (
        <>
          <span style={{ padding: '5px 10px', backgroundColor: '#DFF3EC', borderRadius: 5 }}>
            <CheckCircleTwoTone twoToneColor={'#00C299'} style={{ marginRight: 5 }} />
            {tx?.status}
          </span>
        </>
      )
    },
    {
      left: 'Block:',
      children: (
        <>
          <a href={`/block/${tx?.blockNumber}`}>{tx?.blockNumber}</a>
        </>
      )
    },
    {
      left: 'Timestamp:',
      children: (
        <>
          <img src={clock} style={{ width: 18, marginRight: 5, position: 'relative', top: -2 }} alt="" />
          {tx?.ago}({tx?.blockTime})
        </>
      )
    },
    {
      left: 'From:',
      children: (
        <>
          {tx?.fromType} <a href={`/address/${tx?.from}`}>{tx?.from}</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <Copy text={tx?.from} />
        </>
      )
    },
    {
      left: 'To:',
      children: (
        <>
          {tx?.toType} <a href={`/address/${tx?.to}`}>{tx?.to}</a>&nbsp;&nbsp;&nbsp;&nbsp;
          {tx?.to && <Copy text={tx?.to} />}
        </>
      )
    },
    {
      left: 'Tokens Transferred:',
      children: (
        <>
          {tx?.tokenTransfer.map((item, index) => (
            <div key={index} className={style.item}>
              <span>
                <img src={right} alt="" />
                &nbsp; From&nbsp;
                <a className={style.text} href={`/address/${item.from}`} title={item.from}>
                  {item.from}
                </a>
                &nbsp; To&nbsp;
                <a className={style.text} href={`/address/${item.to}`} title={item.to}>
                  {item.to}
                </a>
                &nbsp; For&nbsp; {item.value} &nbsp;{<TokenIcon symbol={item.symbol} />} &nbsp;{item.symbol}
              </span>
            </div>
          ))}
        </>
      )
    },
    {
      left: 'Value:',
      children: (
        <>
          <span style={{ padding: '5px 10px', backgroundColor: 'rgba(88, 97, 106, 0.1)', borderRadius: 5 }}>
            {tx?.value} DCC (${tx?.val.dollar})
          </span>
        </>
      )
    },
    {
      left: 'Transaction Fee:',
      children: (
        <>
          {tx?.fee} DCC (${tx?.feeVal.dollar})
        </>
      )
    },
    { left: 'Gas Limit:', children: <>{tx?.gasLimit}</> },
    {
      left: 'Gas Price:',
      children: (
        <>
          {tx?.gasPrice} DCC ({tx?.gasPriceGwei} Gwei)
        </>
      )
    },
    {
      left: 'Nonce',
      children: <>{txLoading ? tx?.nonce : <Skeleton.Input active size="small" style={{ width: 70, height: 20, display: 'inline-block' }} />}</>
    }
  ]

  return (
    <>
      {txLoading ? (
        <DetailTable title={'Transaction Details'}>
          {aside.map((item, index) => (
            <ListItem key={index} left={item.left} children={item.children} />
          ))}
        </DetailTable>
      ) : (
        <DetailLoading title={'Transaction Details'} />
      )}
    </>
  )
}

export default Detail
