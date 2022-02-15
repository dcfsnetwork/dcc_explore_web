import { AutoComplete, Input } from 'antd'
import { useHistory } from 'react-router-dom'
import { _toSearch } from '@/config/http'
import style from './index.module.scss'

interface SearchProps {
  size?: any
}

const Search: React.FC<SearchProps> = ({ size = 'large' }) => {
  const history = useHistory()

  return (
    <div className={style.search}>
      <AutoComplete>
        <Input.Search
          bordered={false}
          style={{ backgroundColor: '#fff', boxShadow: '0 0 15px 0 rgba(88, 97, 106, 0.1)', borderRadius: '6px' }}
          size={size}
          placeholder="Search by Address/Txn Hash/Block"
          onSearch={async value => {
            value = value.replace(/\s*/g, '')
            if (value) {
              try {
                const newdata = await _toSearch(value)
                // sessionStorage.SEARCHTYPE = newdata?.resp_type
                if (newdata?.resp_type === 1) {
                  history.push(`/block/${value}`)
                } else if (newdata?.resp_type === 3 || newdata?.resp_type === 4) {
                  history.push(`/address/${value}`)
                } else if (newdata?.resp_type === 2) {
                  history.push(`/tx/${value}`)
                } else {
                  history.push('/notfound')
                }
              } catch (error) {
                throw error
              }
            }
          }}
          enterButton
        />
      </AutoComplete>
    </div>
  )
}

export default Search
