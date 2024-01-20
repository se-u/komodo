"use client";
import { useEffect, useState } from "react";
import { SignalIcon } from "@heroicons/react/16/solid";
import { fetchIsVoteActive } from "../lib/data";
import Web3 from "web3";

export default function NotificationTop() {
  const [voteActive, setVoteActive] = useState(false);
  //state to store and show the connected account
  const [connectedAccount, setConnectedAccount] = useState("null");

  async function connectMetamask() {
    //check metamask is installed
    if (window.ethereum) {
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();

      //show the first connected account in the react page
      setConnectedAccount(accounts[0]);
      localStorage.setItem("connectedAccount", accounts[0]);
      // alert(`connect : ${accounts[0]}`);
    } else {
      alert("Please download metamask");
    }
  }

  const checkVoteStatus = async () => {
    try {
      const isActive = await fetchIsVoteActive(connectedAccount);
      setVoteActive(isActive);
    } catch (error) {
      console.log("error");
    }
  };
  console.log(connectedAccount);

  useEffect(() => {
    try {
      if (connectedAccount === "null") {
        connectMetamask();
      }

      // Initial check when component mounts
      checkVoteStatus();

      const handleAccountsChanged = function () {
        connectMetamask();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Set up an interval to check the status every, for example, 10 seconds
      const intervalId = setInterval(checkVoteStatus, 5000);

      // Clean up the interval and event listener when the component unmounts
      return () => {
        clearInterval(intervalId);
        window.ethereum.off("accountsChanged", handleAccountsChanged);
      };
    } catch (error) {
      console.log("error");
    }
  }, [connectedAccount]); // The empty dependency array ensures that this effect runs only once on mount

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 p-4 text-white">
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
        <li onClick={() => connectMetamask()}>
          {connectedAccount !== "null" ? (
            <a>
              <span className="relative flex h-5 w-5">
                <SignalIcon className="animate-ping absolute inline-flex h-full w-full rounded-full text-sky-400 opacity-75"></SignalIcon>
                <SignalIcon className=" relative inline-flex rounded-full h-5 w-5 text-sky-500"></SignalIcon>
              </span>
              Terhubung Ke Sistem
            </a>
          ) : (
            <a>
              <span className="relative flex h-5 w-5">
                <SignalIcon className="animate-ping absolute inline-flex h-full w-full rounded-full text-yellow-400 opacity-75"></SignalIcon>
                <SignalIcon className=" relative inline-flex rounded-full h-5 w-5 text-yellow-500"></SignalIcon>
              </span>
              Menghubungkan ke sistem ...
            </a>
          )}
        </li>
        <li>
          {voteActive ? (
            <a>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Pemilihan Berlansung
            </a>
          ) : (
            <a>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Pemilihan Berakhir
            </a>
          )}
        </li>
      </ul>{" "}
    </div>
  );
}
