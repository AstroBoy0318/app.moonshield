import React from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, useWalletModal } from '@pizzafinance/ui-sdk'

const ConnectButton = (props) => {
  const { connect, reset } = useWallet()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(connect, reset)
  const {account} = props;
  const accountEllipsis = account ? `${account.substring(0, 4)  }...${  account.substring(account.length - 4)}` : null;
  if(account === null){
    return (
        <Button onClick={onPresentConnectModal} style={{marginRight:'30px'}}>
          Connect
        </Button>
    )
  }
  return (
    <Button onClick={onPresentAccountModal} title={account} style={{marginRight:'30px'}}>
      {accountEllipsis}
    </Button>
  )
}

export default ConnectButton
