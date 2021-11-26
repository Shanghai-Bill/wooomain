import Container from "./components/Container"
import Minting from "./components/Minting"
import Staking from "./components/Staking"
// import { useQuery } from '@apollo/client'
import { parseGraphObject, QUERY } from './utils/query'
import WoodButton from './components/WoodButton'

const Page = ({wallet, chain, wool, reload, total, woolf, stakedWoolf}) => {

  const {
    data,
    loading,
  } = {}

  let staked = stakedWoolf
  let tokens = woolf

  if (data) {
    tokens = [...data.tokens.map(x => parseGraphObject(x))].sort((e1, e2) => {return parseInt(e1.id, 16) - parseInt(e2.id, 16)}) 
    staked = [...data.stakes.map(x => parseGraphObject(x))].sort((e1, e2) => {return parseInt(e1.id, 16) - parseInt(e2.id, 16)})
  }

  return (
    <div className="w-full flex flex-col md:justify-center items-center p-5">
     
      <div className="title text-center justify-self-start mb-5">
        Fantom Wolf Game
      </div>

      <div className="mb-5 font-console text-red text-sm" style={{maxWidth:'600px'}}>
        <Container transparent={false}>
          <div className="flex flex-col jsutify-center items-center">
            Sheep and Wolves competing for $WOOL on a farm in the metaverse.  Nothing but blockchain. No roadmap. Fully in the Public Domain.<br/><br/>
            <div style={{ fontSize: '12px' }}>
              <div style={{ fontSize: '20px' }}>⚠️⚠️⚠️️️</div>
              Please kindly wait 2-3 minutes until the staking list loads properly after each reload.<br/>
            </div>
            <br/>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-2">
              <WoodButton width={150} height={50} title={'Docs'} fontSize={15} onClick={() => {
                window.open("https://fwolfgame.gitbook.io/fantom-wolf-game/");
              }}/>
              <WoodButton width={150} height={50} title={'Telegram'} fontSize={15} onClick={() => {
                window.open("https://t.me/FantomWolfGame_chat");
              }}/>
              <WoodButton width={150} height={50} title={'twitter'} fontSize={15} onClick={() => {
                window.open("https://twitter.com/FantomWolfGame");
              }}/>
              
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-2">
              <WoodButton width={150} height={50} title={'buy $wool'} fontSize={15} onClick={() => {
                window.open("https://spookyswap.finance/swap?outputCurrency=0x2E4bF93BdEd3236D0719aa3ceB43932f279EFe1F");
              }}/>
              <WoodButton width={150} height={50} title={'buy sheep'} fontSize={15} onClick={() => {
                window.open("https://paintswap.finance/marketplace/collections/0xd04f2119b174c14210e74e0ebb4a63a1b36ad409");
              }}/>
              <WoodButton width={150} height={50} title={'add liquidity'} fontSize={15} onClick={() => {
                window.open("https://spookyswap.finance/add/0x2E4bF93BdEd3236D0719aa3ceB43932f279EFe1F/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83");
              }}/>
              
            </div>
            
          </div>
          
          
        </Container>
      </div>

      
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-full" style={{maxWidth:'1500px'}}>
        <div className="h-full w-full md:w-1/2 flex justify-between flex flex-col gap-5">
          <Minting wallet={wallet} chain={chain} total={total} reload={() => {
            reload()
          }} woolBalance={wool}/>
        </div>
        <div className="h-full w-full md:w-1/2 flex justify-center">
          <Staking 
            wallet={wallet}
            chain={chain}
            wool={wool}
            tokens={tokens} 
            stakes={staked}
            reload={() => {
              reload()
            }}
            fetching={loading}
          />
        </div>
      </div>
    </div>
  )
}

// <img className="absolute h-full w-full object-cover" src="./images/background.png" alt="" style={{zIndex:-1000}}/>

export default Page
