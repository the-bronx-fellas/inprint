
require("@nomiclabs/hardhat-waffle");

require('hardhat-abi-exporter');

const dotenv = require("dotenv");

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});



module.exports = {

  networks: {
    optimism: {
      url: "https://optimism-mainnet.gateway.pokt.network/v1/lb/62b66987123e6f0039836b33",
      accounts: [`0x${process.env.ETHPRIV}`]
    },
    hardhat: {
      chainID: 31337
    }
  },

  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./client/src/artifacts"
  },

  mocha: {
    timeout: 40000
  },

  abiExporter: {
    runOnCompile: true,
    clear: true,
    flat: true,
    pretty: false,
  }
};
