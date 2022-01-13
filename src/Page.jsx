import Container from "./components/Container";
import Minting from "./components/Minting";
import Farm from "./components/Farm";
import WeedFarm from "./components/WeedFarm";
import Staking from "./components/Staking";
// import { useQuery } from '@apollo/client'
import { parseGraphObject, QUERY } from "./utils/query";
import WoodButton from "./components/WoodButton";
import { useEffect, useState } from "react";
import LoadingModal from "./components/LoadingModal";
import EthereumInteraction from "./components/EthereumInteraction";
import { parseBigNumber, watchTransaction } from "./utils/ethereum";

import {
  getFriendList,
  getRequestList,
  getPendingList,
  addFriend,
  removeFriend,
  cancelManyPendings,
  cancleManyRequests,
  addManyFriends,
} from "./utils/friendSystem";

const Page = ({ wallet, chain, wool, reload, total, woolf, stakedWoolf }) => {
  const { data, loading } = {};

  let staked = stakedWoolf;
  let tokens = woolf;

  if (data) {
    tokens = [...data.tokens.map((x) => parseGraphObject(x))].sort((e1, e2) => {
      return parseInt(e1.id, 16) - parseInt(e2.id, 16);
    });
    staked = [...data.stakes.map((x) => parseGraphObject(x))].sort((e1, e2) => {
      return parseInt(e1.id, 16) - parseInt(e2.id, 16);
    });
  }

  const friendWords = ["list", "", "invite me", "I invite"];
  // const friendList = [
  //   "0x000000000000001",
  //   "0x000000000000002",
  //   "0x000000000000003",
  //   "0x000000000000004",
  // ];
  // const inviteList = [
  //   "0x100000000000000",
  //   "0x110000000000000",
  //   "0x400000000000000",
  //   "0x500000000000000",
  // ];
  // const invitedList = [
  //   "0x200000000000000",
  //   "0x220000000000000",
  //   "0x300000000000000",
  //   "0x600000000000000",
  // ];

  const [friendList, setFriendList] = useState([]);
  const [inviteList, setInviteList] = useState([]);
  const [invitedList, setInvitedList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [inputId, setInputId] = useState("");
  const [selectedAddr, setSelectedAddr] = useState([]);
  const [showType, setShowType] = useState(0);

  const [transacting, setTransacting] = useState(false);

  // useEffect(() => {
  //   //TODO：根据点击的showType更新showList
  //   setSelectedList(showList.map(() => false));
  // }, [showType]);

  useEffect(() => {
    async function fetch() {
      const _friendList = await getFriendList(wallet);
      setFriendList(_friendList);
      const _inviteList = await getPendingList(wallet);
      setInviteList(_inviteList);
      const _invitedList = await getRequestList(wallet);
      setInvitedList(_invitedList);

      setShowList(_friendList);
      // console.log(_friendList);
      // console.log(_inviteList);
      // console.log(_invitedList);
    }
    fetch();
  }, [wallet]);

  return (
    <div className="w-full flex flex-col md:justify-center items-center p-5">
      <LoadingModal modalIsOpen={transacting} loadingScenes={[]} />
      <div className="title text-center justify-self-start mb-5">
        Fantom Wolf Game / M
      </div>

      <div
        className="mb-5 font-console text-red text-sm"
        style={{ maxWidth: "600px" }}
      >
        <Container transparent={false}>
          <div className="flex flex-col jsutify-center items-center">
            Sheep and Wolves competing for $WOOL on a farm in the metaverse.
            Nothing but blockchain. No roadmap. Fully in the Public Domain.
            <br />
            <br />
            <div style={{ fontSize: "12px" }}>
              <div style={{ fontSize: "20px" }}>⚠️⚠️⚠️️️</div>
              Please kindly wait 2-3 minutes until the staking list loads
              properly after each reload.
              <br />
            </div>
            <br />
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-2">
              <WoodButton
                width={150}
                height={50}
                title={"Docs"}
                fontSize={15}
                onClick={() => {
                  window.open("https://fwolfgame.gitbook.io/fantom-wolf-game/");
                }}
              />
              <WoodButton
                width={150}
                height={50}
                title={"Telegram"}
                fontSize={15}
                onClick={() => {
                  window.open("https://t.me/FantomWolfGame_chat");
                }}
              />
              <WoodButton
                width={150}
                height={50}
                title={"twitter"}
                fontSize={15}
                onClick={() => {
                  window.open("https://twitter.com/FantomWolfGame");
                }}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-2">
              <WoodButton
                width={150}
                height={50}
                title={"buy $wool"}
                fontSize={15}
                onClick={() => {
                  window.open(
                    "https://spookyswap.finance/swap?outputCurrency=0x2E4bF93BdEd3236D0719aa3ceB43932f279EFe1F"
                  );
                }}
              />
              <WoodButton
                width={150}
                height={50}
                title={"buy sheep"}
                fontSize={15}
                onClick={() => {
                  window.open(
                    "https://paintswap.finance/marketplace/collections/0xd04f2119b174c14210e74e0ebb4a63a1b36ad409"
                  );
                }}
              />
              <WoodButton
                width={150}
                height={50}
                title={"add liquidity"}
                fontSize={15}
                onClick={() => {
                  window.open(
                    "https://spookyswap.finance/add/0x2E4bF93BdEd3236D0719aa3ceB43932f279EFe1F/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83"
                  );
                }}
              />
            </div>
          </div>
        </Container>
      </div>

      <div
        className="mb-5 flex flex-col md:flex-row justify-center items-center gap-10 w-full"
        style={{ maxWidth: "1500px" }}
      >
        <div className="h-full w-full md:w-1/2 flex justify-between flex flex-col gap-5">
          <Container>
            <div className="flex flex-col items-center font-pixel gap-5">
              <div className={showType == 0 ? "selected" : ""}>
                <WoodButton
                  width={250}
                  height={50}
                  title={"friend list"}
                  fontSize={15}
                  onClick={() => {
                    setShowType(0);
                    setShowList(friendList);
                    setSelectedAddr([]);
                  }}
                />
              </div>
              <div className={showType == 1 ? "selected" : ""}>
                <WoodButton
                  width={250}
                  height={50}
                  title={"action"}
                  fontSize={15}
                  onClick={() => {
                    setShowType(1);
                    setSelectedAddr([]);
                  }}
                />
              </div>
              <div className={showType == 2 ? "selected" : ""}>
                <WoodButton
                  width={250}
                  height={50}
                  title={"Invites Received"}
                  fontSize={15}
                  onClick={() => {
                    setShowType(2);
                    setSelectedAddr([]);
                    setShowList(inviteList);
                  }}
                />
              </div>
              <div className={showType == 3 ? "selected" : ""}>
                <WoodButton
                  width={250}
                  height={50}
                  title={"Invites Sent"}
                  fontSize={15}
                  onClick={() => {
                    setShowType(3);
                    setSelectedAddr([]);
                    setShowList(invitedList);
                  }}
                />
              </div>
            </div>
          </Container>

          <Container>
            <div
              className="flex flex-col items-center font-pixel gap-5"
              style={{ "overflow-y": "auto", maxHeight: "450px" }}
            >
              <div className="subtitle mt-5">friends</div>
              <div className="subtitle">{friendWords[showType]}</div>
              {showType == 1 ? (
                <input
                  placeholder="wallet address"
                  onChange={(e) => {
                    setInputId(e.target.value);
                  }}
                ></input>
              ) : (
                showList.map((str, index) => (
                  <div
                    key={str + index}
                    className={
                      selectedAddr.includes(str)
                        ? "selected class-for-ids"
                        : "class-for-ids"
                    }
                  >
                    <WoodButton
                      width={250}
                      height={50}
                      title={str}
                      fontSize={15}
                      onClick={(event) => {
                        if (showType == 0) {
                          navigator.clipboard.writeText(str).then(() => {
                            alert("Friend's address copied!");
                          });
                        } else {
                          if (selectedAddr.includes(str)) {
                            setSelectedAddr((old) =>
                              old.filter((x) => x != str)
                            );
                          } else {
                            setSelectedAddr((old) => [...old, str]);
                          }
                        }
                      }}
                    />
                  </div>
                ))
              )}
              {showType == 1 && (
                <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-2">
                  <WoodButton
                    width={100}
                    height={75}
                    title={"add"}
                    fontSize={15}
                    onClick={async () => {
                      console.log(inputId);
                      const hash = (await addFriend(inputId)).hash;
                      setTransacting(true);
                      watchTransaction(hash, async (receipt, success) => {
                        if (!success) {
                          setTransacting(false);
                        }
                        setTransacting(false);
                      });
                      //添加朋友
                    }}
                  />
                  <WoodButton
                    width={100}
                    height={75}
                    title={"remove"}
                    fontSize={15}
                    onClick={async () => {
                      console.log(inputId);
                      const hash = (await removeFriend(inputId)).hash;
                      setTransacting(true);
                      watchTransaction(hash, async (receipt, success) => {
                        if (!success) {
                          setTransacting(false);
                        }
                        setTransacting(false);
                      });
                      //添加朋友
                    }}
                  />
                </div>
              )}
              {showType == 2 && (
                <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-2">
                  <WoodButton
                    width={100}
                    height={80}
                    title={"approve"}
                    fontSize={15}
                    onClick={async () => {
                      const hash = (await addManyFriends(selectedAddr)).hash;
                      setTransacting(true);
                      watchTransaction(hash, async (receipt, success) => {
                        if (!success) {
                          setTransacting(false);
                        }
                        setTransacting(false);
                      });
                    }}
                  />
                  <WoodButton
                    width={100}
                    height={80}
                    title={"reject"}
                    fontSize={15}
                    onClick={async () => {
                      const hash = (await cancelManyPendings(selectedAddr))
                        .hash;
                      setTransacting(true);
                      watchTransaction(hash, async (receipt, success) => {
                        if (!success) {
                          setTransacting(false);
                        }
                        setTransacting(false);
                      });
                    }}
                  />
                </div>
              )}
              {showType == 3 && (
                <WoodButton
                  width={150}
                  height={75}
                  title={"cancel"}
                  fontSize={15}
                  onClick={async () => {
                    const hash = (await cancleManyRequests(selectedAddr)).hash;
                    setTransacting(true);
                    watchTransaction(hash, async (receipt, success) => {
                      if (!success) {
                        setTransacting(false);
                      }
                      setTransacting(false);
                    });
                  }}
                />
              )}
            </div>
          </Container>
        </div>
        <div className="h-full w-full md:w-1/2 flex justify-between flex flex-col gap-5">
          <Minting
            wallet={wallet}
            chain={chain}
            total={total}
            reload={() => {
              reload();
            }}
            woolBalance={wool}
          />
        </div>
        <div className="h-full w-full md:w-1/2 flex justify-center">
          <Staking
            wallet={wallet}
            chain={chain}
            wool={wool}
            tokens={tokens}
            stakes={staked}
            reload={() => {
              reload();
            }}
            fetching={loading}
          />
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row justify-center items-center gap-10 w-full"
        style={{ maxWidth: "1500px" }}
      >
        <div
          className="h-full w-full flex justify-between flex flex-col gap-5"
          style={{ width: "60%" , display:"contents"}}
        >
          <Farm wallet={wallet}></Farm>
          <WeedFarm wallet={wallet}></WeedFarm>
        </div>
      </div>
    </div>
  );
};

// <img className="absolute h-full w-full object-cover" src="./images/background.png" alt="" style={{zIndex:-1000}}/>

export default Page;
