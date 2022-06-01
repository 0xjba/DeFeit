require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
