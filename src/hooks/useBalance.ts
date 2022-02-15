import { FIX_NUM } from '@/config/util'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'

export default function useBalance(provider: any, account: string) {
  const [balance, setBalance] = useState<string | null>()

  const getGas = useCallback(async () => {
    try {
      if (!provider) return
      const data = await provider?.getBalance(account)
      setBalance(FIX_NUM(new BigNumber(data.toString()).div(new BigNumber(10).pow(18))))
    } catch (error) {
      throw error
    }
  }, [provider, account])

  useEffect(() => {
    getGas()
  }, [getGas])

  return balance
}
