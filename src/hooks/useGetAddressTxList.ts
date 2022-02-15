import { TxsListDataType } from '@/config/type'
import { CHANGE_NUMBER } from '@/config/util'
import { useCallback, useEffect, useState } from 'react'
import { _getAddressTx } from '../config/http'
import ChangeTime from './useChangeTime'

export default function useGetAddressTxs(page: number, count: number, address?: string) {
  const [addresstxs, setAddressTxs] = useState<TxsListDataType>()
  const [addressLoading, setLoading] = useState<boolean>()
  const getAddressTx = useCallback(async () => {
    try {
      const data = await _getAddressTx({ page, count, address })
      data.txList.forEach((item: any) => {
        item.time = {}
        const { ago, utc } = ChangeTime(item.blockTime)
        item.time.ago = ago
        item.time.utc = utc
        item.value = CHANGE_NUMBER(item.value, 18, 18)
        item.fee = CHANGE_NUMBER(item.fee, 18, 18)
      })
      setAddressTxs(data)
      setLoading(true)
    } catch (error) {
      throw error
    }
  }, [page, count, address])

  useEffect(() => {
    getAddressTx()
  }, [getAddressTx])

  return { addresstxs, addressLoading }
}
