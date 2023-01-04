require("@nomicfoundation/hardhat-toolbox");

const INFURA = "https://goerli.infura.io/v3/40013e8122f34b3ea56d347c05228698";
const ALCHEMY =
  "https://eth-goerli.g.alchemy.com/v2/VRkzcqKw66q7M87aTcu8Vh0BzIcDsg_i";
const GOERLI_PRIVATE_KEY =
  "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  optimizer: {
    enabled: true,
    runs: 1000,
  },
  etherscan: {
    apiKey: "E2B95HYAHISK21JW7J2PWZ4YVQ58Y1VFH8",
  },
  networks: {
    goerli: {
      url: ALCHEMY,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};
