export type SummaryType = {
  height: number
  reward: string
  tx_num: string
  last_14_days_tx_count: any
  total_supply: number
}
export type SearchType = {
  resp_type: number
  error: string
}
export type AddressTokenBalanceType = [
  {
    type: { icon: string; name: string }
    symbol: string
    contractAddress: string
    value: string
    decimals: string
    dollar: string
    usd: string
    total: string
  }
]
export type AddressSummaryType = {
  xt_balance: string
  tx_count: string
  dollar: number
}
export type ParamType = {
  blockNumber?: number
  page: any
  count: any
}

export type TxsDetailType = {
  txDetailExtend: []
  blockNumber: number
  blockTime: number
  hash: string
  from: string
  fromType: string
  toType: string
  to: string
  ago: string
  fee: string
  feeVal: { fee: number; dollar: number }
  gasUsed: string
  gasPrice: string
  gasPriceGwei: any
  gasDollar: number
  nonce: string
  inputData: string
  transactionIndex: string
  gasLimit: string
  tokenTransfer: [{ contract: string; from: string; to: string; value: string; symbol: string; dollar: string }]
  status: string
  value: number
  val: { value: number; dollar: number }
}
export type BlockDetailType = {
  blockNumber: number
  blockHash: string
  blockTime: number
  parentHash: string
  ago: string
  sha3Uncle: string
  Uncles: string
  nonce: string
  blockReward: string
  validator: string
  blockSize: string
  gasUsed: string
  transactionCount: number
  extraData: string
}

export type TokenListType = {
  totalCount: number
  totalPage: number
  tokenTxList: [
    {
      transactionHash: string
      blockTime: string
      time: { ago: string; utc: string }
      ago: string
      from: string
      type: { name: string; icon: string }
      to: string
      val: { value5: number; value15: number }
      value: number
      contract: string
      symbol: string
    }
  ]
}
export type TxsListDataType = {
  totalCount: number
  totalPage: number
  txList: [
    {
      blockNumber: number
      blockTime: string
      time: { ago: string; utc: string }
      ago: string
      fee: string
      from: string
      fromType: string
      gasLimit: number
      gasPrice: number
      gasUsed: number
      hash: string
      inputData: string
      nonce: number
      status: number
      to: string
      toType: string
      transactionIndex: number
      val: { value5: number; value15: number }
      value: number
    }
  ]
}

export type BlockListDataType = {
  totalCount: number
  totalPage: number
  blockList: [
    {
      blockNumber: number
      blockTime: number
      time: { ago: string; utc: string }
      ago: string
      transactionCount: number
      validator: string
      blockReward: string
    }
  ]
}
export type ValidatorListDataType = {
  totalCount: number
  totalPage: number
  validatorList: [{ active: string; address: number; reward24hours: string; totalReward: string; totalVote: string; totalVoteRate: string }]
}
