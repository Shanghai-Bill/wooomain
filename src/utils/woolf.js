import { Contract, utils, BigNumber } from "ethers";
import { _getProvider } from "./ethereum";
import WOOLF_ABI from "./abi/woolf.abi";
import BARN_ABI from "./abi/barn.abi";
import BARN_API_ABI from "./abi/barn_api.abi";

export const mint = async (stake, tokens, paid) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(process.env.REACT_APP_WOOLF, WOOLF_ABI, signer);
  const gasEstimate = await contract.estimateGas.mint(tokens, stake, {
    value: paid
      ? utils.parseUnits("36", "ether").mul(BigNumber.from(tokens))
      : BigNumber.from(0),
  });
  return await contract.mint(tokens, stake, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
    value: paid
      ? utils.parseUnits("36", "ether").mul(BigNumber.from(tokens))
      : BigNumber.from(0),
  });
};

export const parseMint = (staked, receipt) => {
  const woolf = new utils.Interface(WOOLF_ABI);
  const barn = new utils.Interface(BARN_ABI);

  const results = {};
  for (let x in receipt.logs) {
    try {
      const log = barn.parseLog(receipt.logs[x]);
      results[log.args.tokenId.toString()] = {
        tokenId: log.args.tokenId,
        recipient: log.args.owner,
        stake: true,
      };
      continue;
    } catch (e) {}
    try {
      const log = woolf.parseLog(receipt.logs[x]);
      results[log.args.tokenId.toString()] = {
        tokenId: log.args.tokenId,
        recipient: log.args.to,
        stake: false,
      };
    } catch (e) {}
  }

  return results;
};

export const tokenURI = async (tokenId) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(process.env.REACT_APP_WOOLF, WOOLF_ABI, signer);
  return await contract.tokenURI(tokenId);
};

export const loadWoolfList = async (address) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(
    "0xD04F2119B174c14210E74E0EBB4A63a1b36AD409",
    WOOLF_ABI,
    signer
  );
  const num = await contract.balanceOf(address);
  return Promise.all(
    new Array(parseInt(num._hex)).fill(",").map((v, i) => LoadWoolf(i))
  );
  async function LoadWoolf(i) {
    let index = await contract.tokenOfOwnerByIndex(address, i);
    const idx = parseInt(index);
    let [tokenData, tokenURI] = await Promise.all([
      contract.tokenTraits(index),
      contract.tokenURI(index),
    ]);
    return {
      id: idx.toString(16),
      number: idx,
      owner: { id: address },
      isSheep: tokenData.isSheep,
      tokenURI: tokenURI,
    };
  }
};

const pageSize = 1000;
export const loadStakedWoolfList = async (address, total) => {
  if (total === 0) return [];
  const ids = await loadStakedWoolfList2(address, total);
  console.log(ids);
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(process.env.REACT_APP_WOOLF, WOOLF_ABI, signer);
  return Promise.all(ids.map((i) => LoadWoolf(i)));
  async function LoadWoolf(i) {
    let [tokenData, tokenURI] = await Promise.all([
      contract.tokenTraits(i),
      contract.tokenURI(i),
    ]);
    return {
      id: i.toString(16),
      number: i,
      owner: { id: address },
      isSheep: tokenData.isSheep,
      tokenURI: tokenURI,
    };
  }
};
export const loadStakedWoolfList2 = async (
  address,
  total,
  begin = 1,
  end = pageSize
) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(
    process.env.REACT_APP_BARN_API,
    BARN_API_ABI,
    signer
  );
  const { wollfs, i } = await contract.getUserWoolf(
    process.env.REACT_APP_BARN,
    address,
    begin,
    end
  );
  const iv = parseInt(i._hex);
  const list = wollfs.map((i) => parseInt(i._hex)).filter((i) => i !== 0);
  if (iv <= end)
    return list.concat(
      await loadStakedWoolfList2(address, total, iv + 1, iv + 1 + pageSize)
    );
  if (end >= total) return list;
  return list.concat(
    await loadStakedWoolfList2(
      address,
      total,
      iv,
      Math.min(total, iv + pageSize)
    )
  );
};

export const loadTotalSupply = async () => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(process.env.REACT_APP_WOOLF, WOOLF_ABI, signer);
  return await contract.minted.call();
};

