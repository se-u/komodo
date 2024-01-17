"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ethers } from "ethers";

import { connectToMetaMask } from "./data";
import abi from "@/artifacts/contracts/Election.sol/Election.json";
import { redirect } from "next/navigation";

const CONTRACT = "0x83906736dab595f24f01EE23265fbAdFa1aD1761";

export type State = {
  errors?: {
    name?: string[];
    idCard?: string[];
  };
  message?: string | null;
};

export async function validateVoter(formData: FormData) {
  const { name, idCard } = {
    name: formData.get("name"),
    idCard: formData.get("idCard"),
  };

  // const contract = await connectToMetaMask();
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT, abi.abi, signer);

  if (contract) {
    try {
      const tx = await contract.addVoter(name, idCard);
      const receipt = await tx.wait();
    } catch (error) {
      console.log(error);
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  revalidatePath("/check/status");
  redirect("/check/status");
}

export async function addVoter(formData: FormData) {
  const { name, idCard } = {
    name: formData.get("name"),
    idCard: formData.get("idCard"),
  };

  // const contract = await connectToMetaMask();
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT, abi.abi, signer);

  if (contract) {
    try {
      const tx = await contract.addVoter(name, idCard);
      const receipt = await tx.wait();
      console.log(`receipt: ${receipt}`);
    } catch (error) {
      console.log(error);
    }
  }
  revalidatePath("/dashboard/voter");
  redirect("/dashboard/voter");
}

export async function updateVoter(formData: FormData) {
  const { id, newName } = {
    id: formData.get("id"),
    newName: formData.get("name"),
  };

  // const contract = await connectToMetaMask();
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT, abi.abi, signer);

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

export async function verifyVoter(voterAddress: string) {
  const contract = await connectToMetaMask();
  if (contract) {
    try {
      const tx = await contract.verifyVoter(voterAddress);
      // const receipt = await tx.wait();
      console.log(`receipt: ${tx}`);
    } catch (error) {
      console.log(`failed to register: ${error.message}`);
    }
  }
}
