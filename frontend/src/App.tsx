import React, { useEffect, useState } from 'react';
import './App.css';
import getContracts from './utilities/getContracts';

function App() {
  const [token, setToken] = useState<any>(undefined);
  const [awesome, setAwesome] = useState<any>(undefined);
  const [signerAddress, setSignerAddress] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [supply, setSupply] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      debugger;
      const { signerAddress, token, awesome } = await getContracts();
      setToken(token);
      setAwesome(awesome);
      setSignerAddress(signerAddress);
    };
    init();
  }, []);

  const getName = async () => {
    setName(await token!.name());
    const supply = await token!.totalSupply();
    setSupply(supply.toString());
  };
  useEffect(() => {
    token && getName();
  }, [token]);

  if (!token) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <h3>signerAddress: {signerAddress}</h3>
        <h3>Token Name: {name}</h3>
        <h3>Token Total Supply: {supply}</h3>
      </header>
    </div>
  );
}

export default App;
