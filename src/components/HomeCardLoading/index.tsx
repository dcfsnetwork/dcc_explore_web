import { Skeleton } from 'antd'
import style from './index.module.scss'

const CardLoading: React.FC = () => {
  return (
    <>
      {new Array(5).fill('').map((item, index) => (
        <div className={style.loading} style={{ padding: '10px 0' }} key={index}>
          <div>
            {item}
            <Skeleton.Button active size="small" shape="square" style={{ height: '44px' }} />
          </div>
          <div>
            <Skeleton.Input active size="small" style={{ width: 70, height: 18 }} />
            <Skeleton.Input active size="small" style={{ width: 70, height: 18 }} />
          </div>
          <div>
            <Skeleton.Input active size="small" style={{ width: 190, height: 18 }} />
            <Skeleton.Input active size="small" style={{ width: 190, height: 18 }} />
          </div>
          <div>
            <Skeleton.Input active size="small" style={{ width: 60, height: 28, borderRadius: '15px  0 0 15px' }} />
          </div>
        </div>
      ))}
    </>
  )
}

export default CardLoading
