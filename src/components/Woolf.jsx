import { decodeTokenURI } from "../utils/uri";
import { utils, BigNumber } from "ethers";
import { parseBigNumber } from "../utils/ethereum";

const Woolf = ({ woolf, onClick, selected, stats }) => {
  //const MAXIMUM_GLOBAL_WOOL = BigNumber.from(24000000).mul(BigNumber.from(10).pow(BigNumber.from(18)))
  const MAXIMUM_GLOBAL_WOOL = BigNumber.from(2400000000).mul(
    BigNumber.from(10).pow(BigNumber.from(18))
  );

  const unclaimedWool = () => {
    return woolf.unclaimed ? woolf.unclaimed.toFixed(2) : null;
  };

  const earnings = unclaimedWool();

  return (
    <div
      className="mx-3 relative cursor-pointer"
      style={{
        width: "64px",
        height: "64px",
        border: selected ? "solid 4px #B11D18" : "",
        padding: selected ? "2px" : "10px",
      }}
      onClick={onClick}
    >
      <div
        style={{
          width: "100%",
          height: "10px",
          background: "transparent",
          bottom: 0,
          right: 0,
          fontSize: "10px",
        }}
      >
        {woolf.number <= 10000 ? "Gen 0":"Gen 1"}
      </div>
      <img
        src={decodeTokenURI(woolf.tokenURI).image}
        alt="woolf"
        style={{ width: "100%", height: "100%" }}
      />
      {earnings && (
        <div
          className="absolute font-console text-red text-center flex items-center justify-center"
          style={{
            width: "100%",
            height: "14px",
            background: "white",
            bottom: 0,
            right: 0,
            fontSize: "10px",
          }}
        >
          {earnings}
        </div>
      )}
    </div>
  );
};

export default Woolf;
