import React from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet"
import ConnectButton from './ConnectButton'

export default function Menu({ fixed }) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const { account } = useWallet()

  const guideHandler = ()=>{
    window.open("https://moonrat.finance/guide")
  }
  return (
    <>
      <div className="flex flex-wrap shadow-lg fixed">
        <div className="w-full">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white-500">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
              <ul className="flex flex-row list-none ml-auto">
                <li className="nav-item">
                  <button type="button" className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-6 py-3 rounded-3xl focus:outline-none" onClick={guideHandler}>
                    Guide
                  </button>
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