export const isInvalidWoolf = (tokenURI) => {
  return (
    tokenURI.image ===
    "data:image/svg+xml;base64,PHN2ZyBpZD0id29vbGYiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48aW1hZ2UgeD0iNCIgeT0iNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBpbWFnZS1yZW5kZXJpbmc9InBpeGVsYXRlZCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0JBTUFBQUNCVkdmSEFBQUFGVkJNVkVVQUFBRGZ2cWV5alhPVVhGa0FBQUIzUmt3bkp5ZTVySXhFQUFBQUFYUlNUbE1BUU9iWVpnQUFBT2xKUkVGVUtNOWQwVXR5d3lBTUJ1QXN1QUR1WTU5Zk5BZVFTTmNFSzltM3VBZm9lSHovSzBRbWptR2loWmo1UmhJYU9GaG9hcmxHRHBZY0dveElwdFFCQjFWSUJ3S0FPc2pldy9zT0xoWGFET2NyRExHREFZYmhGZDUzT0c3UURhM1JYN3ZHME1CVitIeUZPYlNXLzdXQTI2cmpsOEV2eS9Uc0VQejREd0xGSFhqd0VKSnoyb0RZVm1NaTJZR08vZzBtMHhQQUhzUzhEOG5NQTR0SlRCdWNyWitwVUpnZU1uNkRCVklrY256QUtZT0VaZzRGcWJhY1JxRHdJa0U1MUlvNEFiTmNTOXcrY1lrVDQxWnV5d1pYaVg5akxHS244eXRranFwS2xEbGQ2anM2VmN1cVRpMGQ3cUt1TTY2TGlsVnpBQUFBQUVsRlRrU3VRbUNDIi8+PGltYWdlIHg9IjQiIHk9IjQiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgaW1hZ2UtcmVuZGVyaW5nPSJwaXhlbGF0ZWQiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUNBQUFBQWdCQU1BQUFDQlZHZkhBQUFBRWxCTVZFVUFBQURwNGlXeEhSamVzQy9hUERhR0lpZXkwK2I5QUFBQUFYUlNUbE1BUU9iWVpnQUFBRFZKUkVGVUtNOWpBQUZtQVVNQlF3WWtJT1NvNUtnaWdPQXpCNGtxcVFnNUlxa3dWUXhTREFLcVFDZ3hOaFlVWkJnRnd3d0FBQ2EyQkNuUmtpb3JBQUFBQUVsRlRrU3VRbUNDIi8+PGltYWdlIHg9IjQiIHk9IjQiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgaW1hZ2UtcmVuZGVyaW5nPSJwaXhlbGF0ZWQiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUNBQUFBQWdCQU1BQUFDQlZHZkhBQUFBRlZCTVZFVUFBQUJEUDJSUVdaWXdZOVBhUERZa1VwbXhIUmdrdllKSkFBQUFBWFJTVGxNQVFPYllaZ0FBQUNwSlJFRlVLTTlqb0JzUVVoSVVGRlJTRW9RTE1JWUdNcVlsTWpBSXdBV01EUmxkSExFS2pJSUJBZ0N6RVFReUxKZzRVZ0FBQUFCSlJVNUVya0pnZ2c9PSIvPjxpbWFnZSB4PSI0IiB5PSI0IiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGltYWdlLXJlbmRlcmluZz0icGl4ZWxhdGVkIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQWdNQUFBQU9GSkpuQUFBQURGQk1WRVVBQUFBQUFBQ0dSRXVtWEZpeUxRdXFBQUFBQVhSU1RsTUFRT2JZWmdBQUFCdEpSRUZVR05Oam9Bdmcvd0JsY0MyQU1vUWFvUXpXRUliQkRBREZXUUtXZTFvMGFRQUFBQUJKUlU1RXJrSmdnZz09Ii8+PGltYWdlIHg9IjQiIHk9IjQiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgaW1hZ2UtcmVuZGVyaW5nPSJwaXhlbGF0ZWQiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVFBQUFDMUhBd0NBQUFBQzBsRVFWUjQybU5rWUFBQUFBWUFBakNCMEM4QUFBQUFTVVZPUks1Q1lJST0iLz48L3N2Zz4="
  );
};
