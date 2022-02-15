import style from './index.module.scss'

const ContentContainer: React.FC = ({ children }) => {
  return (
    <div className={style.bg}>
      <div className={style.content}>{children}</div>
    </div>
  )
}

export default ContentContainer
