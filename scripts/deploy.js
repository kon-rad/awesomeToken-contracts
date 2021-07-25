const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contract with the account: `, deployer.address);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  // BKSTPToken
  const BKSTPToken = await ethers.getContractFactory('BKSTPToken');
  const token = await BKSTPToken.deploy();
  console.log(`greeter address: ${token.address}`);

  const data = {
    address: token.address,
    abi: JSON.parse(token.interface.format('json')),
  };
  fs.writeFileSync('frontend/src/BKSTPToken.json', JSON.stringify(data));

  // BKSTPWallOfAwesome
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
