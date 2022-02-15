import style from './index.module.scss'

interface DetailProps {
  left: any
  children: any
}

const DetailTable: React.FC<DetailProps> = ({ left, children }) => {
  return (
    <div className={style.listItem}>
      <div>{left}</div>
      <div>{children}</div>
    </div>
  )
}

export default DetailTable
