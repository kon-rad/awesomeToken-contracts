const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contract with the account: `, deployer.address);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  // BKSTPToken
  const BKSTPToken = await ethers.getContractFactory('BKSTPToken');
  const token = await BKSTPToken.deploy();
  console.log(`Token address: ${token.address}`);

  const tokenData = {
    address: token.address,
    abi: JSON.parse(token.interface.format('json')),
  };
  fs.writeFileSync('frontend/src/BKSTPToken.json', JSON.stringify(tokenData));

  // BKSTPWallOfAwesome
  const Awesome = await ethers.getContractFactory('BKSTPWallOfAwesome');
  const awesome = await Awesome.deploy(token.address);
  console.log(`BKSTPWallOfAwesome address: ${awesome.address}`);

  const awesomeData = {
    address: awesome.address,
    abi: JSON.parse(awesome.interface.format('json')),
  };
  fs.writeFileSync(
    'frontend/src/BKSTPWallOfAwesome.json',
    JSON.stringify(awesomeData)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
