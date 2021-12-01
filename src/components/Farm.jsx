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
import LoadingModal from "./LoadingModal";

const Farm = ({ wallet }) => {
  const [staked, setStaked] = useState(0);
  const [pendingReward, setPendingReward] = useState(0);
  const [lpBalance, setLpBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [allowance, setAllowance] = useState(0);

  const [totalLpStaked, setTotalLpStaked] = useState(0);

  const [transacting, setTransacting] = useState(false);
  const [loadingScenes, setLoadingScenes] = useState([]);

  useEffect(() => {
    async function fetchDate() {
      const _staked = await getStaked(0, wallet);
      setStaked(_staked);
      const _pendingReward = await pendingweed(0, wallet);
      setPendingReward(_pendingReward);
      const _lpBalance = await balanceOfLp(
        wallet,
        process.env.REACT_APP_FTM_WOOL_LP
      );
      setLpBalance(_lpBalance);
      const _allowance = await getAllowance(
        wallet,
        process.env.REACT_APP_MASTERCHEF,
        process.env.REACT_APP_FTM_WOOL_LP
      );

      const _totalLpStaked = await balanceOfLp(
        process.env.REACT_APP_MASTERCHEF,
        process.env.REACT_APP_FTM_WOOL_LP
      );
      setTotalLpStaked(_totalLpStaked);

      setAllowance(_allowance, process.env.REACT_APP_FTM_WOOL_LP);
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
            setLoadingScenes([
              {
                message: "It is just Loading...",
                source: "",
              },
            ]);
            const hash = (await withdraw(0, 0)).hash;
            setTransacting(true);

            watchTransaction(hash, async (receipt, success) => {
              if (!success) {
                setTransacting(false);
              } else {
                setTransacting(false);
                window.location.reload(false);
              }
            });
          }}
        ></WoodButton>
        <div style={{ "margin-top": "15px" }}>
          Deposit your WOOL-wFTM LP to power your mower!
        </div>
        <div style={{ height: "140px", width: "195px" }}>
          {staked != 0 ? (
            <img src={"/mower.gif"}></img>
          ) : (
            <img src={"/mower.png"}></img>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-full mb-5">
          <div className="flex flex-col items-center font-pixel gap-5">
            <div
              onClick={() => {
                setDepositAmount((lpBalance / 10 ** 18).toString());
              }}
            >
              POWER IN MY PACK: {(lpBalance / 10 ** 18).toString()} MAX
            </div>
            <div>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                style={{ "text-align": "center", height: "50px" }}
              ></input>
            </div>
            <WoodButton
              width="200"
              height="50"
              fontSize="15px"
              title={allowance > 0 ? "inject POWER" : "inject POWER"}
              onClick={async () => {
                if (allowance > 0) {
                  setLoadingScenes([
                    {
                      message: "It is just Loading...",
                      source: "",
                    },
                  ]);
                  const hash = (
                    await deposit(0, utils.parseEther(depositAmount))
                  ).hash;
                  setTransacting(true);

                  watchTransaction(hash, async (receipt, success) => {
                    if (!success) {
                      setTransacting(false);
                    } else {
                      setTransacting(false);
                      window.location.reload(false);
                    }
                  });
                } else {
                  const hash = (
                    await approve(
                      process.env.REACT_APP_MASTERCHEF,
                      "999999999999999999999999999999999999999999999",
                      process.env.REACT_APP_FTM_WOOL_LP
                    )
                  ).hash;
                  setTransacting(true);

                  watchTransaction(hash, async (receipt, success) => {
                    if (!success) {
                      setTransacting(false);
                    } else {
                      setTransacting(false);
                      window.location.reload(false);
                    }
                  });
                }
              }}
            ></WoodButton>
          </div>
          <div className="flex flex-col items-center font-pixel gap-5">
            <div
              onClick={() => {
                setWithdrawAmount((staked / 10 ** 18).toString());
              }}
            >
              POWER: {(staked / 10 ** 18).toString()} MAX
            </div>
            <div>
              (position: {((staked / totalLpStaked) * 100).toPrecision(2)}%)
            </div>
            <div>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                style={{ "text-align": "center", height: "50px" }}
              ></input>
            </div>
            <WoodButton
              width="200"
              height="50"
              fontSize="15px"
              title="take back POWER"
              onClick={async () => {
                setLoadingScenes([
                  {
                    message: "It is just Loading...",
                    source: "",
                  },
                ]);
                const hash = (
                  await withdraw(0, utils.parseEther(withdrawAmount))
                ).hash;
                setTransacting(true);
                watchTransaction(hash, async (receipt, success) => {
                  if (!success) {
                    setTransacting(false);
                  } else {
                    setTransacting(false);
                    window.location.reload(false);
                  }
                });
              }}
            ></WoodButton>
          </div>
        </div>
      </div>
      <LoadingModal loadingScenes={loadingScenes} modalIsOpen={transacting} />
    </Container>
  );
};
export default Farm;
