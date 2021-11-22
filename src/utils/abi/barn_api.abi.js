const abi = [
  {
    inputs: [
      {
        internalType: "contract Barn",
        name: "barn",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "begin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
    ],
    name: "getUserWoolf",
    outputs: [
      {
        internalType: "uint256[]",
        name: "wollfs",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default abi;
