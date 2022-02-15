import icon1 from '@/assets/summary1.png'
import icon2 from '@/assets/summary2.png'
import icon3 from '@/assets/summary3.png'
import icon4 from '@/assets/summary4.png'
import useGetSummary from '@/hooks/useGetSummary'
import { Skeleton } from 'antd'
import Echart from './echart'
import style from './index.module.scss'

const ChartPart: React.FC = () => {
  const { data, summaryLoading, price, rate, dccPrice, totalPrice } = useGetSummary()

  return (
    <>
      {summaryLoading ? (
        <div className={style.cardBox}>
          <div>
            <div className={style['subBox1']}>
              <div>
                <img src={icon1} alt="" />
                <div className="font-14">
                  DCC <span className="l-c">MARKET CAP ON</span> DCFS
                  <div className="font-12" style={{ marginTop: 10 }}>
                    ${totalPrice}
                    <span className="font-10">
                      &nbsp;(<span className="l-c">{dccPrice}</span> DCC)
                    </span>
                  </div>
                </div>
              </div>
              <div></div>
              <div>
                <img src={icon2} alt="" />
                <span>
                  <div className="font-14 l-c">LATEST BLOCK</div>
                  <div>
                    <a href="/blocks">
                      {data?.height}
                      {<span className="font-6">(6.0s)</span>}
                    </a>
                  </div>
                </span>
                <span>
                  <div className="font-14 l-c">TRANSACTIONS</div>
                  <div>
                    <a href="/txs">{data?.tx_num}</a>
                  </div>
                </span>
              </div>
            </div>
            <div className={style['subBox2']}>
              <div>
                <img src={icon3} alt="" />
                <span>
                  <div className="font-14">
                    DCC <span className="l-c">PRICE</span>
                  </div>
                </span>
                <span>
                  ${price}
                  <span className="g-c">({rate}%)</span>
                </span>
              </div>

              <div></div>
              <div>
                <img src={icon4} alt="" />
                <span>
                  <div className="l-c">ACTIVE VALIDATOR</div>
                  <div>
                    <a href="/validators">{21}</a>
                  </div>
                </span>
              </div>
            </div>
          </div>
          <Echart data={data?.last_14_days_tx_count} />
        </div>
      ) : (
        <>
          <div className={style.cardBox}>
            <div>
              <div className={style['subBox1']}>
                <div>
                  <img src={icon1} alt="" />
                  <Skeleton.Input active size="small" style={{ width: 100, height: 20, marginLeft: 24 }} />
                  <Skeleton.Input active size="small" style={{ width: 70, height: 20 }} />
                </div>
                <div></div>
                <div>
                  <img src={icon2} alt="" />
                  <Skeleton.Input active size="small" style={{ width: 100, height: 20, marginLeft: 24 }} />
                  <Skeleton.Input active size="small" style={{ width: 70, height: 18 }} />
                </div>
              </div>
              <div className={style['subBox2']}>
                <div>
                  <img src={icon3} alt="" />
                  <Skeleton.Input active size="small" style={{ width: 100, height: 20, marginLeft: 24 }} />
                  <Skeleton.Input active size="small" style={{ width: 70, height: 20 }} />
                </div>
                <div></div>
                <div>
                  <img src={icon4} alt="" />
                  <Skeleton.Input active size="small" style={{ width: 100, height: 20, marginLeft: 24 }} />
                  <Skeleton.Input active size="small" style={{ width: 70, height: 18 }} />
                </div>
              </div>
            </div>
            <div className={style.echart}>
              <div className="font-18">
                DCFS <span className="l-c font-16">&nbsp; TRANSACTION HISTORY LAST 14 DAYS</span>
              </div>
              <Skeleton.Input active size="small" style={{ width: '100%', height: '87.1%', borderRadius: '0 0 15px 15px' }} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ChartPart
