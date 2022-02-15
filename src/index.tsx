import { ConfigProvider } from 'antd'
import enUS from 'antd/lib/locale/en_US'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Empty from './components/Empty'

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={enUS} renderEmpty={() => <Empty />}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
