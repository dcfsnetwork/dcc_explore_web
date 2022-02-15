import BNBTokenIcon from '@/assets/bnb.png'
import DCCTokenIcon from '@/assets/DCC.png'

export const RECIPIENT_ADDRESS = '0x343b129fcEFF19e00C015f850c709dE73C8E4424'
export const BSC_DCC_TOKEN_ADDRESS = '0x98779fac3d808bbe07e137322454980804745bef'
export const BSC_USDT_TOKEN_ADDRESS = '0x55d398326f99059ff775485246999027b3197955'
export const DCFS_USDT_TOKEN_ADDRESS = '0x19bf64eef4cf393c56739137ba1a6b1eeb26eceb'
export const DCFS_DUSD_TOKEN_ADDRESS = '0xab9014e94dc999ee0e16a224247b9b1339c5940d'

export const CHAIN_INFO = {
  BSC: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
      decimals: 18,
      icon: BNBTokenIcon
    },
    rpcUrls: [
      'https://bsc-dataseed1.binance.org',
      'https://bsc-dataseed2.binance.org',
      'https://bsc-dataseed3.binance.org',
      'https://bsc-dataseed4.binance.org',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed2.defibit.io',
      'https://bsc-dataseed3.defibit.io',
      'https://bsc-dataseed4.defibit.io',
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed2.ninicoin.io',
      'https://bsc-dataseed3.ninicoin.io',
      'https://bsc-dataseed4.ninicoin.io',
      'wss://bsc-ws-node.nariox.org'
    ],
    blockExplorerUrls: ['https://bscscan.com']
  },
  DCFS: {
    chainId: '0xac',
    chainName: 'DCFS Smart Chain Mainnet',
    nativeCurrency: {
      name: 'DCFS Chain Native Token',
      symbol: 'DCC',
      decimals: 18,
      icon: DCCTokenIcon
    },
    rpcUrls: ['https://www.dcfsscan.io/chain'],
    blockExplorerUrls: ['https://www.dcfsscan.io']
  }
}
