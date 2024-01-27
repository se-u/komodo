"use server";
// Master
import { revalidatePath, unstable_noStore } from "next/cache";
import abi from "@/artifacts/contracts/Election.sol/Election.json";
import { redirect } from "next/navigation";
import Web3, { ContractExecutionError } from "web3";
import { deployedAddress } from "./utils";

async function getContract() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:7545")
  );
  const contract: any = new web3.eth.Contract(abi.abi, deployedAddress);
  const providersAccounts: string[] = await web3.eth.getAccounts();
  const account: string = providersAccounts[0];
  const result: { myContract: any; defaultAccount: string } = {
    myContract: contract,
    defaultAccount: account,
  };
  return result;
}

export async function navigateBallot(id: string) {
  redirect(`/ballot/${id}`);
}

export async function validateVoter(formData: FormData, account: string) {
  const { name, idCard } = {
    name: formData.get("name"),
    idCard: formData.get("idCard"),
  };
  const { myContract, defaultAccount } = await getContract();

  try {
    const receipt: any = await myContract.methods.addVoter(name, idCard).send({
      from: account,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    // console.log(myContract.events.VoterRegistered);
    // console.log("Transaction Hash: " + receipt.transactionHash);
    return receipt.events.VoterRegistered.returnValues;
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    // error.innerError.message 
    return { error: "error"};
  }
}

export async function voteCandidate(formData: FormData, account: string) {
  const { index, uuid } = {
    index: Number(formData.get("card-option")),
    uuid: formData.get("uuid"),
  };
  const { myContract, defaultAccount } = await getContract();

  try {
    const receipt: any = await myContract.methods.vote(index, uuid).send({
      from: account,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    console.log(myContract.events.VoterRegistered);
    console.log("Transaction Hash: " + receipt.transactionHash);
    // return receipt.events.Voted.returnValues;
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
  redirect("/thanks");
}

export async function addCandidate(formData: FormData) {
  const { name, image } = {
    name: formData.get("name"),
    image: formData.get("image"),
  };
  const { myContract, defaultAccount } = await getContract();
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
    console.log("Berhasil Menambahkan Kandidat");
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
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
  const { myContract, defaultAccount } = await getContract();

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
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
  revalidatePath("/dashboard/settings/");
  redirect("/dashboard/settings/");
}

export async function addAdmin(formData: FormData) {
  const { address } = {
    address: formData.get("address"),
  };

  const { myContract, defaultAccount } = await getContract();

  try {
    const receipt: any = await myContract.methods.addAdmin(address).send({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    // console.log(myContract.events.VoterRegistered);
    console.log("Transaction Hash: " + receipt.transactionHash);
    console.log(receipt);
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
  revalidatePath("/dashboard/settings/");
  redirect("/dashboard/settings");
}

export async function updateVoter(formData: FormData) {
  const { id, newName } = {
    id: formData.get("id"),
    newName: formData.get("name"),
  };
  const { myContract, defaultAccount } = await getContract();
  try {
    const receipt: any = await myContract.methods
      .updateVoter(id, newName)
      .send({
        from: defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      });
    console.log("Transaction Hash: " + receipt.transactionHash);
    console.log(receipt);
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
  revalidatePath("/dashboard/voter");
  redirect("/dashboard/voter");
}

export async function updateStation(formData: FormData) {
  const { station } = {
    station: formData.get("station"),
  };
  const { myContract, defaultAccount } = await getContract();

  try {
    const receipt: any = await myContract.methods.updateStation(station).send({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    console.log("Transaction Hash: " + receipt.transactionHash);
    console.log(receipt);
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
  revalidatePath("/dashboard/settings/");
  redirect("/dashboard/settings");
}

export async function toggleActive() {
  // Set up a connection to the Ethereum network
  unstable_noStore();
  const { myContract, defaultAccount } = await getContract();
  try {
    const receipt: any = await myContract.methods.updateVoteActive().send({
      from: defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
    console.log(myContract.events.VoterRegistered);
    console.log("Transaction Hash: " + receipt.transactionHash);
    console.log(receipt);
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      console.log(error.innerError.message);
      return { error: error.innerError.message };
    }
    console.log(error);
    return { error: "Ops Ada kesalahan" };
  }
  revalidatePath("/");
}

export type ErorrVoter = {
  error: string;
};
