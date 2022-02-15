import menupic from '@/assets/logo_b.svg'
import metamask from '@/assets/metamask.svg'
import { CHAIN_INFO } from '@/config/address'
import ROUTES from '@/config/routes'
import detectEthereumProvider from '@metamask/detect-provider'
import { message } from 'antd'
import { NavLink } from 'react-router-dom'
import style from './index.module.scss'

const addNetWork = async () => {
  const provider: any = await detectEthereumProvider()
  if (!provider) {
    message.error('Please install MetaMask!')
    return
  }

  try {
    await provider.request({ method: 'eth_requestAccounts' })
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_INFO.DCFS.chainId }]
      })
      if (provider.chainId === CHAIN_INFO.DCFS.chainId) {
        message.success('DCFS Network has already been added to Metamask.')
      }
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [CHAIN_INFO.DCFS]
        })
      }
    }
  } catch (error) {}
}

const Loading: React.FC = () => {
  return (
    <div className={style.footer}>
      <div className={style.content}>
        <div className={style.left_content}>
          <div className={style.left_content_title}>
            <img width={29} style={{ margin: '0 10px 2px 0' }} src={menupic} alt="menu" />
            <span>Powered by DCFS</span>
          </div>
          <div>DcfsScan is a Block Explorer for DCFS </div>
          <div className={style.add_btn} onClick={addNetWork}>
            <img width={16} style={{ marginRight: '4px' }} src={metamask} alt="metamask" />
            <span>Add DCFS Network</span>
          </div>
        </div>
        <div></div>
        <div className={style.right_content}>
          <div>Our email address: DCFS.chain@gmail.com</div>
          <div>
            <div className={style.contact_btn}>
              <NavLink to={ROUTES.CONTACTUS}>Contact Us</NavLink>
            </div>
            <div className={style.contact_btn}>
              <a href="https://github.com/dcfsnetwork/dcfs-core/releases" target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
