"use server";
// lib/data/connectMetaMask.js
import abi from "@/artifacts/contracts/Election.sol/Election.json";
import { revalidatePath, unstable_noStore } from "next/cache";
import { deployedAddress } from "./utils";
import Web3, { ContractExecutionError } from "web3";

// export async function connectToMetaMask() {
//   // Check if MetaMask is installed
//   if (typeof window !== "undefined") {
//     if (typeof window.ethereum !== "undefined") {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []).then(async () => {});
//         const signer = await provider.getSigner();
//         const contract = new ethers.Contract(CONTRACT, abi.abi, signer);
//         return contract;
//       } catch (error) {
//         alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
//       }
//     } else {
//       alert("MetaMask not installed");
//     }
//   }
// }

// export async function fetchCanditates() {
//   // const contract = await connectToMetaMask();
//   if (contract) {
//     const candidatesList = await contract.getAllCandidates();
//     const formattedCandidates = candidatesList.map((candidate, index) => {
//       return {
//         index: index,
//         name: candidate.name,
//         img: candidate.image,
//         voteCount: ethers.toNumber(candidate.voteCount),
//       };
//     });
//     return formattedCandidates;
//   }
// }

async function getContract() {
  let web3: Web3;
  // if (window.ethereum) {
  // const provider = new Web3.providers.HttpProvider(window.ethereum);
  // web3 = new Web3(provider);
  // web3 = new Web3(window.ethereum);
  // await window.ethereum.request({ method: "eth_requestAccounts" });
  // const accounts = await web3.eth.getAccounts();
  // await window.ethereum.request({ method: "eth_requestAccounts" });
  // // web3 = new Web3(new Web3.providers.HttpProvider(window.ethereum));
  // console.log(web3);
  // } else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  // }
  const contract: any = new web3.eth.Contract(abi.abi, deployedAddress);
  const providersAccounts: string[] = await web3.eth.getAccounts();
  const account: string = providersAccounts[0];
  const result: { myContract: any; defaultAccount: string } = {
    myContract: contract,
    defaultAccount: account,
  };
  return result;
}

export async function fetchVoters() {
  unstable_noStore();
  const { myContract, defaultAccount } = await getContract();
  try {
    const voters: any = await myContract.methods.fetchVoters().call({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    const votersFormatted = voters.map((voter: string[], index: any) => {
      return {
        index: index,
        id: voter[0],
        name: voter[1],
        idCard: voter[2],
        isVerified: true ? voter[3] === "Verified" : false,
        isRegistered: true ? voter[4] === "Registered" : false,
      };
    });
    return votersFormatted;
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
}

export async function fetchVotersById(id: string) {
  unstable_noStore();

  const { myContract, defaultAccount } = await getContract();
  try {
    const voter: any = await myContract.methods.getVoterById(id).call({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    // console.log(voter);
    return {
      isRegistered: voter[0],
      isVerified: voter[1],
      id: voter[2],
      name: voter[3],
      idCard: voter[4],
      account: voter[5],
    };
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
}

export async function deleteVoterById(id: string) {
  const { myContract, defaultAccount } = await getContract();
  try {
    const receipt: any = await myContract.methods.deleteVoterById(id).send({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    console.log(`deleteVoter: ${receipt}`);
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
  revalidatePath("/dashboard/voter");
}

export async function deleteAdminByAddress(address: string) {
  const { myContract, defaultAccount } = await getContract();
  try {
    const receipt: any = await myContract.methods.deleteAdmin(address).send({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    console.log(`deleteAdmin: ${receipt}`);
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
  revalidatePath("/dashboard/settings");
}

export async function verifyVoterById(id: string) {
  const { myContract, defaultAccount } = await getContract();
  try {
    const receipt: any = await myContract.methods.verifyVoter(id).send({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    console.log(`verify: ${receipt}`);
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
  revalidatePath(`/ballot/${id}`);
  revalidatePath("/dashboard/voter");
}

export async function fetchStation() {
  unstable_noStore();
  const { myContract, defaultAccount } = await getContract();
  try {
    const receipt: any = await myContract.methods.fetchStation().call({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    console.log(`getStation: ${receipt}`);
    return receipt;
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
}
export async function fetchCandidates() {
  unstable_noStore();
  const { myContract, defaultAccount } = await getContract();
  try {
    const receipt: any = await myContract.methods.fetchCandidates().call({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    // console.log(`fecthCandidates: ${receipt}`);
    // console.log(receipt);
    const candidatesFormated = receipt.map((candidate: any[], index: any) => {
      return {
        index: index,
        name: candidate[0],
        image: candidate[1],
        count: candidate[2],
      };
    });
    // console.log(candidatesFormated);
    return candidatesFormated;
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
}

export async function fetchIsVoteActive(account: string) {
  unstable_noStore();
  const { myContract, defaultAccount } = await getContract();
  try {
    const receipt: any = await myContract.methods.isVoteActive().call({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    // console.log(`isVoteActive: ${receipt}`);
    return receipt;
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
  // revalidatePath(`/`);
}

export async function fetchAdmins() {
  unstable_noStore();
  const { myContract, defaultAccount } = await getContract();
  try {
    const receipt: any = await myContract.methods.fetchAllAdmin().call({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    console.log(`fetchAdmin: ${receipt}`);
    return receipt;
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
}

export async function deleteCandidate(index: number) {
  const { myContract, defaultAccount } = await getContract();
  try {
    const receipt: any = await myContract.methods.deleteCandidate(index).send({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    console.log(`deleteCandidate: ${receipt}`);
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
  revalidatePath("/dashboard/settings");
}
