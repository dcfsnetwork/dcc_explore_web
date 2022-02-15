import empty from '../../assets/empty.png'
import style from './index.module.scss'

interface EmptyProps {
  width?: string
}

const Empty: React.FC<EmptyProps> = ({ width }) => {
  return (
    <>
      <div className={style.empty}>
        <img src={empty} alt="" style={{ width }} />
        <div className="font-20" style={{ color: '#34343c', marginBottom: 20 }}>
          There are no matching entries
        </div>
      </div>
    </>
  )
}

export default Empty
