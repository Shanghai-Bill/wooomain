import { BigNumber, Contract } from "ethers";
import { _getProvider } from "./ethereum";
import FRIEND_SYSTEM_ABI from "./abi/friendSystem.abi";

export const getFriendList = async (address) => {
  const provider = _getProvider();
  if (!provider) return [];
  try {
    const signer = provider.getSigner();
    const contract = new Contract(
      process.env.REACT_APP_FRIEND_SYSTEM,
      FRIEND_SYSTEM_ABI,
      signer
    );
    return await contract.getFriendList(address);
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getRequestList = async (address) => {
  const provider = _getProvider();
  if (!provider) return [];
  try {
    const signer = provider.getSigner();
    const contract = new Contract(
      process.env.REACT_APP_FRIEND_SYSTEM,
      FRIEND_SYSTEM_ABI,
      signer
    );
    return await contract.getRequestList(address);
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getPendingList = async (address) => {
  const provider = _getProvider();
  if (!provider) return [];
  try {
    const signer = provider.getSigner();
    const contract = new Contract(
      process.env.REACT_APP_FRIEND_SYSTEM,
      FRIEND_SYSTEM_ABI,
      signer
    );
    return await contract.getPendingList(address);
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const addFriend = async (target) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(
    process.env.REACT_APP_FRIEND_SYSTEM,
    FRIEND_SYSTEM_ABI,
    signer
  );
  const gasEstimate = await contract.estimateGas.addFriend(target);
  return await contract.addFriend(target, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const removeFriend = async (target) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(
    process.env.REACT_APP_FRIEND_SYSTEM,
    FRIEND_SYSTEM_ABI,
    signer
  );
  const gasEstimate = await contract.estimateGas.removeFriend(target);
  return await contract.removeFriend(target, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const cancelManyPendings = async (targets) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(
    process.env.REACT_APP_FRIEND_SYSTEM,
    FRIEND_SYSTEM_ABI,
    signer
  );
  const gasEstimate = await contract.estimateGas.cancelManyPendings(targets);
  return await contract.cancelManyPendings(targets, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const cancleManyRequests = async (targets) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(
    process.env.REACT_APP_FRIEND_SYSTEM,
    FRIEND_SYSTEM_ABI,
    signer
  );
  const gasEstimate = await contract.estimateGas.cancleManyRequests(targets);
  return await contract.cancleManyRequests(targets, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const addManyFriends = async (targets) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(
    process.env.REACT_APP_FRIEND_SYSTEM,
    FRIEND_SYSTEM_ABI,
    signer
  );
  const gasEstimate = await contract.estimateGas.addManyFriends(targets);
  return await contract.addManyFriends(targets, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};