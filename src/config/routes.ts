const ROUTES = {
  HOME: '/',
  BLOCKS: '/block/:blockHeight',
  BLOCK: '/blocks',
  TRANSACTIONS: '/tx/:txId',
  TRANSACTIONS_BLOCK: '/txs/:block',
  TRANSACTION: '/txs',
  ADDRESS: '/address/:address',
  VALIDATOR: '/validators',
  BRIDGE: '/bridge',
  TOKENTRANSFERS: '/tokentransfers',
  TOKENTRANSFER: '/tokentransfer/:txId',
  CONTACTUS: '/contact',
  EMPTY: '/notfound',
  GET_BLOCK_ROUTE: (blockHeight: string) => ROUTES.BLOCKS.replace(':blockHeight', blockHeight),
  GET_TX_ROUTE: (txId: string) => ROUTES.TRANSACTION.replace(':txId', txId),
  GET_TOKEN_TX_ROUTE: (txId: string) => ROUTES.TOKENTRANSFER.replace(':txId', txId),
  GET_TX_BLOCK_ROUTE: (block: string) => ROUTES.TRANSACTION.replace(':block', block),
  GET_ADDRESS_ROUTE: (address: string) => ROUTES.ADDRESS.replace(':address', address)
}

export default ROUTES
