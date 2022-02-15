import style from './index.module.scss'
import ava from '@/assets/pic.png'
import { Button, Dropdown, Menu, Tabs } from 'antd'
import or from '@/assets/or.svg'
import down from '@/assets/down.svg'
import Copy from '@/components/Copy'
import useGetAddressTxs from '@/hooks/useGetAddressTxList'
import { useHistory } from 'react-router-dom'
import useGetAddressSummary from '@/hooks/useGetAddressSummary'

import QRCode from 'qrcode.react'
import { Modal } from 'antd'
import { useState } from 'react'
import Search from '@/components/Search'
import TransTable from './transTable'
import TokenTable from './tokenTable'
import TokenIcon from '@/components/TokenIcon/Index'
import useGetTokenBalance from '@/hooks/useGetAddressTokenBalance'
// import { DownOutlined } from '@ant-design/icons'

const css = {
  color: '#fff',
  border: 'none',
  width: '26px',
  background: '#00c299',
  boxShadow: 'none',
  height: '26px',
  borderRadius: '50%',
  verticalAlign: 'middle',
  marginLeft: '30px'
}
const Mobilecss = {
  color: '#fff',
  border: 'none',
  width: '1.2em',
  background: '#00c299',
  boxShadow: 'none',
  height: '1.2em',
  borderRadius: '50%',
  verticalAlign: 'middle',
  marginLeft: '1.15em'
}

const width = 150
const renderCss = {
  display: 'inline-block',
  width: '90%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: '12px'
}
const render = (url: any, cewidth?: any, style?: any) => {
  return (text: any) => (
    <div style={{ width: cewidth || width }}>
      <a className="g-c" style={style || renderCss} href={`${url}${text}`}>
        {text}
      </a>
    </div>
  )
}

const Address: React.FC = () => {
  const { TabPane } = Tabs
  const [isModalVisible, setIsModalVisible] = useState(false)
  const history = useHistory()
  const address = history.location.pathname.slice(9)
  const [params] = useState({
    address,
    page: 1,
    count: 10
  })

  const { addresstxs } = useGetAddressTxs(params.page, params.count, params.address)
  const { tokenBalance, totalTokenUsd } = useGetTokenBalance(address)
  const { summary } = useGetAddressSummary(address)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const menu = (data: any) => (
    <Menu>
      <Menu.Item key={''}>
        <div style={{ backgroundColor: '#f5f6fa', padding: '1px 5px' }}>{'>DEP-20 Tokens'}</div>
      </Menu.Item>
      {data?.map((item: any, index: any) => (
        <Menu.Item key={index}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ marginLeft: '5px', marginRight: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TokenIcon symbol={item.type.icon} size="17px" />
                &nbsp;<span style={{ fontWeight: 'bold' }}>{item.symbol}</span>
              </div>
              <div style={{ fontWeight: '500', color: '#666666' }}>
                {item.value}
                {item.symbol}
              </div>
            </div>
            <div>
              <div style={{ textAlign: 'right', fontWeight: 'bold' }}>{Number(item.totalp) === 0 ? '-' : `$${item.totalp}`}</div>
              <div style={{ textAlign: 'right', fontWeight: '500', color: '#666666' }}>{item.usd ? `$${item.usd}` : '-'}</div>
            </div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <>
      <div className="search_box">
        <Search />
      </div>
      <div className={style.top}>
        <div>
          <img src={ava} style={{ marginRight: 20 }} alt="" /> <span className="d-title"> Address </span>
          <span className="l-c font-16">{address}</span>
          <Copy text={address} style={css} />
          <Button style={css} icon={<img style={{ position: 'relative', top: '-4px', width: '14px' }} src={or} alt="" />} size="middle" onClick={showModal} />
        </div>
        <div>
          <img src={ava} style={{ marginRight: 10 }} alt="" /> <span className="d-title"> Address </span>
          <span className="l-c font-16">{address}</span>
          <Copy text={address} style={Mobilecss} />
          <Button
            style={Mobilecss}
            icon={<img style={{ position: 'relative', top: '-4px', width: '10px' }} src={or} alt="" />}
            size="small"
            onClick={showModal}
          />
        </div>
        <Modal
          width="300px"
          title={address}
          visible={isModalVisible}
          closable={false}
          footer={null}
          onCancel={() => {
            setIsModalVisible(false)
          }}>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <QRCode value={address} size={250} />
          </div>
        </Modal>
      </div>
      <div className={style.center}>
        <div className="font-18">Overview</div>
        <div>
          <span className="font-16 l-c">Balance:</span>&nbsp;
          <span className="font-14">{summary?.xt_balance}</span>&nbsp;
          <span className="font-14">DCC</span>
          <span> (${summary?.dollar})</span>
        </div>
        <div>
          Token:
          <div>
            <Dropdown overlay={menu(tokenBalance)}>
              <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <span>${totalTokenUsd || 0}</span>
                <span>
                  <img src={down} style={{ width: '0.9em', opacity: '0.6' }} alt="down" />
                </span>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={style.list_box}>
        <div className={style.list}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Transactions" key="1" style={{ userSelect: 'none' }}>
              <div>
                Latest {addresstxs?.txList.length} from a total of {addresstxs?.totalCount} transactions
              </div>
              <TransTable address={address} width={width} render={render} />
            </TabPane>
            <TabPane tab="DEP-20 TokenTxns" key="2">
              <TokenTable address={address} width={width} render={render} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Address
