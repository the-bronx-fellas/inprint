

import inprintPreABI from '../artifacts/contracts/Inprint.sol/Inprint.json';

export const INPRINT_ABI = inprintPreABI.abi;
export const INPRINT_BYTECODE = inprintPreABI.bytecode;

export const PROVIDER_PARAMS = JSON.parse('{ "hardhat-local": { "chainId": "0x7A69", "chainName": "hardhat-local", "nativeCurrency": { "name": "GO", "symbol": "GO", "decimals": 18 }, "rpcUrls": [ "http://127.0.0.1:8545" ] }, "optimism": { "chainId": "0x10", "chainName": "Optimism", "nativeCurrency": { "name": "ETH", "symbol": "ETH", "decimals": 18 }, "rpcUrls": [ "https://optimism-mainnet.gateway.pokt.network/v1/lb/62b66987123e6f0039836b33" ] } }');


export const RPC_URL_MAP = {
  localhost: 'http://127.0.0.1:8545',
  optimism: 'https://optimism-mainnet.gateway.pokt.network/v1/lb/62b66987123e6f0039836b33'
};

// TODO: complete with this data: https://chainlist.org/
export const CHAIN_ID_MAPPING = {
  1: 'Ethereum Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Görli',
  10: 'Optimism',
  42: 'Kovan',
  137: 'Polygon Mainnet',
  250: 'Fantom Opera',
  4002: 'Fantom Testnet',
  31337: 'hardhat-local',
  43113: 'Avalanche Fuji Testnet',
  43114: 'Avalanche Mainnet C-Chain',
  1666600000: 'Harmony Mainnet'
};

