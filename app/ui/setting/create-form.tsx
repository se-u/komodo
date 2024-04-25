"use client";
import { Button } from "../button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon, UserIcon } from "@heroicons/react/16/solid";
import Web3, { ContractExecutionError } from "web3";
import abi from "@/artifacts/contracts/Election.sol/Election.json";
import { deployedAddress } from "../../lib/utils";
import { useEffect, useState } from "react";

export async function addCandidate(formData: FormData) {
  const { name, image, walletAddress } = {
    name: formData.get("name"),
    image: formData.get("image"),
    walletAddress: formData.get("address"),
  };

  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:7545")
  );
  const myContract: any = new web3.eth.Contract(abi.abi, deployedAddress);
  const receipt: any = await myContract.methods.addCandidate(name, image).send({
    from: walletAddress,
    gas: 1000000,
    gasPrice: "10000000000",
  });
  console.log(myContract.events.VoterRegistered);
  console.log("Transaction Hash: " + receipt.transactionHash);
  console.log("Berhasil Menambahkan Kandidat");
}

export default function FormCandidates() {
  // Metamask
  const [walletAddress, setWalletAddress] = useState("");
  const [verified, setVerified] = useState(false);

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts: any[]) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };
  // End Metamask

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, []);

  return (
    <form action={addCandidate}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nomor  */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Nomor
          </label>
          <div className="relative mt-2 rounded-md">
            <input hidden name="address" value={walletAddress} />
            <div className="relative">
              <input
                id="nomor"
                name="nomor"
                type="number"
                placeholder="Masukan Nomor Candidate"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Gamabar */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Foto Candidate
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image"
                name="image"
                type="url"
                placeholder="Masukan URL Foto Candidate"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Nama  */}
        <div className="mb-4">
          <label htmlFor="idCard" className="mb-2 block text-sm font-medium">
            Nama
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Masukan Nama Candidate"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Save </Button>
      </div>
    </form>
  );
}
