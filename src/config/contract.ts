import ERC20_ABI from '@/config/abi/erc20.json'
import Web3 from 'web3'

export const web3Instance: any = new Web3(Web3.givenProvider)

export const getTokenContract = (tokenAddress: string) => {
  if (!tokenAddress) return
  const _ERC20_ABI: any = ERC20_ABI
  return new web3Instance.eth.Contract(_ERC20_ABI, tokenAddress)
}
