import { Skeleton } from 'antd'
import style from './index.module.scss'

interface LoadingProps {
  title?: any
  isBlock?: boolean
}

const DetailLoading: React.FC<LoadingProps> = ({ title, isBlock }) => {
  const blockData = ['Block Height:', 'Timestamp:', 'Transactions:', 'Validated by:', 'Block Reward:', 'Hash:', 'Parent Hash:', 'Sha3Uncles:', 'Nonce:']
  const txData = ['Transaction Hash:', 'Status:', 'Block:', 'Timestamp:', 'From:', 'To:', 'Value:', 'Transaction Fee:', 'Gas Limit:', 'Gas Price:', 'Nonce']
  const data = isBlock ? blockData : txData
  return (
    <div className={style.box}>
      <div className="d-title">{title}</div>
      <div className={style.table}>
        <div>Overview</div>
        {data.map((item, index) => (
          <div className={style.item} key={index}>
            <div>{item}</div>
            <div>
              <Skeleton.Input active size="small" style={{ width: 250 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetailLoading
