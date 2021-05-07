import React, { useCallback, useState } from 'react'
import Page from 'components/layout/Page'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useMaxBalance, useTokenBalance } from 'hooks/useTokenBalance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointer, faPaperPlane, faQuestionCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import addresses from 'config/constants/contracts'
import { useLPTotalLiquidity, useMoonBalance, useNextClaimDate, useTotalLiquidity } from 'hooks/useSlotBalance'
import { useCollectBNB, useSendToken } from 'hooks/useMoonShield'
import TokenInput from 'components/TokenInput'
import { BUY_SMART_URL, WALLETS } from '../../config'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { usePriceBnbBusd } from '../../state/hooks'

const Home: React.FC = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const [val, setVal] = useState('')
  const [sendAddress, setAddressVal] = useState('')
  const [showShieldSwapMsg,setShowShieldSwapMsg] = useState(window.localStorage.getItem("showShieldSwapMsg") == null)
  const { account } = useWallet()
  const { onSend } = useSendToken()
  const [pendingTx, setPendingTx] = useState(false)
  const tokenAddress = addresses.moonShield[chainId]
  const { onCollect } = useCollectBNB()
  
  const tokenBalance = useTokenBalance(tokenAddress)
  let maxTrxBalance = useMaxBalance(tokenAddress)
  maxTrxBalance = maxTrxBalance.div(new BigNumber(1000000000))
  const fullBalance = ((tokenBalance.toNumber()/1000000000)).toLocaleString('en-US', {minimumFractionDigits: 3})
  const tokenName = 'Shield'

  const collectibleBNB = useMoonBalance(account);
  const BNBNum = collectibleBNB.toNumber()/1000000000000000000

  const mynextclaimdate = useNextClaimDate(account);
  const nextclaimdate = mynextclaimdate.toNumber() === 0?"Not available":new Date(mynextclaimdate.toNumber()*1000).toUTCString()

  const contracttotalliquidity = useTotalLiquidity();
  const totalliquidity = contracttotalliquidity.toNumber()
  const realtotalliquidity = (totalliquidity/1000000000000000000).toLocaleString('en-US', {minimumFractionDigits: 3});

  const bnbPrice = usePriceBnbBusd();
  const totalvalue = bnbPrice.toNumber()
  const realvalue = (totalliquidity*totalvalue/1000000000000000000).toLocaleString('en-US', {minimumFractionDigits: 3});

  const contractlptotalliquidity = useLPTotalLiquidity();
  const lptotalliquidity = contractlptotalliquidity.toNumber()
  const reallptotalliquidity = (lptotalliquidity/1000000000000000000).toLocaleString('en-US', {minimumFractionDigits: 3});

  const reallpvalue = (lptotalliquidity*totalvalue/1000000000000000000).toLocaleString('en-US', {minimumFractionDigits: 3});

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

  const handleBuyShield = ()=>{
    window.open(BUY_SMART_URL);
  }
  const renderWallets = () => {
    return WALLETS.map(wallet => {
      return <a className="block text-center" href={wallet.url}>{wallet.name}</a>
    })
  }
  return (
    <Page>
      <div className="pt-20">
        <div className="bg-white w-full max-w-screen-md mx-auto rounded-5xl p-4 shadow-2xl-centered mt-2">
          <div>
            <img src="/images/bnb.png" alt="bnb" className="h-24 mx-auto"/>
            <h1 className="text-2xl text-center">Moon Shield</h1>
          </div>
          <div className="mx-auto text-xl text-center mt-1">
            A new way to earn BNB. 
          </div>
          <div className="text-center mt-6">
            <Button onClick={handleBuyShield} className="mx-auto">
              <FontAwesomeIcon icon={faShoppingCart} className="mr-1"/>
              Buy $Shield
            </Button>
          </div>
        </div>
        {!account?
          (
            <div className="bg-white w-full md:w-10/12 mx-auto rounded-5xl p-4 shadow-2xl mt-10 divide-y-4">
              <div className="mt-8">
                <h1 className="text-3xl font-bold text-red-500 text-center">You are not connected or not using Binance Smart Chain network</h1>
              </div>
              <div className="text-center mt-5">
                <h2 className="text-2xl">
                  To use the app, make sure:
                </h2>
                <h2 className="text-2xl text-red-500 w-full sm:max-w-xl mx-auto">
                  You are using the <b className="font-bold">Binance Smart Chain</b> network
                  You need to connect wallet to continue
                </h2>
              </div>
              <div className="text-center mt-5">
                <h2 className="text-2xl">
                  Please switch to BSC Network if you use:
                </h2>
                <div className="text-2xl text-green-400 w-full sm:max-w-xl mx-auto">
                  {renderWallets()}
                </div>
              </div>
            </div>
          ):(
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-10 font-bold">
                <div className="bg-white w-full rounded-5xl p-4 shadow-2xl">
                  <div>
                    <img src="/images/max_trans.png" alt="Max Transaction" className="h-24 mx-auto mt-5"/>
                    <div className="text-sm text-center mt-5">Max transaction amount</div>
                  </div>
                  <div className="text-sm text-center mt-2">
                    SHIELD {maxTrxBalance.toNumber().toLocaleString('en-US', {minimumFractionDigits: 3})} | BNB {BNBNum.toLocaleString('en-US', {minimumFractionDigits: 6})}
                  </div>
                </div>
                <div className="bg-white w-full rounded-5xl p-4 shadow-2xl">
                  <div>
                    <img src="/images/total_liquidity_pool.png" alt="Total liquidity pool" className="h-24 mx-auto mt-5"/>
                    <div className="text-sm text-center mt-5">Total liquidity pool</div>
                  </div>
                  <div className="text-sm text-center mt-2">
                    $ {reallpvalue}
                  </div>
                </div>
                <div className="bg-white w-full rounded-5xl p-4 shadow-2xl">
                  <div>
                    <img src="/images/1_mil_smart.png" alt="Current 1 mil SMRAT Price" className="h-24 mx-auto mt-5"/>
                    <div className="text-sm text-center mt-5">Total reward pool</div>
                  </div>
                  <div className="text-sm text-center mt-2">
                    $ {realvalue}
                  </div>
                </div>
                <div className="bg-white w-full rounded-5xl p-4 shadow-2xl">
                  <div>
                    <img src="/images/total_bnb_in_liquidity_pool.png" alt="Total BNB in liquidity pool" className="h-24 mx-auto mt-5"/>
                    <div className="text-sm text-center mt-5">Total BNB in liquidity pool</div>
                  </div>
                  <div className="text-sm text-center mt-2">
                    BNB {reallptotalliquidity}
                  </div>
                </div>
                <div className="bg-white w-full rounded-5xl p-4 shadow-2xl">
                  <div>
                    <img src="/images/bnb_reward.png" alt="Total BNB in reward pool" className="h-24 mx-auto mt-5"/>
                    <div className="text-sm text-center mt-5">Total BNB in reward pool</div>
                  </div>
                  <div className="text-sm text-center mt-2">
                    BNB {realtotalliquidity}
                  </div>
                </div>
                <div className="bg-white w-full rounded-5xl p-4 shadow-2xl">
                  <div>
                    <img src="/images/smart_balance.png" alt="Max Transaction" className="h-24 mx-auto mt-5"/>
                    <div className="text-sm text-center mt-5">Your SHIELD balance</div>
                  </div>
                  <div className="text-sm text-center mt-2">
                    SHIELD {fullBalance}
                  </div>
                </div>
              </div>
              <div className="mt-28 text-sm">
                {
                  showShieldSwapMsg && (
                  <div className="w-full bg-white font-bold px-10 py-16 rounded-5xl shadow-2xl">
                    <span>SMRAT swap is not available: You don&apos;t have any classic MRAT </span>
                    <Button className="ml-4" onClick={()=>{ window.localStorage.setItem("showShieldSwapMsg",""); setShowShieldSwapMsg(false) }}>Close</Button>
                  </div>
                  )
                }
                <div className="w-full bg-white px-10 py-8 rounded-5xl shadow-2xl mt-10">
                  <div>
                    My collectable BNB: <b className="ml-5">{BNBNum.toLocaleString('en-US', {minimumFractionDigits: 6})} BNB</b>
                  </div>
                  <div>
                    <a href="DOC_EARN_BNB_URL" className="text-red-500 font-bold">
                      *pool is always changing based on buys, sells, and collects by others, learn more here
                      <FontAwesomeIcon icon={faQuestionCircle} className="text-green-500"/>
                    </a>
                  </div>
                  <div className="text-center">
                    <div className="mt-5 font-bold text-3xl">
                      You can collect your BNB at : {nextclaimdate}
                    </div>
                    <Button className="mt-5" onClick={onCollect} disabled = {!BNBNum}>
                      <FontAwesomeIcon icon={faHandPointer} className="mr-1"/>
                      Collect my BNB
                    </Button>
                  </div>
                </div>
                <div className="w-full bg-white px-10 py-8 rounded-5xl shadow-2xl mt-10">
                  <div>
                    Disruptive Transfer between 2 wallets
                    <a href="DOC_ANTI_WHALES_URL" className="ml-10">
                      <FontAwesomeIcon icon={faQuestionCircle} className="text-green-500"/>
                    </a>
                    <b className="ml-16">Balance: {fullBalance} SHIELD</b>
                  </div>
                  <div className="w-full sm:w-3/5 mx-auto mt-5">
                    <div className="w-full grid grid-cols-3 gap-2">
                      <div className="text-right py-1">
                        <b>Recipient (address)</b>
                      </div>
                      <div className="col-span-2">
                        <Input
                          onChange = {handleAddressChange}
                        />
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-2 mt-4">
                      <div className="text-right py-1">
                        <b>Amount (SHIELD)</b>
                      </div>
                      <div className="col-span-2">
                        <TokenInput
                          value={val}
                          onSelectMax={handleSelectMax}
                          onChange={handleChange}
                          max={fullBalance}
                          symbol={tokenName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-5">
                    <Button onClick={async () => {
                      setPendingTx(true)
                      await onSend(val, sendAddress)
                      setPendingTx(false)
                    }} disabled = {pendingTx || !val || val === "0" || sendAddress === ""}>
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-1"/>
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </Page>
  )
}

export default Home
