import ROUTES from '@/config/routes'
import { TxsDetailType } from '@/config/type'
import { CHANGE_NUMBER } from '@/config/util'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { _getTx } from '../config/http'
import ChangeTime from './useChangeTime'
import useGetDccPrice from './useGetDccPrice'

export default function useGetTx(tx_hash: any) {
  const history = useHistory()
  const { price } = useGetDccPrice(0)
  const [tx, setTx] = useState<TxsDetailType>()

  const [txLoading, setLoading] = useState<boolean>()

  const getTx = useCallback(async () => {
    try {
      const data = await _getTx(tx_hash)
      data.val = {}
      data.feeVal = {}
      const { ago, utc } = ChangeTime(data.blockTime)
      data.gasPriceGwei = CHANGE_NUMBER(data.gasPrice, 9, 18)
      data.gasPrice = CHANGE_NUMBER(data.gasPrice, 18, 18)
      data.gasDollar = new BigNumber(new BigNumber(data.gasPrice).multipliedBy(price).toFixed(18)).toFixed()
      data.value = CHANGE_NUMBER(data.value, 18, 18)
      data.val.value = CHANGE_NUMBER(data.value, 18, 18)
      data.val.dollar = new BigNumber(new BigNumber(data.value).multipliedBy(price).toFixed(18)).toFixed()
      data.fee = CHANGE_NUMBER(data.fee, 18, 18)
      data.feeVal.dollar = new BigNumber(new BigNumber(data.fee).multipliedBy(price).toFixed(18)).toFixed()
      data.status === 1 ? (data.status = 'Success') : (data.status = 'Error')
      data.ago = ago
      data.blockTime = utc
      data.tokenTransfer.forEach((item: any) => {
        item.value = CHANGE_NUMBER(item.value, 18, 18)
        item.dollar = new BigNumber(new BigNumber(item.value).multipliedBy(price).toFixed(18)).toFixed()
      })
      setTx(data)
      setLoading(true)
    } catch (error) {
      history.push(ROUTES.EMPTY)
      throw error
    }
  }, [tx_hash, price, history])

  useEffect(() => {
    getTx()
  }, [getTx])

  return { tx, txLoading }
}
