"use client";
import { FormEvent, useContext, useEffect, useState } from "react";
import Web3, { ContractExecutionError } from "web3";
import abi from "@/artifacts/contracts/Election.sol/Election.json";

import { deployedAddress } from "@/app/lib/utils";
import { useRouter } from "next/navigation";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div className="">
        <div className="animate-bounce inline-block w-20 h-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
            />
          </svg>
        </div>
        <p className="text-2xl font-semibold">Mengirim Permintaan</p>

        <p className="mt-2 text-lg text-gray-500">
          Datamu sedang kami kirim, mohong tunggu sebentar.
        </p>
      </div>
    </div>
  );
}

export default function Validate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Metamask
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Contract
    const formData = new FormData(e.currentTarget);
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:7545")
    );
    const contract: any = new web3.eth.Contract(abi.abi, deployedAddress);
    try {
      const isAlreadyRegister: any = await contract.methods
        .chainVoterId(formData.get("idCard"))
        .call({
          from: walletAddress,
          gas: 1000000,
          gasPrice: "10000000000",
        });

      if (isAlreadyRegister) {
        alert("Anda sudah terdaftar sebelumnya");
      } else {
        const addChainVoter: any = await contract.methods
          .addChainVoter(formData.get("idCard"))
          .send({
            from: walletAddress,
            gas: 1000000,
            gasPrice: "10000000000",
          });
        const response = addChainVoter.events.addChainVoterEvent.returnValues;
        if (response.status) {
          router.push("/");
        }
      }
    } catch (error) {
      if (error instanceof ContractExecutionError) {
        console.log(error.innerError.message);
      }
      console.log(error);
    }

    // End Contract
  };

  return (
    <>
      {!loading ? (
        <div className="h-screen md:flex justify-center">
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
            <form className="w-3/4" onSubmit={handleSubmit}>
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Halo, Selamat Datang
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-7">
                Silahkan masukan data diri anda dengan benar.
              </p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none w-full "
                  type="text"
                  name="name"
                  id=""
                  placeholder="Nama Lengkap"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
                <input
                  className="pl-2  border-none w-full "
                  type="text"
                  name="idCard"
                  id=""
                  placeholder="Nomor Induk Kependudukan"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name="motherName"
                  id=""
                  placeholder="Nama Ibu Kandung"
                />
              </div>

              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      ;
    </>
  );
}
