import {
  BigNumber,
  Contract
} from 'ethers'
import {
  _getProvider
} from './ethereum'
import FRIEND_SYSTEM_ABI from './abi/friendSystem.abi'

export const getFriendList = async (address) => {
  const provider = _getProvider()
  if (!provider) return []
  try {
      const signer = provider.getSigner()
      const contract = new Contract(process.env.REACT_APP_FRIEND_SYSTEM, FRIEND_SYSTEM_ABI, signer)
      return await contract.getFriendList(address)
  } catch (e) {
      console.log(e)
      return[]
  }
}

export const getRequestList = async (address) => {
  const provider = _getProvider()
  if (!provider) return []
  try {
      const signer = provider.getSigner()
      const contract = new Contract(process.env.REACT_APP_FRIEND_SYSTEM, FRIEND_SYSTEM_ABI, signer)
      return await contract.getRequestList(address)
  } catch (e) {
      console.log(e)
      return[]
  }
}