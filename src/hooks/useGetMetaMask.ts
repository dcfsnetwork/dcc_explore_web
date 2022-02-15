import DexTokenIcon from '@/assets/dcfslogo.png'
import detectEthereumProvider from '@metamask/detect-provider'
import { Web3Provider } from '@ethersproject/providers'
import { useCallback, useEffect, useState } from 'react'

export default function useGetAccount() {
  const [txs, setTxs] = useState<any>()
  const [provider, setProvider] = useState<any>(null)

  const getProvider = useCallback(async () => {
    const win: any = window
    if (win._ethereumProvider) {
      setProvider(win._ethereumProvider)
      return
    }
    try {
      const ethereumProvider: any = await detectEthereumProvider()
      if (ethereumProvider) {
        const provider = new Web3Provider(ethereumProvider)
        win._ethereumProvider = provider
        setProvider(provider)
      }
    } catch (error) {
      throw error
    }
  }, [])

  const getTx = useCallback(async () => {
    try {
      await provider?.provider.request({
        method: 'wallet_addEthereumChain',
        params: {
          chainId: '0x3603102',
          chainName: 'DEX Smart Chain Testnet',
          nativeCurrency: {
            address: '0x2f6ba13d8bF3e3f7881EE8fA129a3839A3507fA3',
            decimals: 18,
            symbol: 'DEX',
            name: 'DEX Token',
            icon: DexTokenIcon
          },
          rpcUrls: ['https://rpc.testnet.dex.io'],
          blockExplorerUrls: ['https://explorer.testnet.dex.io']
        }
      })
      const accounts = await provider?.provider.request({
        method: 'eth_requestAccounts'
      })
      setTxs(accounts[0])
      return accounts[0]
    } catch (error) {
      throw error
    }
  }, [provider?.provider])
  useEffect(() => {
    getProvider()
    getTx()
  }, [getTx, getProvider])
  return { txs }
}
