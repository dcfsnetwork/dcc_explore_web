import { SummaryType } from '@/config/type'
import { CHANGE_NUMBER } from '@/config/util'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { _getSummary } from '../config/http'
import ChangeTime from './useChangeTime'

export default function useGetSummary() {
  const [data, setPeriod] = useState<SummaryType>()
  const [summaryLoading, setLoading] = useState<boolean>()
  const [price, setPrice] = useState<any>()
  const [rate, setRate] = useState<any>()
  const [dccPrice, setDccPrice] = useState<any>()
  const [totalPrice, setTotalPrice] = useState<any>()

  const getSummary = useCallback(async () => {
    try {
      const data = await _getSummary()
      data.reward = CHANGE_NUMBER(data.reward, 18, 18)
      data.last_14_days_tx_count.forEach((item: any) => {
        item[0] = ChangeTime(item[0]).md
      })
      setPeriod(data)

      try {
        const {
          data: { price, rate }
        } = await axios.get(`${window?.location.origin}/data/api/v1/getTicker?market=dcc_usdt`)

        setDccPrice(Number(CHANGE_NUMBER(data.total_supply || 0, 18, 18)))
        setPrice(price)
        setRate(rate.toFixed(2))
        setTotalPrice(new BigNumber(Number(CHANGE_NUMBER(data.total_supply || 0, 18, 18))).multipliedBy(price ?? 0).toFixed(2))
        setLoading(true)
      } catch (error) {
        throw error
      }
    } catch (error) {
      throw error
    }
  }, [])

  useEffect(() => {
    getSummary()
  }, [getSummary])

  return { data, summaryLoading, price, rate, dccPrice, totalPrice }
}
