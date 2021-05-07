import React from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet"
import ConnectButton from './ConnectButton'
import Button from '../../../components/Button'


export default function Menu({ fixed }) {
  const { account } = useWallet()

  const guideHandler = ()=>{
    window.open("https://moonrat.finance/guide")
  }
  return (
    <>
      <div className="flex flex-wrap shadow-xl sticky bg-white">
        <div className="w-full max-w-screen-lg mx-auto">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-2 bg-white-500">
            <div className="container px-4 mx-auto flex flex-wrap justify-between w-full">
              <div>
                <img src="/images/logo.png" alt="logo" className="h-14 inline align-middle"/>
                <span className="hidden md:inline-block text-lg font-bold leading-relaxed ml-4 whitespace-nowrap uppercase tracking-widest">
                  <span className="text-white text-shadow-bordered font-sans">Moon</span> <span className="text-yellow-500 font-sans font-black">Shield</span>
                </span>
              </div>
              <ul className="flex flex-row list-none ml-auto mt-3">
                <li className="nav-item">
                  <Button type="button" onClick={guideHandler}>
                    Guide
                  </Button>
                </li>
                <li className="nav-item ml-2">
                  <ConnectButton account = {account} />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}