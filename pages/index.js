// Import React and necessary hooks from React
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import atm_abi from '../artifacts/contracts/Assessment.sol/Assessment.json';

// Define the HomePage component
function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [showTokens, setShowTokens] = useState(0); // State variable for showing tokens
  const [numTrans, setNumTrans] = useState(0); // State variable for showing number of transfers
  const [ethValue, setEthValue] = useState(""); // State for ETH input value
  const [receiverAddress, setReceiverAddress] = useState(""); // State for receiver address input value

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  // Function to get the Ethereum wallet instance
  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: 'eth_accounts' });
      handleAccount(accounts);
    }
  };

  // Handle account connection
  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected:", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  // Connect MetaMask wallet
  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ 'method': 'eth_requestAccounts' });
    handleAccount(accounts);

    getATMContract();
  };

  // Initialize ATM contract
  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  // Fetch and display token count
  const fetchShowTokens = async () => {
    if (atm) {
      try {
        const result = await atm.showTokens();
        setShowTokens(result.toNumber());
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      }
    }
  };

  // Fetch and display number of transfers
  const fetchNumTrans = async () => {
    if (atm) {
      try {
        const result = await atm.numTrans();
        setNumTrans(result.toNumber());
      } catch (error) {
        console.error("Failed to fetch transfers count:", error);
      }
    }
  };

  // Add tokens to the contract
  const addTokens = async () => {
    if (atm && ethValue!== "") {
      try {
        const tx = await atm.addTokens(parseInt(ethValue));
        await tx.wait();
        setTimeout(fetchShowTokens, 2000); // Refresh token count
        setTimeout(fetchNumTrans, 2000); // Refresh transfer count
      } catch (error) {
        console.error("Failed to add tokens:", error);
      }
    }
  };

  // Transfer tokens between addresses
  const transTokens = async () => {
    if (atm && receiverAddress!== "") {
      try {
        const tx = await atm.transTokens(parseInt(ethValue), receiverAddress);
        await tx.wait();
        setTimeout(fetchShowTokens, 2000); // Refresh token count
        setTimeout(fetchNumTrans, 2000); // Refresh transfer count
      } catch (error) {
        console.error("Failed to transfer tokens:", error);
      }
    }
  };

  // Render UI based on wallet connection status
  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your MetaMask wallet</button>;
    }

    return (
      <div>
        <p>Your Account: <strong>{account}</strong></p>
        <p>Your Current Token Count: <strong>{showTokens}</strong></p>
        <p>Your Current Number of Transfers: <strong>{numTrans}</strong></p>
        <p>Deposit, Withdraw, and Transfer in <strong>Denomination of 5 ETH</strong></p>
        <br></br><br></br>
        
        <section class="section">
          <center>
            <p class="p-section1">
              ETH: <input onInput={(e) => setEthValue(e.target.value)} type="number" placeholder="Enter ETH amount" />
              <button onClick={addTokens}>Add Tokens</button>
            </p>
            <p class="p-section1">
              Receiver Address: <input onInput={(e) => setReceiverAddress(e.target.value)} type="text" placeholder="Enter receiver address" />
              <button onClick={transTokens}>Transfer Tokens</button>
            </p>
          </center>
        </section>

      </div>
    );
  };

  // Effect hook to initialize wallet connection
  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header><h1>Welcome to MrLyrad ATM!</h1></header>
      {initUser()}
      <style jsx global>{`
      body {
        background: pink;
        font-family: "Martel", serif;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: normal;
        line-height: 1;
        color: #000000;
        margin: 5em;
        padding: 0;
        position: relative;
      }

      h1 {
        font-family: "Gothic A1", sans-serif;
        font-weight: 700;
        font-style: normal;
        color: #000000;
        -webkit-font-variant-ligatures: common-ligatures;
        font-variant-ligatures: common-ligatures;
        text-rendering: optimizeLegibility;
      }

      p {
        font-family: "Gothic A1", sans-serif;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.833;
        margin-bottom: 3.6rem;
        color: #000000;
      }

      .section {
        background-color: #aa336a;
        padding: 5px;
      }
      .p-section1 {
        color: #ffffff
      }

      `}</style>
    </main>
  );
}

// Export HomePage as the default export
export default HomePage;
