import React from 'react'
const Whitepaper = () => {

  return (
    <div className="w-full h-full md:p-5 flex justify-center" style={{background:'rgba(0,0,0,.9)', fontFamily:'Courier', color:'#24D336'}}>
      <div className="flex flex-col gap-5" style={{maxWidth:'1000px'}}>
        <h1 className="subtitle">Wolf Game</h1>
      ​
        <p>
          On a quaint farm in the metaverse, a flock of Sheep congregate and produce a healthy supply of $WOOL. They huddle together in a Barn and are sheared regularly by their owners to farm the $WOOL. With more $WOOL, the farmers can purchase more Sheep! But outside lurk dangers the Sheep are terrified of… The Wolves.
        </p>

        <p>
          The Wolves are on the hunt for Sheep and their precious $WOOL. They’ll take it by any means necessary. They’ll kidnap Sheep or catch them unaware and steal all of their $WOOL. So the farmers struck a deal with the Wolves: they pay the Wolves a tax on all $WOOL production. In return, the Wolves don’t attack Sheep who are safe in the Barn.        </p>

        <p>
          But when a Sheep leaves the farm or new Sheep are born… The Wolves don’t hold back.
        </p>

        <p>
          ---------------
        </p>

        <p>
          Wolf Game is a risk protocol for NFTs with novel tokenomics. It shows what’s possible with interactions between the ERC-20 and ERC-721 protocols.For the very first time, your NFT can steal other NFTs (ERC-721 tokens) for you. The rarer your NFT, the more tokens you'll accumulate probabilistically. Wolf Game is pioneering new types of NFT mechanics. Fully decentralized. No roadmaps or empty promises. Just a game in the metaverse that’s ready to play at launch.
        </p>

        <p>
          <h4>The tl;dr:</h4>
          &emsp;- There will only ever be 10,000 Gen 0, minted for 0.16 BNB each. The 40,000 Gen 1 are minted by farming $WOOL<br/>
          &emsp;- Sheep can be staked in the Barn to earn $WOOL and pay a tax anytime they claim their $WOOL earnings<br/>
          &emsp;- If a Sheep is unstaked from the Barn, the Wolves try to steal all of its accumulated $WOOL<br/>
          &emsp;- When a new Sheep is born, the Wolves attempt to kidnap it. If they’re successful, it’s given to a randomly selected Wolf, instead of the owner who minted it
        </p>

        <h3 className="drop-text">Contract Addresses</h3>

        <p>
          &emsp;- Sheep / Wolf NFT: {process.env.REACT_APP_WOOLF}<br/>
          &emsp;- Barn / Gang Staking: {process.env.REACT_APP_BARN}<br/>
          &emsp;- $WOOL Token: {process.env.REACT_APP_WOOL}
        </p>

        <div className="flex justify-center items-center gap-5">
          <img src="./images/minting.gif" style={{height:'100px'}} className="object-contain" alt=""/>
          <h3 className="drop-text">Minting</h3>
          <img src="./images/minting.gif" style={{height:'100px'}} className="object-contain" alt=""/>
        </div>
        

        <table frame="void" rules="all">
          <tr>
            <th>Token ID</th>
            <th>Minting Cost</th>
          </tr>
          <tr>
            <td>1 to 10,000 (Gen 0)</td>
            <td>0.16 BNB</td>
          </tr>
          <tr>
            <td>10,001 to 20,000</td>
            <td>20,000 $WOOL</td>
          </tr>
          <tr>
            <td>20,001 to 40,000</td>
            <td>40,000 $WOOL</td>
          </tr>
          <tr>
            <td>40,001 to 50,000</td>
            <td>80,000 $WOOL</td>
          </tr>
        </table>

        <p>
          The total cost to mint all of the Sheep and Wolves in existence will be 1,800,000 $WOOL.
        </p>

        <div className="flex justify-center items-center gap-5">
          <img src="./images/unstaking-barn.gif" style={{height:'100px'}} className="object-contain" alt=""/>
          <h3 className="drop-text">Sheep</h3>
          <img src="./images/staked-barn.gif" style={{height:'100px'}} className="object-contain" alt=""/>
        </div>
        <p>
          You have a 90% chance of minting a Sheep, each with unique traits. Here are the actions they can take:
        </p>

        <table frame="void" rules="all">
          <tr>
            <th>Action</th>
            <th>Notes</th>
            <th>Risk</th>
          </tr>
          <tr>
            <td>Enter Barn (Stake)</td>
            <td>Accumulate 10,000 $WOOL / day (prorated to the second)</td>
            <td>No risk.</td>
          </tr>
          <tr>
            <td>Shear $WOOL (Claim)</td>
            <td>Receive 80% of $WOOL accumulated on your Sheep</td>
            <td>Wolves take a guaranteed 20% tax on sheared $WOOL in return for not attacking the Barn. Taxed $WOOL is split among all the Wolves currently staked in the Barn, proportional to their Alpha scores.</td>
          </tr>
          <tr>
            <td>Leave Barn (Unstake)</td>
            <td>Sheep is removed from the Barn and all $WOOL is shorn. <span className="underline"> Can only be done if the Sheep has accumulated 2 days worth of $WOOL to keep it warm.</span></td>
            <td>50% chance of ALL of your accumulated $WOOL being stolen by Wolves. Stolen $WOOL is split among all the Wolves currently staked in the Barn, proportional to their Alpha scores.</td>
          </tr>
        </table>
        ​
        <div className="flex justify-center items-center gap-5">
          <img src="./images/shearing.gif" style={{height:'100px'}} className="object-contain" alt=""/>
          <h3 className="drop-text">$WOOL</h3>
          <img src="./images/claiming-pack.gif" style={{height:'100px'}} className="object-contain" alt=""/>
        </div>
        <p>
          The maximum $WOOL supply is 5,000,000,000 $WOOL:
        </p>
        <ul>
          <li>When supply reaches 2,400,000,000 $WOOL earned for staking, the staking “faucet” turns off.</li>
          <li>The developers will receive 600,000,000 $WOOL</li>
          <li>Community Rewards will be allocated 2,000,000,000 $WOOL</li>
        </ul>

        <table frame="void" rules="all">
          <tr>
            <th>Action</th>
            <th>Notes</th>
            <th>Risk</th>
          </tr>
          <tr>
            <td>Mint a new Sheep using $WOOL</td>
            <td>There is a 10% chance that the NFT is actually a Wolf!</td>
            <td>10% chance of the new Sheep or Wolf being stolen by a staked Wolf. Each Wolf’s chance of success is proportional to their Alpha scores.</td>
          </tr>
        </table>

        <div className="flex justify-center items-center gap-5">
          <img src="./images/staking-pack.gif" style={{height:'100px'}} className="object-contain" alt=""/>
          <h3 className="drop-text">Wolves</h3>
          <img src="./images/unstaked-pack.gif" style={{height:'100px'}} className="object-contain" alt=""/>
        </div>
        <p>
          You have a 10% chance of minting a Wolf, each with unique traits, including an Alpha value ranging from 5 to 8. The higher the Alpha value:<br/>
          &emsp;- The higher the portion of $WOOL that the Wolf earns from taxes<br/>
          &emsp;- The higher chance of stealing a newly minted Sheep or Wolf
        </p>

        <p>
          <h4>Example:</h4> Wolf A has an Alpha of 8 and Wolf B has an Alpha of 6, and they are staked.<br/>
          &emsp;- If 70,000 $WOOL total have been accumulated as taxes, Wolf A will be able to claim 40,000 $WOOL and Wolf B will be able to claim 30,000 $WOOL<br/>
          &emsp;- If a newly minted Sheep or Wolf is stolen, Wolf A has a 57% chance of receiving it and Wolf B has a 43% chance of receiving it<br/>
        </p>

        <p className="underline">
          Only staked Wolves are able to steal a sheep or earn the $WOOL tax.
        </p>

        <table frame="void" rules="all">
          <tr>
            <th>Action</th>
            <th>Notes</th>
            <th>Risk</th>
          </tr>
          <tr>
            <td>Stake Wolf</td>
            <td>Earn your share of the 20% tax of all $WOOL generated by Sheep in the Barn</td>
            <td>No risk.</td>
          </tr>
          <tr>
            <td>Claim $WOOL</td>
            <td>Receive all $WOOL taxes accrued for the staked Wolf</td>
            <td>No risk.</td>
          </tr><tr>
            <td>Unstake Wolf</td>
            <td>Receive all $WOOL taxes accrued for the staked Wolf</td>
            <td>No risk.</td>
          </tr>
        </table>

        <div className="flex justify-center items-center gap-5">
          <img src="./images/sheared.gif" style={{height:'100px'}} className="object-contain" alt=""/>
          <h3 className="drop-text">Why this tech is novel</h3>
          <img src="./images/sheared.gif" style={{height:'100px'}} className="object-contain" alt=""/>
        </div>
        <p>
          Protocol-level risk is ripe for exploration in NFTs. Many projects are implementing stake-to-earn, but haven’t cracked the code on users making choices in the face of risk.
        </p>

        <p>
          In the case of Wolf Game’s Wolf-eat-Sheep world, your NFT can steal ERC-20 and ERC-721 tokens for you. This is entirely new.
        </p>

        <p>
          Everything in Wolf  Game happens on-chain: the decisioning, the results, the generation of the NFTs themselves. It’s split between 4 different smart contracts so that anyone can read through and get a sense of how it all talks to each other.
        </p>

        <p>
          There are a number of techniques in these contracts that make this all possible while maintaining accuracy, keeping gas costs down, and not exceeding the EVM contract size limit.
        </p>
        
        <h4>Data Packing:</h4> Storage is expensive on the blockchain! One 256 bit integer costs 20,000 gas to save, which at today’s costs is about $7.50… for one number! Efficiently packing data types by designing around smaller max values can save users hundreds of thousands of dollars over the lifetime of the project
        
        <h4>Constant Time Algorithms &#38; DeFi Math:</h4> A lot of contracts use architectures that require significant looping to accomplish tasks. Those make contracts inefficient and add to gas costs. It’s imperative to remove things like the need to search through arrays or loop through stakes. This means you can do things like unlimited simultaneous stakes while keeping things cheaper.
        <p>
          As an example, the minting contract uses AJ Walker’s Alias Method to efficiently select traits in constant time.
        </p>

        <p>
          Another example: tracking Wolf $WOOL earnings (taxes) proved to be very complex, requiring math used by DeFi liquidity pool protocols.
        </p>

        <h4>100% On-chain:</h4> Not the first, and certainly not the last. But as long as bsc is running, your Sheep and Wolves will survive. Always available and always yours. Your traits and all the pixel art reside in the contracts themselves, nowhere else.
        {/*<h4>Well-tested:</h4> This is a big one. There are so many contracts out there that don’t build a test suite to prove the contracts operate as expected. In a trustless environment, everyone should be able to verify that the code works.*/}
        <h4>UI at launch:</h4> You can use the entirety of Wolf Game by directly interacting with the blockchain (like through bscscan). But Wolf Game is launching with a custom UI to make it easy for people to enjoy the game on day 1.

        <div className="flex justify-center items-center gap-5">
          <img src="./images/mint-stolen.gif" style={{height:'100px'}} className="object-contain" alt=""/>
          <h3 className="drop-text">In conclusion...</h3>
          <img src="./images/mint-stolen.gif" style={{height:'100px'}} className="object-contain" alt=""/>
        </div>
        <p>
          With Wolf Game, everyone can play with their own level of risk… Pay the tax? Stay liquid on the market? Take a chance to keep all your $WOOL, but have a chance to lose it all? The choices and this game have to be engaging.
        </p>

        <p>
          Wolves preying on Sheep feels almost like a parallel to the NFT community itself: A select few with alpha among all of us, and many others following the pack.
        </p>
      </div>
    </div>
  )
}

export default Whitepaper