// lib/data/connectMetaMask.js
import abi from "@/artifacts/contracts/Election.sol/Election.json";
import { ContractRunner, ethers } from "ethers";

const CONTRACT = "0xAe134d2896b21D99C000B442704de133D34cC151";

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

export async function fetchCredential() {
  const contract = await connectToMetaMask();
  if (contract) {
    try {
      const credential = await contract.getVoterByName("jack");
      return {
        isRegistered: credential[0],
        isVerified: credential[1],
        name: credential[2],
        idCard: credential[3],
        account: credential[4],
      };
      // credential.map((index) => {
      //   return {
      //     isRegistered: credential[index],
      //     img: credential[index],
      //     voteCount: ethers.toNumber(candidate.voteCount),
      //   };
      // });
    } catch (error) {
      return { message: "error" };
    }
  }
}

export async function fetchVoters() {
  const contract = await connectToMetaMask();
  if (contract) {
    try {
      const voters = await contract.getAllVoters();
      const votersFormatted = voters.map((voter, index) => {
        return {
          index: index,
          isRegistered: voter[0],
          isVerified: voter[1],
          name: voter[2],
          idCard: voter[3],
          account: voter[4],
        };
      });
      return votersFormatted;
      // credential.map((index) => {
      //   return {
      //     isRegistered: credential[index],
      //     img: credential[index],
      //     voteCount: ethers.toNumber(candidate.voteCount),
      //   };
      // });
    } catch (error) {
      return { message: "error" };
    }
  }
}

export async function fetchRemainingTime() {
  const contract = await connectToMetaMask();
  if (contract) {
    try {
      console.log("terpanggil time");

      const tx = await contract.getRemainingTime();
      return tx;
    } catch (error) {
      console.log(`failed to register: ${error.message}`);
    }
  }
  // console.log(voterAddress);
  // revalidatePath("/dasboard/voter");
  // redirect("/validate/status");
}

export async function pushCanditate(signer: ContractRunner) {
  const contract = await connectToMetaMask();
  if (contract) {
    const tx = await contract.addCandidate("Jack", "gambar-jack");
    const receipt = await tx.wait();
    // console.log(`receipt: ${receipt}`);
  }
}
