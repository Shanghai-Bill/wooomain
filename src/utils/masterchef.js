import { BigNumber, Contract } from "ethers";
import { _getProvider } from "./ethereum";
import MASTERCHEF_ABI from "./abi/masterchef.abi";
import WOOL_ABI from "./abi/wool.abi";

export const pendingweed = async (pid, address) => {
  const provider = _getProvider();
  if (!provider) return BigNumber.from("0");
  try {
    const signer = provider.getSigner();
    const contract = new Contract(
      process.env.REACT_APP_MASTERCHEF,
      MASTERCHEF_ABI,
      signer
    );
    return await contract.pendingweed(pid, address);
  } catch (e) {
    console.log(e);
    return BigNumber.from("0");
  }
};

export const deposit = async (pid, amount) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(
    process.env.REACT_APP_MASTERCHEF,
    MASTERCHEF_ABI,
    signer
  );
  const gasEstimate = await contract.estimateGas.deposit(pid, amount);
  return await contract.deposit(pid, amount, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const withdraw = async (pid, amount) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(
    process.env.REACT_APP_MASTERCHEF,
    MASTERCHEF_ABI,
    signer
  );
  const gasEstimate = await contract.estimateGas.withdraw(pid, amount);
  return await contract.withdraw(pid, amount, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const approve = async (spender, amount) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(process.env.REACT_APP_WEED, WOOL_ABI, signer);
  const gasEstimate = await contract.estimateGas.approve(spender, amount);
  return await contract.approve(spender, amount, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const balanceOfLp = async (address) => {
  const provider = _getProvider();
  if (!provider) return BigNumber.from("0");
  try {
    const signer = provider.getSigner();
    const contract = new Contract(
      "0x143f2D63cAC8783f6e0A0C8F892f01FCe06DbAf7",
      WOOL_ABI,
      signer
    );
    return await contract.balanceOf(address);
  } catch (e) {
    console.log(e);
    return BigNumber.from("0");
  }
};

export const balanceOfWeed = async (address) => {
  const provider = _getProvider();
  if (!provider) return BigNumber.from("0");
  try {
    const signer = provider.getSigner();
    const contract = new Contract(process.env.REACT_APP_WEED, WOOL_ABI, signer);
    return await contract.balanceOf(address);
  } catch (e) {
    console.log(e);
    return BigNumber.from("0");
  }
};
