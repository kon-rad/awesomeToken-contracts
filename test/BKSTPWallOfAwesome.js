const { expect } = require('chai');
const { BigNumber } = require('ethers');

describe('Contracts', () => {
  let Awesome, Token, awesome, token, owner, addr1, addr2;
  beforeEach(async () => {
    Awesome = await ethers.getContractFactory('BKSTPWallOfAwesome');
    Token = await ethers.getContractFactory('BKSTPToken');
    token = await Token.deploy();
    awesome = await Awesome.deploy(token.address);
    [owner, addr1, addr2, _] = await ethers.getSigners();
    await awesome.whitelistBatch([addr1.address, addr2.address]);
    await token.approve(awesome.address, 1000000);
  });

  describe('BKSTPToken', () => {
    it('Should set the right owner', async () => {
      expect(await token.owner()).to.equal(owner.address);
    });
    it('Should set the total of token balance to owner', async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('BKSTPWallOfAwesome', () => {
    it('Should set the right owner', async () => {
      expect(await awesome.owner()).to.equal(owner.address);
    });
    it('should transfer tokens to recipient when posting submission', async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      await awesome
        .connect(addr1)
        .createSubmission('Address 2 is awesome.', addr2.address);

      expect(await token.balanceOf(addr2.address)).to.equal(100);

      expect(await token.balanceOf(owner.address)).to.equal(
        BigNumber.from(initialOwnerBalance).sub(100)
      );
    });
  });
});
