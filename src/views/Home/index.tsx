import Search from '../../components/Search'
import Card from './card'
import ChartPart from './chartPart'
import style from './index.module.scss'

const Home: React.FC = () => {
  return (
    <div>
      <div className="d-title">Distributed Computing File System Explorer</div>
      <div className={style.search_box}>
        <Search />
      </div>
      <ChartPart />
      <Card />
    </div>
  )
}

export default Home
