import style from './index.module.scss'

interface DetailProps {
  title: any
  children: any
}

const DetailTable: React.FC<DetailProps> = ({ title, children }) => {
  return (
    <div className={style.box}>
      <div className="d-title">{title}</div>
      <div className={style.table}>
        <div>Overview</div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DetailTable
