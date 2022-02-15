import { BlockListDataType } from '@/config/type'
import { CHANGE_NUMBER } from '@/config/util'
import { useCallback, useEffect, useState } from 'react'
import { _getBlocks } from '../config/http'
import ChangeTime from './useChangeTime'

export default function useGetBlocks(page: number, count: number) {
  const [blocks, setBlocks] = useState<BlockListDataType>()
  const [blockloading, setLoading] = useState<boolean>()
  const getBlocks = useCallback(async () => {
    try {
      const data = await _getBlocks({ page, count })

      data.blockList.forEach((item: any) => {
        const { ago, utc } = ChangeTime(item.blockTime)
        item.blockReward = CHANGE_NUMBER(item.blockReward, 18, 18)
        item.time = {}
        item.time.ago = ago
        item.time.utc = utc
      })
      setBlocks(data)
      setLoading(true)
    } catch (error) {
      throw error
    }
  }, [page, count])

  useEffect(() => {
    getBlocks()
  }, [getBlocks])

  return { blocks, blockloading }
}
