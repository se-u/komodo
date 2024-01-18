"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ethers } from "ethers";

import { connectToMetaMask } from "./data";
import abi from "@/artifacts/contracts/Election.sol/Election.json";
import { redirect } from "next/navigation";
import Web3 from "web3";
import { deployedAddress } from "./utils";

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
  myContract.handleRevert = true;

  async function interact(): Promise<void> {
    const providersAccounts: string[] = await web3.eth.getAccounts();
    const defaultAccount: string = providersAccounts[0];

    try {
      const receipt: any = await myContract.methods
        .addVoter(name, idCard)
        .send({
          from: defaultAccount,
          gas: 1000000,
          gasPrice: "10000000000",
        });
      console.log(myContract.events.VoterRegistered);
      console.log("Transaction Hash: " + receipt.transactionHash);
      return receipt.events.VoterRegistered.returnValues;

      // Get the updated value of my number
      // const myNumberUpdated: string = await myContract.methods.myNumber().call();
      // console.log("my number updated value: " + myNumberUpdated);
    } catch (error) {
      console.error(error);
    }
  }
  const tx = await interact();
  console.log(tx);
  if (tx.uuid !== undefined || tx.uuid !== null) {
    redirect(`/dashboard/voter/${tx.uuid}/edit`);
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
