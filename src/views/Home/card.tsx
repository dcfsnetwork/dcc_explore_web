import Empty from '@/components/Empty'
import CardLoading from '@/components/HomeCardLoading'
import useGetBlocks from '@/hooks/useGetBlockList'
import useGetTxs from '@/hooks/useGetTxList'
import style from './index.module.scss'

const Card: React.FC = () => {
  const { txs, txsloading } = useGetTxs(1, 10)
  const { blocks, blockloading } = useGetBlocks(1, 10)

  return (
    <>
      <div className={style['card']}>
        <div>
          <div className="font-20">Latest Blocks</div>
          <div className={style.list}>
            {blockloading || <CardLoading />}
            {blocks?.totalPage ? (
              blocks?.blockList.map((item, index) => (
                <div className={style.listItem} key={index}>
                  <div className="bg-green">Bk</div>
                  <div className="g-c">
                    <a href={`/block/${item.blockNumber}`}>{item.blockNumber}</a>
                    <div className="l-c font-12">{item.time.ago}</div>
                  </div>
                  <div>
                    <div>
                      Validated By
                      <span>
                        <a
                          className="g-c"
                          style={{
                            display: 'inline-block',
                            width: '50%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            lineHeight: '12px'
                          }}
                          href={`/address/${item.validator}`}>
                          &nbsp;{item.validator}
                        </a>
                      </span>
                    </div>

                    <div className="font-12">
                      <span className="g-c">
                        {item.transactionCount === 0 ? (
                          <span className="l-c">{item.transactionCount} txns</span>
                        ) : (
                          <a href={`/txs/${item.blockNumber}`}>{item.transactionCount} txns</a>
                        )}
                      </span>
                      <span className="l-c">&nbsp; in 6 secs</span>
                    </div>
                  </div>
                  <div className="bg-gray">{item.blockReward} DCC</div>
                </div>
              ))
            ) : (
              <Empty width="60%" />
            )}
          </div>
          <a href="/blocks">
            <div className="font-18">View all blocks</div>
          </a>
        </div>
        <div className="txs">
          <div className="font-20">Latest Transactions</div>
          <div className={style.list}>
            {txsloading || <CardLoading />}
            {txs?.totalPage ? (
              txs?.txList.map((item, index) => (
                <div className={style.listItem} key={index}>
                  <div className="bg-green">Tx</div>
                  <div className="g-c">
                    <div style={{ width: '80%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <a href={`/tx/${item.hash}`} title={item.hash}>
                        {item.hash}
                      </a>
                    </div>
                    <div className="l-c font-12">{item.time.ago}</div>
                  </div>
                  <div>
                    <div>
                      <span>From</span>
                      <a href={`/address/${item.from}`}>
                        <span
                          className="g-c"
                          style={{
                            display: 'inline-block',
                            width: '80%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            lineHeight: '12px'
                          }}>
                          &nbsp;&nbsp;{item.from}
                        </span>
                      </a>
                    </div>
                    <div className="font-12">
                      <span>To </span>
                      <a href={`/address/${item.to}`}>
                        <span
                          className="g-c"
                          style={{
                            display: 'inline-block',
                            width: '85%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            lineHeight: '16px',
                            position: 'relative',
                            top: '3px'
                          }}>
                          &nbsp;{item.to}
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="bg-gray">{item.val.value5} DCC</div>
                </div>
              ))
            ) : (
              <Empty width="60%" />
            )}
          </div>
          <a href="/txs">
            <div className="font-18">View all transactions</div>
          </a>
        </div>
      </div>
    </>
  )
}

export default Card
