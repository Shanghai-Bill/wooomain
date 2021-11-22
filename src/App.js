import { useEffect, useState } from 'react'
import { WalletHook } from "./utils/ethereum"
import { woolBalance } from './utils/wool'
import { loadTotalSupply, loadWoolfList, loadStakedWoolfList } from './utils/woolf'
import { useApollo } from './utils/apollo'
import Page from './Page'
import Modal from 'react-modal'
import './App.css'
const App = () => {
  const client = useApollo()

  const { wallet, chain } = WalletHook()
  const [wool, setWool] = useState('?')
  const [total, setTotal] = useState(0);
  const [woolf, setWoolf] = useState([])
  const [stakedWoolf, setStakedWoolf] = useState([])

  useEffect(() => {
    Modal.setAppElement('body');
  }, [])

  useEffect(() => {
    const loadWool = async () => {
      if (!wallet) return
      setWool(await woolBalance(wallet))
      loadWoolf()
      loadStaked()
    }
    const loadTotal = async () => {
      setTotal(await loadTotalSupply())
    }
    const loadWoolf = async () => {
      if (!wallet) return
      
      const value = await loadWoolfList(wallet, total)
      setWoolf(value)
    }
    const loadStaked = async () => {
      if (!wallet) return
      const value = await loadStakedWoolfList(wallet, total);
      setStakedWoolf(value)
    }

    loadTotal()
    loadWool()
  }, [wallet, chain, total])

  return (
    <Page wallet={wallet} chain={chain} wool={wool} total={total} woolf={woolf} stakedWoolf={stakedWoolf} reload={async () => {
      if (!wallet) return
      setWool(await woolBalance(wallet))
      setTotal(await loadTotalSupply())
    }}/>
  )
}

export default App
