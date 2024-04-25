"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Web3, { ContractExecutionError } from "web3";
import abi from "@/artifacts/contracts/Election.sol/Election.json";

import { deployedAddress } from "@/app/lib/utils";

function iconVerified() {
  return (
    <>
      {true ? (
        <svg
          className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      ) : (
        <svg
          className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      )}
    </>
  );
}

export default function Home() {
  // Metamask
  const [walletAddress, setWalletAddress] = useState("");
  const [verified, setVerified] = useState(false);
  const [canVote, setCanVote] = useState(false);
  const [history, setHistory] = useState({});
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
    const data = async () => {
      try {
        // Contract
        const web3 = new Web3(
          new Web3.providers.HttpProvider("http://localhost:7545")
        );
        const myContract: any = new web3.eth.Contract(abi.abi, deployedAddress);
        const verified: any = await myContract.methods
          .chainVoter(walletAddress)
          .call({
            from: walletAddress,
            gas: 1000000,
            gasPrice: "10000000000",
          });

        const canVote: any = await myContract.methods
          .canVote(walletAddress)
          .call({
            from: walletAddress,
            gas: 1000000,
            gasPrice: "10000000000",
          });

        const detailVote: any = await myContract.methods
          .detailVote(walletAddress)
          .call({
            from: walletAddress,
            gas: 1000000,
            gasPrice: "10000000000",
          });

        console.log([verified, detailVote, canVote]);
        setVerified(verified);
        setCanVote(canVote);
        setHistory(detailVote);
      } catch (error) {
        if (error instanceof ContractExecutionError) {
          alert(error.innerError.message);
          return { error: error.innerError.message };
        }
        console.log(error);
        return { error: "Ops Ada kesalahan" };
      }
    };

    data();
  }, [walletAddress]);

  return (
    <>
      <div className="bg-inherit">
        <div className="relative px-8 mt-12">
          <div className="flex flex-col items-center  md:flex-row">
            <div className=" flex-col">
              <div className="max-w-2xl">
                <div className="text-left">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-50">
                    Klik, Pilih, Aman. Demokrasi Tanpa Keraguan 👋
                  </h1>
                  <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-200 ">
                    Tenang Kita Simpan Datamu Di Tempat Yang Aman <br />
                    Digital Election 1.0
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-col">
              <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                  Digital Election Identity
                </h5>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {walletAddress}
                </p>

                <ul role="list" className="space-y-5 my-7">
                  <li className="flex items-center">
                    {verified ? (
                      <svg
                        className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                    ) : (
                      <svg
                        className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                    )}{" "}
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Verified Voter
                    </span>
                  </li>
                  <li className="flex line-through decoration-gray-500">
                    {canVote ? (
                      <svg
                        className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                    ) : (
                      <svg
                        className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                    )}{" "}
                    <span className="text-base font-normal leading-tight text-gray-500 ms-3">
                      Eligible to vote
                    </span>
                  </li>
                </ul>
                <ul className="my-4 space-y-3">
                  <li>
                    <Link
                      href={"/check"}
                      className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <svg
                        className="h-4 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM7.99 9a1 1 0 0 1 1-1H9a1 1 0 0 1 0 2h-.01a1 1 0 0 1-1-1ZM14 9a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H15a1 1 0 0 1-1-1Zm-5.506 7.216A5.5 5.5 0 0 1 6.6 13h10.81a5.5 5.5 0 0 1-8.916 3.216Z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Get Election ID
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={"/ballot"}
                      className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <svg
                        className="h-4 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"
                        />
                      </svg>

                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Go To Vote
                      </span>
                    </Link>
                  </li>

                  <li onClick={() => alert(history.timestamp)}>
                    <a
                      href="#"
                      className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                      {/* Icon h-4 */}
                      <svg
                        className=" h-4 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M18 9V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h6M9 3v4a1 1 0 0 1-1 1H4m11 13a11.426 11.426 0 0 1-3.637-3.99A11.139 11.139 0 0 1 10 11.833L15 10l5 1.833a11.137 11.137 0 0 1-1.363 5.176A11.425 11.425 0 0 1 15.001 21Z"
                        />
                      </svg>

                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Show history vote
                      </span>
                    </a>
                  </li>
                </ul>
                {/* <div>
                  <a
                    href="#"
                    className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                  >
                    <svg
                      className="w-3 h-3 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Why do I need to connect with my wallet?
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
