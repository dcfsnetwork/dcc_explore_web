import arrow from '@/assets/arrow.svg'
import bscIcon from '@/assets/bsc.svg'
import dcfsIcon from '@/assets/logo.svg'
import right from '@/assets/right_b.svg'
import SwitcherItem from '@/components/BridgeSwitcherItem'
import Search from '@/components/Search'
import { BSC_DCC_TOKEN_ADDRESS, BSC_USDT_TOKEN_ADDRESS, CHAIN_INFO, DCFS_USDT_TOKEN_ADDRESS, RECIPIENT_ADDRESS } from '@/config/address'
import { getTokenContract, web3Instance } from '@/config/contract'
import { CONVERSION_TOKEN_PRICE, FIX_NUM } from '@/config/util'
import detectEthereumProvider from '@metamask/detect-provider'
import { Button, Input, message, Modal, Select } from 'antd'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { generate } from 'shortid'
import style from './index.module.scss'

type assetType = {
  name: string
  fee: string
  isNative?: boolean
  address?: string
}
interface chainInfoType {
  name: string
  icon: string
  assets: assetType[]
  chainInfo: {
    chainId: string
    chainName: string
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
      icon: string
    }
    rpcUrls: string[]
    blockExplorerUrls: string[]
  }
}

const BSC: chainInfoType = {
  name: 'BSC',
  icon: bscIcon,
  assets: [
    { name: 'DCC', address: BSC_DCC_TOKEN_ADDRESS, fee: '0.1' },
    { name: 'USDT', address: BSC_USDT_TOKEN_ADDRESS, fee: '0.1' }
  ],
  chainInfo: CHAIN_INFO.BSC
}
const DCFS: chainInfoType = {
  name: 'DCFS',
  icon: dcfsIcon,
  assets: [
    { name: 'DCC', isNative: true, fee: '1' },
    { name: 'USDT', address: DCFS_USDT_TOKEN_ADDRESS, fee: '0.5' }
  ],
  chainInfo: CHAIN_INFO.DCFS
}

const { Option } = Select

const convertBalance = (balance: any) => FIX_NUM(new BigNumber(balance.toString()).div(new BigNumber(10).pow(18)))

