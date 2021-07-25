const { expect } = require('chai');

describe('BKSTPWallOfAwesome', () => {
  let Awesome, Token, awesome, token, owner, addr1, addr2;
  beforeEach(async () => {
    Awesome = await ethers.getContractFactory('BKSTPWallOfAwesome');
    Token = await ethers.getContractFactory('BKSTPToken');
    token = await Token.deploy();
    awesome = await Awesome.deploy(token.address);
    [owner, addr1, addr2, _] = await ethers.getSigners();
    console.log('owner: ', owner.address);
    // whitelist addr1 and addr2
    awesome.whitelistBatch([addr1.address, addr2.address]);
  });

  // it('should whitelist addresses', async () => {
  //   const wl = await awesome.whitelist(addr1.address);
  //   console.log('whitelist: ', wl);
  //   // expect(wl).to.include(addr1.address);
  // });

  it('should transfer tokens to recipient when posting submission', async () => {
    console.log('hello');
    await awesome
      .connect(addr1)
      .createSubmission('Thanks for being awesome', addr2.address);
  });
});
