import style from './index.module.scss'

interface SwitcherProps {
  title: string
  data: {
    name: string
    icon: string
  }
}

const SwitcherItem: React.FC<SwitcherProps> = ({ title, data }) => (
  <>
    <div className={style.switcher_item}>
      <div className="font-16 l-c">{title}</div>
      <div>
        <img src={data.icon} alt="" />
        <div>{data.name}</div>
      </div>
    </div>
  </>
)
export default SwitcherItem
