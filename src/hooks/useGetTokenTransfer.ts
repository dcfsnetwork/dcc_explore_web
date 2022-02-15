import { TokenListType } from '@/config/type'
import { CHANGE_NUMBER, GETICON } from '@/config/util'
import { useCallback, useEffect, useState } from 'react'
import { _getTokenList } from '../config/http'
import ChangeTime from './useChangeTime'

export default function useGetTokenList(page: number, count: number) {
  const [token, setToken] = useState<TokenListType>()
  const [tokenloading, setLoading] = useState<boolean>()

  const getTokenList = useCallback(async () => {
    try {
      const data = await _getTokenList({ page, count })
      data?.tokenTxList.forEach(async (item: any) => {
        item.time = {}
        item.val = {}
        item.type = {}
        item.type.icon = GETICON(item?.contract)
        item.type.name = item.symbol
        const { ago, utc } = ChangeTime(item?.blockTime)
        item.val.value5 = CHANGE_NUMBER(item?.value, 18, 5)
        item.val.value15 = CHANGE_NUMBER(item?.value, 18, 15)
        item.time.ago = ago
        item.time.utc = utc
      })
      console.log('data', data)

      setToken(data)
      setLoading(true)
    } catch (error) {
      throw error
    }
  }, [page, count])

  useEffect(() => {
    getTokenList()
  }, [getTokenList])

  return { token, tokenloading }
}
