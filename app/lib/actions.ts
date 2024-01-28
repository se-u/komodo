"use server"; 
import { revalidatePath, unstable_noStore } from "next/cache";
import abi from "@/artifacts/contracts/Election.sol/Election.json";
import { redirect } from "next/navigation";
import Web3, { ContractExecutionError } from "web3";
import { deployedAddress } from "./utils";

// console.log(myContract.events.VoterRegistered);
// console.log("Transaction Hash: " + receipt.transactionHash);

// Get Contract
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

const GAS_LIMIT = 1000000;
const GAS_PRICE = "10000000000";

function revalidateAndRedirect(path: string) {
  revalidatePath(path);
  redirect(path);
}


// Navigate to Ballot
export async function navigateBallot(id: string) {
  redirect(`/ballot/${id}`);
}

function handleContractError(error: ContractExecutionError) {
  console.log(error.innerError.message);
  return { error: error.innerError.message };
}

function handleGenericError(error: any) {
  console.log(error);
  return { error: "Ops Ada kesalahan" };
}

//Voter: validate
export async function validateVoter(formData: FormData, account: string) {
  const { name, idCard } = {
    name: formData.get("name"),
    idCard: formData.get("idCard"),
  };
  const { myContract, defaultAccount } = await getContract();

  try {
    const receipt: any = await myContract.methods.addVoter(name, idCard).send({
      from: account,
      gas: GAS_LIMIT,
      gasPrice: GAS_PRICE,
    });
    return receipt.events.VoterRegistered.returnValues;
  } catch (error) {
    if (error instanceof ContractExecutionError) {
        handleContractError(error);
    }
  }
}

// Voter: update
export async function updateVoter(formData: FormData) {
  const { myContract, defaultAccount } = await getContract();
  const id = formData.get("id");
  const newName = formData.get("name");

  try {
    const receipt: any = await myContract.methods
      .updateVoter(id, newName)
      .send({
        from: defaultAccount,
        gas: GAS_LIMIT,
        gasPrice: GAS_PRICE,
      });
 
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      handleContractError(error)
    }
    handleGenericError(error)
  }
  revalidateAndRedirect("/dashboard/voter");
}

// Voter: voting
export async function voteCandidate(formData: FormData, account: string) {
  const { index, uuid } = {
    index: Number(formData.get("card-option")),
    uuid: formData.get("uuid"),
  };
  const { myContract, defaultAccount } = await getContract();
  try {
    const receipt: any = await myContract.methods.vote(index, uuid).send({
      from: account,
      gas: GAS_LIMIT,
      gasPrice: GAS_PRICE,
    });
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      handleContractError(error)
    } handleGenericError(error)
  }
  redirect("/thanks");
}

// Candidate: add
export async function addCandidate(formData: FormData) {
  const { myContract, defaultAccount } = await getContract();
  const name = formData.get("name")
  const image = formData.get("image")
  try {
    const receipt: any = await myContract.methods
      .addCandidate(name, image)
      .send({
        from: defaultAccount,
        gas: GAS_LIMIT,
        gasPrice: GAS_PRICE,
      });
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      handleContractError(error)
    }
    handleGenericError(error)
  }
  revalidateAndRedirect("/dashboard/settings/")
}

// Candidate: update
export async function updateCandidate(formData: FormData) {
  const { myContract, defaultAccount } = await getContract();
  const index = Number(formData.get("index"));
  const name = formData.get("name");
  const image = formData.get("image");
  
  try {
    const receipt: any = await myContract.methods
      .updateCandidate(index, name, image)
      .send({
        from: defaultAccount,
        gas: GAS_LIMIT,
        gasPrice: GAS_PRICE,
      });
  } catch (error) {
    if (error instanceof ContractExecutionError) {
        handleContractError(error);
    }
    handleGenericError(error)
  }
  revalidateAndRedirect("/dashboard/settings/")
}

// Admin
export async function addAdmin(formData: FormData) {
  const { myContract, defaultAccount } = await getContract();
  const address = formData.get("address")
  try {
    const receipt: any = await myContract.methods.addAdmin(address).send({
      from: defaultAccount,
      gas: GAS_LIMIT,
      gasPrice: GAS_PRICE,
    });
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      handleContractError(error)
    }
    handleGenericError(error)
  }
  revalidateAndRedirect("/dashboard/settings/")
}

export async function updateStation(formData: FormData) {
  const { myContract, defaultAccount } = await getContract();
  const station = formData.get("station");

  try {
    const receipt: any = await myContract.methods.updateStation(station).send({
      from: defaultAccount,
      gas: GAS_LIMIT,
      gasPrice: GAS_PRICE,
    });
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
      gas: GAS_LIMIT,
      gasPrice: GAS_PRICE,
    });
  } catch (error) {
    if (error instanceof ContractExecutionError) {
      handleContractError(error)
    }
    handleGenericError(error)
  }
  revalidatePath("/");
}
