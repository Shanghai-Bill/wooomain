import {useState} from 'react'
import WoodButton from './WoodButton'
import Container from './Container'
import MintProgress from './MintProgress'
import LoadingModal from './LoadingModal'
import OutcomeModal from './OutcomeModal'
import EthereumInteraction from './EthereumInteraction'
import { mint, parseMint, tokenURI, isInvalidWoolf } from '../utils/woolf'
import { watchTransaction } from '../utils/ethereum'
import { decodeTokenURI, isSheep } from '../utils/uri'
import MintNStakeModal from './MintNStakeModal'
import { utils, BigNumber } from 'ethers'

const Minting = ({ wallet, chain, stats, reload, woolBalance, total }) => {

  const [amount, setAmount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [transacting, setTransacting] = useState(false)
  const [error, setError] = useState(null)
  const [outcomes, setOutcomes] = useState([])
  const [mintingAndStaking, setMintingAndStaking] = useState(false)

  const onMint = async (stake) => {
    setLoading(true)
    setError(null)
    try {
      const hash = (await mint(stake, amount, requiresEth())).hash
      setTransacting(true)
      setMintingAndStaking(false)
      watchTransaction(hash, (receipt, success) => {
        if (!success) {
          setLoading(false)
          setTransacting(false)
          return setError('Mint failed. Check transaction.')
        }
        const results = parseMint(stake, receipt)
        setTimeout(async () => {
          await presentOutcomes(results)
          setLoading(false)
          setTransacting(false)
        }, 2000)
      })
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  const delay = (time) => {
    return new Promise(res => setTimeout(res, time))
  }

  const getWoolf = async (tokenId) => {
    try {
      let u = await tokenURI(tokenId)
      while (isInvalidWoolf(decodeTokenURI(u))) {
        console.log('RETRYING')
        await delay(1000)
        u = await tokenURI(tokenId)
      }
      return u
    } catch (e) {
      console.log('READ FAILED. RETRYING')
      return getWoolf(tokenId)
    }
  }

  const presentOutcomes = async (results) => {
    const o = []
    for (let i in results) {
      const {tokenId, recipient, stake} = results[i]
      let u = await getWoolf(tokenId)
      if (stake) {
        o.push({
          message:`You minted ${isSheep(u) ? 'Sheep' : 'Wolf'} #${tokenId.toString()}...`,
          source: decodeTokenURI(u).image,
          link:`${process.env.REACT_APP_OPENSEA}/${process.env.REACT_APP_WOOLF}/${tokenId.toString()}`,
          linkMessage:''
        }, {
          message:isSheep(u) ? 'And it arrived safely in the Barn' : 'And it successfully joined the Wolfpack',
          source: isSheep(u) ? './images/staked-barn.gif' : './images/staked-pack.gif'
        })
      } else {
        const stolen = recipient.toLowerCase() !== wallet.toLowerCase()
        if (stolen) {
          const shortRecipient = `${recipient.slice(0, 6)}...${recipient.slice(-4)}`
          o.push({
            message:`You minted ${isSheep(u) ? 'Sheep' : 'Wolf'} #${tokenId.toString()} BUT...`,
            source: decodeTokenURI(u).image,
            link:`${process.env.REACT_APP_OPENSEA}/${process.env.REACT_APP_WOOLF}/${tokenId.toString()}`,
            linkMessage:''
          }, {
            message:`It was stolen by a Wolf! It's now owned by ${shortRecipient}`,
            source: './images/mint-stolen.gif'
          })
        } else {
          o.push({
            message:`You arrived safely at home with ${isSheep(u) ? 'Sheep' : 'Wolf'} #${tokenId.toString()}...`,
            source: decodeTokenURI(u).image,
            link:`${process.env.REACT_APP_OPENSEA}/${process.env.REACT_APP_WOOLF}/${tokenId.toString()}`,
            linkMessage:''
          })
        }
      }
    }
    setOutcomes(o)
    
  }

  const totalMinted = () => {
    if (!total) return 0
    return parseInt(total)
  }

  const maxTokens = () => {
    return 50000
  }

  const requiresEth = () => {
    return false
  }

  const ethCost = () => {
    return utils.formatUnits(utils.parseEther('36').mul(BigNumber.from(amount))) + ' FTM'
  }

  const woolCost = (tokenId) => {
    if (tokenId <= 50000 * 2 / 5) return 20000
    if (tokenId <= 50000 * 4 / 5) return 40000
    return 80000
  }

  const totalWoolCost = () => {
    let totalCost = 0
    for (let i = 1; i <= amount; i++) {
      totalCost += woolCost(total + i)
    }
    return totalCost
  }

  const preCheck = () => {
    if (requiresEth()) return undefined
    if (!woolBalance || woolBalance === '?') return 'Insufficient $WOOL'
    if (utils.parseEther('' + totalWoolCost()).gt(woolBalance)) return 'Insufficient $WOOL'
    return undefined
  } 

  return (
    <Container>
      <div className="flex flex-col items-center font-pixel gap-5">
        <div className="subtitle mt-5">
          MINTING
        </div>
        <MintProgress minted={totalMinted()} maxTokens={maxTokens()}/>
        <div className="mt-2"></div>
        {totalMinted() >= maxTokens() ? (
          <div className="text-red text-2xl">
            Sold out!
          </div>
        ) : (
          <EthereumInteraction wallet={wallet} chain={chain}>
            <div className="flex justify-center items-center gap-2" style={{height:'50px'}}>
              <div className="font-console text-lg pt-2 mr-3">
                Amount
              </div>
              <img
               src="/arrow-down.svg" alt="decrease"className="arrow-down cursor-pointer" style={{minWidth:'25px'}} onClick={() => {
                setAmount(Math.max(1, amount - 1))
              }}/>
              <div className="font-console text-red text-3xl pt-2">
                {amount}
              </div>
              <img src="/arrow-up.svg" alt="increase" className="arrow-up cursor-pointer" style={{minWidth:'25px'}} onClick={() => {
                setAmount(Math.min(10, amount + 1))
              }}/>
            </div>
            <div className="mb-2">
              Cost: <span className="text-red">{requiresEth() ? ethCost() : `${totalWoolCost()} $WOOL`}</span>
            </div>
            {preCheck() ? (
              <div className="text-red text-2xl">
                {preCheck()}
              </div>
            ) : (
              <div className="flex xl:flex-row flex-col justify-center items-center gap-5">
                <div className="flex flex-col justify-center items-center">
                  <WoodButton width={180} height={40} title={'paused'} fontSize={16} loading={loading} onClick={() => {
                    onMint(false)
                  }}/>
                  <div className="mt-2" style={{height:'20px'}}></div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <WoodButton width={180} height={40} title={'paused'} fontSize={16} loading={loading} onClick={() => {
                    setMintingAndStaking(true)
                  }}/>
                  <div className="font-console text-xs mt-2 text-center" style={{height:'20px'}}>
                    (saves gas)
                  </div>
                </div>
              </div>
            )}
            
            
            {error && (
              <div className="text-sm text-red font-console">
                {error}
              </div>
            )}
          </EthereumInteraction>
        )}
        
        
      </div>
      <LoadingModal loadingScenes={[
        {message:'Bringing a baby sheep (or wolf?) back home', source:'./images/minting.gif'}
      ]} modalIsOpen={!!transacting} />
      <OutcomeModal outcomes={outcomes} modalIsOpen={outcomes.length > 0} closeModal={() => {
        setOutcomes([])
        reload()
      }}/>
      <MintNStakeModal modalIsOpen={mintingAndStaking} closeModal={() => {setMintingAndStaking(false)}} loading={loading} onClick={() => {
        onMint(true)
      }}/>

    </Container>
  )
}

export default Minting
