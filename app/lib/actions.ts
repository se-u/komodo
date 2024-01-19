"use server";
// Master
import { revalidatePath } from "next/cache";
import { ethers } from "ethers";
import abi from "@/artifacts/contracts/Election.sol/Election.json";
import { redirect } from "next/navigation";
import Web3, { ContractExecutionError, Eip838ExecutionError } from "web3";
import { deployedAddress } from "./utils";

export async function navigateBallot(id: string) {
  redirect(`/ballot/${id}`);
}

export async function addCandidate(formData: FormData) {
  const { name, image } = {
    name: formData.get("name"),
    image: formData.get("image"),
  };
  // Set up a connection to the Ethereum network
  const web3: Web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:7545")
  );

  // Create a new contract object using the ABI and bytecode
  const myContract: any = new web3.eth.Contract(abi.abi, deployedAddress);
  // myContract.handleRevert = true;
  const providersAccounts: string[] = await web3.eth.getAccounts();
  const defaultAccount: string = providersAccounts[0];

  try {
    const receipt: any = await myContract.methods
      .addCandidate(name, image)
      .send({
        from: defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      });
    console.log(myContract.events.VoterRegistered);
    console.log("Transaction Hash: " + receipt.transactionHash);
    // return true;
    // console.log()
  } catch (error) {
    // console.error({error});
    const errorMessage = error.toJSON().innerError.toJSON().message;
    return { error: errorMessage };
  }
  revalidatePath("/dashboard/settings/");
  redirect("/dashboard/settings");
}

export async function updateCandidate(formData: FormData) {
  const { index, name, image } = {
    index: Number(formData.get("index")),
    name: formData.get("name"),
    image: formData.get("image"),
  };
  // Set up a connection to the Ethereum network
  const web3: Web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:7545")
  );

  // Create a new contract object using the ABI and bytecode
  const myContract: any = new web3.eth.Contract(abi.abi, deployedAddress);
  // myContract.handleRevert = true;
  const providersAccounts: string[] = await web3.eth.getAccounts();
  const defaultAccount: string = providersAccounts[0];

  try {
    const receipt: any = await myContract.methods
      .updateCandidate(index, name, image)
      .send({
        from: defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      });
    console.log(myContract.events.VoterRegistered);
    console.log("Transaction Hash: " + receipt.transactionHash);
    // return receipt.events.CandidateUpdated.returnValues;
  } catch (error) {
    // console.error({error});
    const errorMessage = error.toJSON().innerError.toJSON().message;
    console.log(errorMessage);
    // return { error: errorMessage };
  }
  revalidatePath("/dashboard/settings/");
  redirect("/dashboard/settings/");
}

export async function validateVoter(formData: FormData) {
  const { name, idCard } = {
    name: formData.get("name"),
    idCard: formData.get("idCard"),
  };
  // Set up a connection to the Ethereum network
  const web3: Web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:7545")
  );

  // Create a new contract object using the ABI and bytecode
  const myContract: any = new web3.eth.Contract(abi.abi, deployedAddress);
  // myContract.handleRevert = true;
  const providersAccounts: string[] = await web3.eth.getAccounts();
  const defaultAccount: string = providersAccounts[0];

  try {
    const receipt: any = await myContract.methods.addVoter(name, idCard).send({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    console.log(myContract.events.VoterRegistered);
    console.log("Transaction Hash: " + receipt.transactionHash);
    return receipt.events.VoterRegistered.returnValues;
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
}

export async function voteCandidate(formData: FormData) {
  const { index, uuid } = {
    index: Number(formData.get("card-option")),
    uuid: formData.get("uuid"),
  };
  // Set up a connection to the Ethereum network
  const web3: Web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:7545")
  );

  // Create a new contract object using the ABI and bytecode
  const myContract: any = new web3.eth.Contract(abi.abi, deployedAddress);
  // myContract.handleRevert = true;
  const providersAccounts: string[] = await web3.eth.getAccounts();
  const defaultAccount: string = providersAccounts[0];

  try {
    const receipt: any = await myContract.methods.vote(index, uuid).send({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    console.log(myContract.events.VoterRegistered);
    console.log("Transaction Hash: " + receipt.transactionHash);
    return receipt.events.Voted.returnValues;
  } catch (error) {
    // console.error({error});
    // const errorMessage = error.toJSON().innerError.toJSON().message;
    return error;
  }
}

export async function updateVoter(formData: FormData) {
  const { id, newName } = {
    id: formData.get("id"),
    newName: formData.get("name"),
  };

  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(deployedAddress, abi.abi, signer);

  if (contract) {
    try {
      const tx = await contract.updateVoter(id, newName);
      const receipt = await tx.wait();
      console.log(`receipt: ${receipt}`);
    } catch (error) {
      console.log(error);
    }
  }
  revalidatePath("/dasboard/voter");
  redirect("/dashboard/voter/");
}

export type ErorrVoter = {
  error: string;
};
