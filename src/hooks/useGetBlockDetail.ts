import { BlockDetailType } from '@/config/type'
import { CHANGE_NUMBER } from '@/config/util'
import { useCallback, useEffect, useState } from 'react'
import { _getBlock } from '../config/http'
import ChangeTime from './useChangeTime'

export default function useGetBlock(param: string) {
  const [block, setBlock] = useState<BlockDetailType>()
  const [blockLoading, setLoading] = useState<boolean>()
  const getBlock = useCallback(async () => {
    try {
      const data = await _getBlock(param)
      const { ago, utc } = ChangeTime(data.blockTime)
      data.ago = ago
      data.blockReward = CHANGE_NUMBER(data.blockReward, 18, 18)
      data.blockTime = utc
      setBlock(data)
      setLoading(true)
    } catch (error) {
      throw error
    }
  }, [param])

  useEffect(() => {
    getBlock()
  }, [getBlock])

  return { block, blockLoading }
}
