import Web3 from 'web3'
import { provider as ProviderType } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import erc20 from 'config/abi/erc20.json'
import slot from 'config/abi/slot.json'
import moonShield from 'config/abi/moonShield.json'
import addresses from 'config/constants/contracts'

export const getContract = (provider: ProviderType, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract((erc20 as unknown) as AbiItem, address)
  return contract
}

export const getAllowance = async (
  lpContract: Contract,
  masterChefContract: Contract,
  account: string,
): Promise<string> => {
  try {
    const allowance: string = await lpContract.methods.allowance(account, masterChefContract.options.address).call()
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getTokenBalance = async (
  provider: ProviderType,
  tokenAddress: string,
  userAddress: string,
): Promise<string> => {
  const contract = getContract(provider, tokenAddress)
  try {
    const balance: string = await contract.methods.balanceOf(userAddress).call()
    return balance
  } catch (e) {
    return '0'
  }
}

export const getMaxBalance = async (
  provider: ProviderType,
  tokenAddress: string
): Promise<string> => {
  const contract = getContract(provider, tokenAddress)
  try {
    const balance: string = await contract.methods._maxTxAmount().call()
    return balance
  } catch (e) {
    return '0'
  }
}

export const getSlotBalance = async (
  provider: ProviderType,
  userAddress: string,
): Promise<string> => {
  const web3 = new Web3(provider)
  const chainId = process.env.REACT_APP_CHAIN_ID
  const address = addresses.slot[chainId]
  const contract = new web3.eth.Contract((slot as unknown) as AbiItem, address)
  try {
    const balance: string = await contract.methods.balanceOf(userAddress).call()
    return balance
  } catch (e) {
    return '0'
  }
}

export const getMoonBalance = async (
  provider: ProviderType,
  userAddress: string,
): Promise<string> => {
  const web3 = new Web3(provider)
  const chainId = process.env.REACT_APP_CHAIN_ID
  const address = addresses.moonShield[chainId]
  const contract = new web3.eth.Contract((moonShield as unknown) as AbiItem, address)
  try {
    const balance: string = await contract.methods.calculateBNBReward(userAddress).call()
    return balance
  } catch (e) {
    return '0'
  }
}

export const getSlotAllowance = async (
  lpContract: Contract,
  slotAddress: string,
  account: string,
): Promise<string> => {
  try {
    const allowance: string = await lpContract.methods.allowance(account, slotAddress).call()
    return allowance
  } catch (e) {
    return '0'
  }
}
