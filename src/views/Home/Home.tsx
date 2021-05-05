import React, { useCallback, useState } from 'react'
import { Button, Input, Text, useModal } from '@pizzafinance/ui-sdk'
import Page from 'components/layout/Page'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useMaxBalance, useTokenBalance } from 'hooks/useTokenBalance'
import addresses from 'config/constants/contracts'
import { useMoonBalance } from 'hooks/useSlotBalance'
import { useCollectBNB, useSendToken } from 'hooks/useMoonShield'
import TokenInput from 'components/TokenInput'
import DepositModal from './components/DepositModal'
import ConnectButton from './components/ConnectButton'

const Home: React.FC = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const [val, setVal] = useState('')
  const [sendAddress, setAddressVal] = useState('')
  const { account } = useWallet()
  const { onSend } = useSendToken()
  const [pendingTx, setPendingTx] = useState(false)
  const tokenAddress = addresses.pizza[chainId]
  const { onCollect } = useCollectBNB()
  
  const tokenBalance = useTokenBalance(tokenAddress)
  let maxTrxBalance = useMaxBalance(tokenAddress)
  maxTrxBalance = maxTrxBalance.div(new BigNumber(1000000000))
  const fullBalance = tokenBalance.toString()
  const tokenName = 'Shield'
  const [onPresentDeposit] = useModal(<DepositModal max={tokenBalance} onConfirm={onSend} tokenName={tokenName} />)

  const collectibleBNB = useMoonBalance(account);
  const BNBNum = collectibleBNB.toNumber()

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleAddressChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setAddressVal(e.currentTarget.value)
    },
    [setAddressVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])
  return (
    <Page>
      <ConnectButton account = {account} />
      <Text>Max Transaction Amount : {maxTrxBalance.toNumber()} shield </Text>
      {account && <Text>my collectible BNB : {BNBNum} BNB</Text>}
      {account && <Button onClick={onCollect} disabled = {!BNBNum} style={{marginRight:'30px'}}>Collect my BNB</Button>}
      <br/>
      {account && <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />}
      {account && <Text>address to send</Text>}
      {account && <Input
      onChange = {handleAddressChange}
        />}
      {account && <Button onClick={async () => {
                      setPendingTx(true)
                      await onSend(val, sendAddress)
                      setPendingTx(false)            
                  }} style={{marginRight:'30px'}} disabled = {pendingTx || !val || val === "0" || sendAddress === ""}>Send</Button>}
    </Page>
  )
}

export default Home
