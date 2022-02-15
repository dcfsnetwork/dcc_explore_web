import { CHANGE_NUMBER } from '@/config/util'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'

function GET_DCC_PRCE(blockHeight: number) {
  const SIX_TOTAL_BLOACK_HEIGHT = 10 * 60 * 24 * 365 * 6
  const REWARD = new BigNumber(4.280821918)
  const mi = new BigNumber(blockHeight).idiv(SIX_TOTAL_BLOACK_HEIGHT).toString()
  return REWARD.div(new BigNumber(2).pow(mi)).toString()
}

export default function useGetDccPrice(blockHeight: number, total?: number) {
  const [dccPrice, setDccPrice] = useState<any>()
  const [price, setPrice] = useState<any>(0)
  const [rate, setRate] = useState<any>()
  const [totalPrice, setTotalPrice] = useState<any>()
  const [PriceLoading, setLoading] = useState<boolean>()
  const totalVal = CHANGE_NUMBER(total || 0, 18, 18)
  const getData = useCallback(async () => {
    try {
      const {
        data: { price, rate }
      } = await axios.get(`${window?.location.origin}/data/api/v1/getTicker?market=dcc_usdt`)
      const dccP = new BigNumber(GET_DCC_PRCE(Number(blockHeight) || 0) || 0).multipliedBy(blockHeight).plus(Number(totalVal))
      setDccPrice(dccP.toFixed(2))
      setPrice(price || 0)
      setRate(rate.toFixed(2))
      setTotalPrice(dccP.multipliedBy(price ?? 0).toFixed(2))
      setLoading(true)
    } catch (error) {
      throw error
    }
  }, [blockHeight, totalVal])

  useEffect(() => {
    getData()
  }, [getData])

  return { dccPrice, price, rate, totalPrice, PriceLoading }
}
