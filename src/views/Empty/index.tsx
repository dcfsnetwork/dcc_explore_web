import Search from '@/components/Search'
import empty from '../../assets/search_empty.png'
import style from './index.module.scss'

const SearchEmpty: React.FC = () => {
  return (
    <>
      <div className="search_box">
        <Search />
      </div>
      <div className={style.empty}>
        <div className="d-title">Search not found</div>
        <img src={empty} alt="" style={{ margin: 20 }} />
        <div className="font-20" style={{ color: '#34343c', marginBottom: 20 }}>
          Sorry,search result is empty,please try again,thank you.
        </div>
        <div>
          <a href="/"> Back Home</a>
        </div>
      </div>
    </>
  )
}

export default SearchEmpty
