import { Contract, utils, BigNumber } from "ethers";
import { _getProvider } from "./ethereum";
import BARN_ABI from "./abi/barn.abi";
import WOOLF_ABI from "./abi/woolf.abi";
import CLAIMABLE_ABI from "./abi/claimable.abi";

export const stake = async (account, tokenIds) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(process.env.REACT_APP_BARN, BARN_ABI, signer);
  const gasEstimate = await contract.estimateGas.addManyToBarnAndPack(
    account,
    tokenIds
  );
  return await contract.addManyToBarnAndPack(account, tokenIds, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const claim = async (tokenIds, unstake) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(process.env.REACT_APP_BARN, BARN_ABI, signer);
  const gasEstimate = await contract.estimateGas.claimManyFromBarnAndPack(
    tokenIds,
    unstake
  );
  return await contract.claimManyFromBarnAndPack(tokenIds, unstake, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const parseClaims = (receipt) => {
  const barn = new utils.Interface(BARN_ABI);
  const claims = [];
  receipt.logs.forEach((log) => {
    try {
      const args = barn.parseLog(log).args;
      if (args.tokenId) claims.push(args);
    } catch (error) {}
  });
  return claims;
};

export const claimable = async (tokenId, isSheep) => {
  const provider = _getProvider();
  if (!provider) return 0;

  const signer = provider.getSigner();
  const barnContract = new Contract(
    process.env.REACT_APP_BARN,
    BARN_ABI,
    signer
  );

  const woolfContract = new Contract(
    process.env.REACT_APP_WOOLF,
    WOOLF_ABI,
    signer
  );
  const barn = await barnContract.barn(tokenId);

  if (isSheep) {
    try {
      const result =
        ((Date.now() / 1000 - barn.value) * 10000000000000000000000) / 86400;
      return (result / 10 ** 18) * 0.8;
    } catch (e) {
      console.log(e);
      return 0;
    }
  } else {
    try {
      const tokenTraits = await woolfContract.tokenTraits(tokenId);
      console.log(tokenTraits.alphaIndex);
      const alpha = 8 - tokenTraits.alphaIndex;
      const woolPerAlpha = await barnContract.woolPerAlpha();
      const packIndices = await barnContract.packIndices(tokenId);
      const stake = await barnContract.pack(alpha, packIndices);
      return (alpha * (woolPerAlpha - stake.value)) / 10 ** 18;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }
};

export const getClaimable = async (tokenIds) => {
  const provider = _getProvider();
  if (!provider) return [];
  try {
    const signer = provider.getSigner();
    const contract = new Contract(
      process.env.REACT_APP_CLAIMABLE,
      CLAIMABLE_ABI,
      signer
    );
    return await contract.getClaimable(tokenIds);
  } catch (e) {
    console.log(e);
    return [];
  }
};
