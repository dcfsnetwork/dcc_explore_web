import { _get, _post } from './axios'

export const _getSummary = () => {
  return _post('summary')
}
export const _getAddressSummary = (address: any) => {
  return _post('address_summary', { address })
}

export const _getTxs = (params: any) => {
  if (!params.blockNum) {
    delete params.blockNum
  }
  return _post('tx_list', params)
}
// 获取tx详情
export const _getTx = (tx_hash: any) => {
  return _post('tx_detail', { tx_hash })
}
// 获取Addresstx
export const _getAddressTx = (params: any) => {
  return _post('address_tx', params)
}

// 获取区块列表
export const _getBlocks = (blocksparam: any) => {
  return _post('block_list', blocksparam)
}

// 获取区块详情
export const _getBlock = (param: any) => {
  return _post('block_detail', {
    param
  })
}

// 获取代币列表
export const _getTokenList = (param: any) => {
  return _post('token_transfer_list', param)
}

// 获取个人代币列表
export const _getAddressTokenList = (param: any) => {
  return _post('address_token_tx', param)
}

// 获取代币量
export const _getAddressTokenBalance = (param: any) => {
  return _post('address_token_balance', param)
}

// 获取代币详情
export const _getTokenDetael = (param: any) => {
  return _post('token_transfer_detail', {
    param
  })
}

// 搜索
export const _toSearch = (param: any) => {
  return _post('search', {
    param
  })
}

// 获取验证人
export const _getValidator = (params: any) => {
  return _post('validator_list', params)
}
