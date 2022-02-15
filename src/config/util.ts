import BigNumber from 'bignumber.js'
import { DCFS_USDT_TOKEN_ADDRESS, DCFS_DUSD_TOKEN_ADDRESS, BSC_DCC_TOKEN_ADDRESS } from '@/config/address'

export const BIG_TEN = new BigNumber(10)

export const FIX_NUM = (price: string | number | BigNumber | null, fixedNum = 4): string | null => {
  if (0 != price && !price) return null
  return new BigNumber(new BigNumber(price).toFixed(fixedNum)).toFixed()
}

export function CHANGE_NUMBER(num: number, pow?: number, fixed?: number) {
  return FIX_NUM(new BigNumber(num.toString()).div(BIG_TEN.pow(pow || 0)), fixed)
}

export function GET_PERCENTAGE(num: any) {
  if (num === 0) {
    return 0
  } else {
    return new BigNumber(num.toString()).multipliedBy(100).toFixed(2, 1)
  }
}

export const CONVERSION_TOKEN_PRICE = (price: string | number | BigNumber, decimals: string | number = 18): string => {
  if (!price || !decimals) return new BigNumber(0).toString()
  return new BigNumber(price).multipliedBy(BIG_TEN.pow(decimals)).toFixed(0)
}

export const GETICON = (address: any) => {
  if (address.toLowerCase() === DCFS_DUSD_TOKEN_ADDRESS) {
    return 'DUSDICON'
  } else if (address.toLowerCase() === DCFS_USDT_TOKEN_ADDRESS) {
    return 'USDTICON'
  } else if (address.toLowerCase() === BSC_DCC_TOKEN_ADDRESS) {
    return 'DCCICON'
  } else {
    return null
  }
}