const Bridge: React.FC = () => {
  const [account, setAccount] = useState()
  const [balance, setBalance] = useState<any>()
  const [fromChain, setFromChain] = useState<chainInfoType>(BSC)
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0)
  const [amount, setAmount] = useState<any>()
  const [toChain, setToChain] = useState<chainInfoType>(DCFS)
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const currentAsset = useMemo(() => fromChain.assets[currentAssetIndex], [currentAssetIndex, fromChain.assets])
  const isFromChainBsc = useMemo(() => fromChain.name === BSC.name, [fromChain.name])

  const receiveAmount = useMemo(() => {
    if (!amount) {
      return 0
    }
    const val = new BigNumber(amount).minus(currentAsset.fee)
    return val.gt(0) ? val.toFixed() : 0
  }, [amount, currentAsset.fee])

  const getBalance = useCallback(async () => {
    try {
      if (account) {
        let balance
        if (currentAsset.address) {
          const contract = getTokenContract(currentAsset.address)
          if (contract) {
            balance = await contract.methods.balanceOf(account).call()
          }
        } else {
          balance = await web3Instance.eth.getBalance(account)
        }
        setBalance(convertBalance(balance))
      }
    } catch (error) {
      throw error
    }
  }, [account, currentAsset.address])

  const getAccount = useCallback(async provider => {
    try {
      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      })
      setAccount(accounts[0])
    } catch (error) {
      throw error
    }
  }, [])

  const connectWallet = useCallback(async () => {
    try {
      const ethereumProvider: any = await detectEthereumProvider()
      if (!ethereumProvider) {
        message.error('Please install MetaMask!')
        return
      }
      getAccount(ethereumProvider)
      ethereumProvider.on('accountsChanged', () => {
        getAccount(ethereumProvider)
        getBalance()
      })
      ethereumProvider.on('chainChanged', (_res: any) => {
        getBalance()
      })
    } catch (error) {
      throw error
    }
  }, [getAccount, getBalance])

  const chainChangeHandler = useCallback(async () => {
    if (account) {
      const ethereumProvider: any = await detectEthereumProvider()
      await ethereumProvider.request({
        method: 'wallet_addEthereumChain',
        params: [fromChain.chainInfo]
      })
      getBalance()
    }
  }, [account, fromChain.chainInfo, getBalance])

  useEffect(() => {
    chainChangeHandler()
  }, [chainChangeHandler])

  useEffect(() => {
    getBalance()
  }, [getBalance])

  const changeChain = useCallback(async () => {
    setFromChain(isFromChainBsc ? DCFS : BSC)
    setToChain(isFromChainBsc ? BSC : DCFS)
    setAmount('')
    setCurrentAssetIndex(0)
  }, [isFromChainBsc])

  const handleConfirm = useCallback(async () => {
    const ethereumProvider: any = await detectEthereumProvider()
    if (ethereumProvider.chainId !== fromChain.chainInfo.chainId) {
      chainChangeHandler()
      return
    }
    try {
      setLoading(true)
      if (currentAsset.address) {
        const contract = getTokenContract(currentAsset.address)
        contract.methods
          .transfer(RECIPIENT_ADDRESS, CONVERSION_TOKEN_PRICE(amount))
          .send({ from: account })
          .on('receipt', (data: any) => {
            setLoading(false)
            data.status && setShowConfirmModal(false)
            getBalance()
          })
          .on('error', () => {
            setLoading(false)
          })
      } else {
        const data = await web3Instance.eth.sendTransaction({ from: account, to: RECIPIENT_ADDRESS, value: CONVERSION_TOKEN_PRICE(amount) })
        setLoading(false)
        data.status && setShowConfirmModal(false)
        getBalance()
      }
    } catch (error) {
      setLoading(false)
      throw error
    }
  }, [account, amount, chainChangeHandler, currentAsset.address, fromChain.chainInfo.chainId, getBalance])

  const showModal = useCallback(async () => {
    const ethereumProvider: any = await detectEthereumProvider()
    if (ethereumProvider.chainId === fromChain.chainInfo.chainId) {
      setShowConfirmModal(true)
    } else {
      chainChangeHandler()
    }
  }, [chainChangeHandler, fromChain.chainInfo.chainId])

  return (
    <>
      <div className="search_box">
        <Search />
      </div>
      <div className={style.bridge_warpper}>
        <div className={style.bridge_from}>
          <div className="font-18">DCFS Bridge</div>
          <div className={style.switcher_wrapper}>
            <SwitcherItem title={'From:'} data={fromChain} />
            <div onClick={changeChain} style={{ transform: isFromChainBsc ? 'rotateY(180deg)' : '' }}>
              <img src={arrow} alt="" />
            </div>
            <SwitcherItem title={'To:'} data={toChain} />
          </div>
          <div className="font-18">
            <span style={{ marginRight: '10px' }}>Asset:</span>
            <Select
              style={{ minWidth: '150px' }}
              value={currentAssetIndex}
              size="middle"
              onChange={value => {
                setCurrentAssetIndex(value)
                setAmount('')
                getBalance()
              }}>
              {fromChain.assets.map(({ name }, index) => (
                <Option key={generate()} value={index}>
                  {name}
                </Option>
              ))}
            </Select>
          </div>
          {!account ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div onClick={connectWallet} className={style.bridge_btn}>
                Connect wallet
              </div>
            </div>
          ) : (
            <div className={style.connected}>
              <div style={{ marginBottom: '10px' }} className="font-18">
                Amount:
              </div>
              <Input
                type="number"
                size="large"
                bordered={false}
                value={amount}
                style={{ backgroundColor: '#f3f3f3' }}
                onChange={({ target }) => {
                  setAmount(target.value)
                }}
              />
              <div className={style.bordered}>
                <div>Reminder</div>
                <div>
                  Available: {balance} {currentAsset.name}
                </div>
              </div>
              <div className={style.next}>
                <Button
                  type="primary"
                  onClick={showModal}
                  disabled={
                    !!!amount ||
                    0 === Number(amount ?? 0) ||
                    new BigNumber(amount || 0).gt(new BigNumber(balance || 0)) ||
                    !/^([1-9]\d*\.?\d*)|(0\.\d*[1-9])$/.test(new BigNumber(amount || 0).toFixed())
                  }>
                  Next
                </Button>
              </div>
              <Modal
                title="Confirm"
                visible={showConfirmModal}
                footer={null}
                onCancel={() => {
                  setShowConfirmModal(false)
                }}>
                <div className={style.modalItem}>
                  <SwitcherItem title={'From:'} data={fromChain} />
                  <img src={right} style={{ position: 'relative', top: '20px' }} alt="" />
                  <SwitcherItem title={'To:'} data={toChain} />
                </div>
                <div className={style.modalItem}>
                  <span className="l-c">Asset</span>
                  <span>{currentAsset.name}</span>
                </div>
                <div className={style.modalItem}>
                  <span className="l-c">Handling fee</span>
                  <span>
                    {currentAsset.fee} {currentAsset.name}
                  </span>
                </div>
                <div className={style.modalItem}>
                  <span className="l-c">Receive Amount</span>
                  <span>
                    {receiveAmount} {currentAsset.name}
                  </span>
                </div>
                <div className={style.next}>
                  <Button type="primary" onClick={handleConfirm} loading={loading}>
                    Confirm
                  </Button>
                </div>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Bridge
