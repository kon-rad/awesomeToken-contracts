import { Contract, ethers } from 'ethers';
import BKSTPToken from '../BKSTPToken.json';
import BKSTPWallOfAwesome from '../BKSTPWallOfAwesome.json';

declare global {
  interface Window {
    ethereum: any;
  }
}

type BKSTPContracts = {
  signerAddress?: any;
  token: any;
  awesome: any;
};

const getContracts = (): Promise<BKSTPContracts> => {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();

        const token = new Contract(BKSTPToken.address, BKSTPToken.abi, signer);
        const awesome = new Contract(
          BKSTPWallOfAwesome.address,
          BKSTPWallOfAwesome.abi,
          signer
        );

        resolve({ signerAddress, token, awesome });
      }
      resolve({
        signerAddress: undefined,
        token: undefined,
        awesome: undefined,
      });
    });
  });
};

export default getContracts;
