"use client";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectToMetaMask } from "./data";
import { redirect } from "next/navigation";
const FormSchema = z.object({
  name: z.string(),
  idCard: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than 0." }),
});

const CreateAccount = FormSchema.omit({});

export type State = {
  errors?: {
    name?: string[];
    idCard?: string[];
  };
  message?: string | null;
};

export async function createAccount(formData: FormData) {
  const { name, idCard } = {
    name: formData.get("name"),
    idCard: formData.get("idCard"),
  };

  console.log("Call it");

  const contract = await connectToMetaMask();
  console.log(contract);
  if (contract) {
    try {
      console.log("disini");
      const tx = await contract.registerVoter(name, idCard);
      const receipt = await tx.wait();
      console.log(`receipt: ${receipt}`);
    } catch (error) {
      console.log(`failed to register`);
    }
  }

  // revalidatePath("/dasboard/invoice");
  redirect("/validate/status");
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
  console.log(voterAddress);
  console.log("terpanggil");
  // revalidatePath("/dasboard/voter");
  // redirect("/validate/status");
}
