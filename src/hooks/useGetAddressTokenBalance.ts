import { AddressTokenBalanceType } from '@/config/type'
import { CHANGE_NUMBER, GETICON } from '@/config/util'
import { useCallback, useEffect, useState } from 'react'
import { _getAddressTokenBalance } from '../config/http'
import { DCFS_USDT_TOKEN_ADDRESS, DCFS_DUSD_TOKEN_ADDRESS } from '@/config/address'
import BigNumber from 'bignumber.js'

export default function useGetTokenBalance(address: string) {
  const [tokenBalance, setData] = useState<AddressTokenBalanceType>()
  const [totalTokenUsd, setTotalTokenUsd] = useState<any>()

  const getTokenBalance = useCallback(async () => {
    try {
      const data = await _getAddressTokenBalance({ address })
      data.forEach((item: any) => {
        item.usd = [DCFS_USDT_TOKEN_ADDRESS, DCFS_DUSD_TOKEN_ADDRESS].includes(item?.contractAddress?.toLowerCase()) ? 1 : 0
        item.type = {}
        item.type.name = item.symbol
        item.type.icon = GETICON(item?.contractAddress)
        item.value = CHANGE_NUMBER(item?.value, 18, 15)
        item.total = new BigNumber(item.usd).multipliedBy(new BigNumber(item.value))
        item.totalp = new BigNumber(item.total.toFixed(4)).toFixed()
      })
      const total = data.reduce((pre: any, { total }: any) => new BigNumber(pre).plus(total), 0)
      setTotalTokenUsd(new BigNumber(total.toFixed(4)).toFixed())
      setData(data)
    } catch (error) {
      throw error
    }
  }, [address])

  useEffect(() => {
    getTokenBalance()
  }, [getTokenBalance])

  return { tokenBalance, totalTokenUsd }
}
