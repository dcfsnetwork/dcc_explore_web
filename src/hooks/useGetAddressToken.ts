import { TokenListType } from '@/config/type'
import { CHANGE_NUMBER, GETICON } from '@/config/util'
import { useCallback, useEffect, useState } from 'react'
import { _getAddressTokenList } from '../config/http'
import ChangeTime from './useChangeTime'

export default function useGetAddressTokenList(page: number, count: number, address: string) {
  const [token, setToken] = useState<TokenListType>()
  const [tokenloading, setLoading] = useState<boolean>()

  const getTokenList = useCallback(async () => {
    try {
      const data = await _getAddressTokenList({ page, count, address })
      data?.tokenTxList.forEach(async (item: any) => {
        item.time = {}
        item.val = {}
        item.type = {}
        const { ago, utc } = ChangeTime(item?.blockTime)
        item.val.value5 = CHANGE_NUMBER(item?.value, 18, 5)
        item.val.value15 = CHANGE_NUMBER(item?.value, 18, 15)
        item.type.name = item.symbol
        item.type.icon = GETICON(item.contract)
        item.time.ago = ago
        item.time.utc = utc
      })
      setToken(data)
      setLoading(true)
    } catch (error) {
      throw error
    }
  }, [page, count, address])

  useEffect(() => {
    getTokenList()
  }, [getTokenList])

  return { token, tokenloading }
}
