import DCCICON from '@/assets/dcc.svg'
import USDTICON from '@/assets/usdt.svg'
import DUSDICON from '@/assets/dusd.svg'
import DefaultIcon from '@/assets/default.svg'

const SYMBOL_ICONS: any = {
  DCCICON,
  USDTICON,
  DUSDICON
}

export default function TokenIcon({ symbol, size = '15px' }: any) {
  return <img src={SYMBOL_ICONS[symbol] || DefaultIcon} alt={symbol} width={size} height={size} />
}
