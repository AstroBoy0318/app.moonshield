import React from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useWalletModal } from '@pizzafinance/ui-sdk'

const ConnectButton = (props) => {
  const { connect, reset } = useWallet()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(connect, reset)
  const {account} = props;
  const accountEllipsis = account ? `${account.substring(0, 4)  }...${  account.substring(account.length - 4)}` : null;
  if(account === null){
    return (
        <button type="button" onClick={onPresentConnectModal} className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-6 py-3 rounded-3xl focus:outline-none">
          Connect
        </button>
    )
  }
  return (
    <button type="button" onClick={onPresentAccountModal} title={account} className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-6 py-3 rounded-3xl focus:outline-none">
      {accountEllipsis}
    </button>
  )
}

export default ConnectButton
