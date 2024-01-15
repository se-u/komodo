// lib/data/connectMetaMask.js
import abi from "@/artifacts/contracts/Election.sol/Election.json";
import { ContractRunner, ethers } from "ethers";

const CONTRACT = "0xd926AF0e7EdA928aB0ed411AcEe5cAc90784ef07";

export async function connectToMetaMask() {
  // Check if MetaMask is installed
  if (typeof window !== "undefined") {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []).then(async () => {});
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT, abi.abi, signer);
        return contract;
      } catch (error) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }
}

export async function fetchCanditates() {
  const contract = await connectToMetaMask();
  if (contract) {
    const candidatesList = await contract.getAllCandidates();
    const formattedCandidates = candidatesList.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        img: candidate.image,
        voteCount: ethers.toNumber(candidate.voteCount),
      };
    });
    return formattedCandidates;
  }
}

export async function pushCanditate(signer: ContractRunner) {
  const contract = await connectToMetaMask();
  if (contract) {
    const tx = await contract.addCandidate("Jack", "gambar-jack");
    const receipt = await tx.wait();
    // console.log(`receipt: ${receipt}`);
  }
}
