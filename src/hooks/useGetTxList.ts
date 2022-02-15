import { TxsListDataType } from '@/config/type'
import { CHANGE_NUMBER } from '@/config/util'
import { useCallback, useEffect, useState } from 'react'
import { _getTxs } from '../config/http'
import ChangeTime from './useChangeTime'

export default function useGetTxs(page: number, count: number, blockNum?: number) {
  const [txs, setTxs] = useState<TxsListDataType>()
  const [txsloading, setLoading] = useState<boolean>()

  const getTx = useCallback(async () => {
    try {
      const data = await _getTxs({ page, count, blockNum })
      data.txList.forEach(async (item: any) => {
        item.fromAddress = {}
        item.toAddress = {}
        item.time = {}
        item.val = {}
        const { ago, utc } = ChangeTime(item.blockTime)
        item.val.value5 = CHANGE_NUMBER(item.value, 18, 5)
        item.val.value15 = CHANGE_NUMBER(item.value, 18, 15)
        item.fee = CHANGE_NUMBER(item.fee, 18, 8)
        item.time.ago = ago
        item.time.utc = utc
      })
      setTxs(data)
      setLoading(true)
    } catch (error) {
      throw error
    }
  }, [page, count, blockNum])

  useEffect(() => {
    getTx()
  }, [getTx])

  return { txs, txsloading }
}
