import shortid from 'shortid'
import style from './index.module.scss'

const Loading: React.FC<{ loading?: boolean }> = ({ loading = true, children }) => {
  return (
    <>
      {loading ? (
        <div className={style['loading-wrap']}>
          <div className={style['loading']}>
            {new Array(5).fill('').map(() => (
              <span key={shortid.generate()}></span>
            ))}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default Loading
