require('@nomiclabs/hardhat-waffle');

const { INFURA_URL, PRIVATE_KEY } = require('./keys');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
