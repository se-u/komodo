// Contract.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "./contracts/Election.json";
import { contractAddress } from "./contracts/getContract";

export function useContract() {
  const [contract, setContract] = useState(null);
  const [signerAddress, setSignerAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    connectToMetamask();
    // getCandidates();
    // add();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [signerAddress]);

  function handleAccountsChanged(accounts) {
    const hasMultipleAccounts = accounts.length > 0;
    const hasNewSigner = hasMultipleAccounts && signerAddress !== accounts[0];

    if (hasNewSigner) {
      setSignerAddress(accounts[0]);
    } else {
      setIsConnected(false);
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []).then(async () => {});
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const contractInstance = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );
        console.log(contractAddress);

        setContract(contractInstance);
        setSignerAddress(address);
        setIsConnected(true);
        // console.log("Metamask Connected : " + address);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser");
    }
  }

  return {
    contract,
    signerAddress,
    connectToMetamask,
    isConnected,
  };
}
