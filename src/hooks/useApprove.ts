import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync } from 'state/actions'
import { approve } from 'utils/callHelpers'
import { useSlot } from './useContract'

// Approve a Farm
export const useApprove = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const slotContract = useSlot()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, slotContract, account)
      dispatch(fetchFarmUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, slotContract])

  return { onApprove: handleApprove }
}

const p = 1000
export default p
