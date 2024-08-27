export const StakeFactoryAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
    ],
    name: "NewStaking",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deployedStakers",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "bytecode",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "salt",
        type: "uint256",
      },
    ],
    name: "getAddressCreate2",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "hardCap",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minTokenStake",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "apyEdu",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "apyToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardPoolToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardPoolEDU",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenToEDURate",
            type: "uint256",
          },
        ],
        internalType: "struct stakeOption",
        name: "option",
        type: "tuple",
      },
    ],
    name: "getBytecode",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "getdeployedStakers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "getdeployedStakersLen",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "hardCap",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minTokenStake",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "apyEdu",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "apyToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardPoolToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardPoolEDU",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenToEDURate",
            type: "uint256",
          },
        ],
        internalType: "struct stakeOption",
        name: "option",
        type: "tuple",
      },
    ],
    name: "newStaker",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];
