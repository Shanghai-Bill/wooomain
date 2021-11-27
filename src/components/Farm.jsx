import { useState, useEffect } from "react";
import WoodButton from "./WoodButton";
import Container from "./Container";
import EthereumInteraction from "./EthereumInteraction";
import { watchTransaction } from "../utils/ethereum";
import {
  pendingweed,
  deposit,
  withdraw,
  approve,
  balanceOfLp,
  balanceOfWeed,
  getStaked,
  getAllowance,
} from "../utils/masterchef";
import { utils, BigNumber } from "ethers";

const Farm = ({ wallet }) => {
  const [staked, setStaked] = useState(0);
  const [pendingReward, setPendingReward] = useState(0);
  const [lpBalance, setLpBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [allowance, setAllowance] = useState(0);

  useEffect(() => {
    console.log(wallet);

    async function fetchDate() {
      const _staked = await getStaked(0, wallet);
      setStaked(_staked);
      const _pendingReward = await pendingweed(0, wallet);
      setPendingReward(_pendingReward);
      const _lpBalance = await balanceOfLp(wallet);
      setLpBalance(_lpBalance);
      const _allowance = await getAllowance(wallet, process.env.REACT_APP_MASTERCHEF);
      setAllowance(_allowance);
      console.log(_staked);
      console.log(_pendingReward);
      console.log(_lpBalance);
      console.log(_allowance);
    }
    if (wallet) {
      fetchDate();
    }
  }, [wallet]);

  return (
    <Container>
      <div className="flex flex-col items-center font-pixel gap-5">
        <div>$WEED EARNED: {(pendingReward / 10 ** 18).toString()}</div>
        <div>
          <img src={"/farm.png"}></img>
        </div>
        <WoodButton
          width="200"
          height="50"
          fontSize="15px"
          title="Collect $Weed"
          onClick={async () => {
            await withdraw(0, 0);
          }}
        ></WoodButton>
        <div style={{"margin-top":"15px"}}>Deposit your WOOL-FTM LP to power your mower!</div>
        <div style={{height: '140px', width: '195px'}}>
          {staked != 0 ?<img src={"/mower.gif"}></img>:<img src={"/mower.png"}></img>}
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-full mb-5">
          <div className="flex flex-col items-center font-pixel gap-5">
            <div
              onClick={() => {
                setDepositAmount(lpBalance.toString());
              }}
            >
              POWER IN MY PACK: {(lpBalance / 10 ** 18).toString()}
            </div>
            <div >
            <input type="number" value={depositAmount / 10 ** 18} style={{"text-align": "center", height: "50px"}}></input>
            </div>
            <WoodButton
              width="200"
              height="50"
              fontSize="15px"
              title={allowance > 0 ? "inject POWER" : "inject POWER"}
              onClick={async () => {
                if (allowance > 0) {
                  await deposit(0, depositAmount);
                } else {
                  await approve(
                    process.env.REACT_APP_MASTERCHEF,
                    "999999999999999999999999999999999999999999999"
                  );
                }
              }}
            ></WoodButton>
          </div>
          <div className="flex flex-col items-center font-pixel gap-5">
            <div
              onClick={() => {
                setWithdrawAmount(staked.toString());
              }}
            >
              POWER: {(staked / 10 ** 18).toString()}
            </div>
            <div>
              <input type="number" value={withdrawAmount / 10 ** 18} style={{"text-align": "center", height: "50px"}}></input>
            </div>
            <WoodButton
              width="200"
              height="50"
              fontSize="15px"
              title="take back POWER"
              onClick={async () => {
                await withdraw(0, withdrawAmount);
              }}
            ></WoodButton>
          </div>

        </div>
        
        
      </div>
    </Container>
  );
};
export default Farm;
