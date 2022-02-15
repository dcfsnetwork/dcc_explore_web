import { AddressSummaryType } from '@/config/type'
import { CHANGE_NUMBER } from '@/config/util'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { _getAddressSummary } from '../config/http'
import useGetDccPrice from './useGetDccPrice'

export default function useGetSummary(address: any) {
  const { price } = useGetDccPrice(0)
  console.log(price)

  const [summary, setSummary] = useState<AddressSummaryType>()

  const getSummary = useCallback(async () => {
    try {
      const data = await _getAddressSummary(address)
      data.xt_balance = CHANGE_NUMBER(data.xt_balance, 18, 18)
      data.dollar = new BigNumber(data.xt_balance).multipliedBy(price).toFixed(2)
      setSummary(data)
    } catch (error) {
      throw error
    }
  }, [address, price])

  useEffect(() => {
    getSummary()
  }, [getSummary])

  return { summary }
}
