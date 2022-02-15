import style from './index.module.scss'
import { Table } from 'antd'
import shortid from 'shortid'

interface ListProps {
  title?: any
  subTitle?: any
  data?: any
  columns?: any
  total?: any
  pagination?: any
  loading?: boolean
}

const ListContainer: React.FC<ListProps> = ({
  title,
  subTitle,
  data,
  columns,
  total,
  loading,
  pagination = { position: ['topRight', 'bottomRight'], total }
}) => {
  return (
    <div>
      <div className="d-title">{title}</div>
      <div className={style.box}>
        <div>
          {data ? <div className={style.toprow}>{subTitle}</div> : <></>}
          <div className={style.bg}></div>
          <div>
            <Table rowKey={() => shortid.generate()} columns={columns} dataSource={data} loading={loading} pagination={pagination} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListContainer
