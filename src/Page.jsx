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
        Wolf Game
      </div>

      <div className="mb-5 font-console text-red text-sm" style={{maxWidth:'600px'}}>
        <Container transparent={false}>
          <div className="flex flex-col jsutify-center items-center">
            Sheep and Wolves competing for $WOOL on a farm in the metaverse.  Nothing but blockchain. No roadmap. Fully in the Public Domain.<br/><br/>
            <div style={{ fontSize: '12px' }}>
              <div style={{ fontSize: '20px' }}>⚠️⚠️⚠️️️</div>
              Currently, Binance Smart Chain is facing extreme heavy load. In this case, there's a delay between the website and blockchain.<br/>

              It's the issue with JSON-RPC endpoint node. Staking list is not showing instantly, but secured.<br/>

              Please kindly wait 2-3 minutes until the staking list loads properly after each reload.<br/>

              We're facing on this issue, stay tuned.
            </div>
            <br/>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-2">
              <WoodButton width={150} height={50} title={'Whitepaper'} fontSize={15} onClick={() => {
                window.location.href = "/whitepaper";
              }}/>
              <img src="./这里替换图.png" style={{maxHeight:'50px'}} alt="public domain" />
            </div>
            <a className="underline" href="./tos" target="_blank" >terms of service</a>
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
