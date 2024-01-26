"use client";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { SignalIcon } from "@heroicons/react/16/solid";
import { fetchIsVoteActive } from "../lib/data";
import Web3 from "web3";
import { AuthContext } from "../auth-context";
import useSWR from "swr";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((r) => r.json());
export default function StatusBar() {
  const { data, error } = useSWR("/api/status", fetcher, {
    refreshInterval: 1000,
  });
  const voteActive = data;
  const [auth, setAuth] = useContext(AuthContext);
  useEffect(() => {
    try {
      const handleAccountsChanged = async function () {
        const web3 = new Web3(window.ethereum);
        // await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAuth(accounts[0]);
      };

      if (auth === null) {
        const callMetamask = async () => {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
          setAuth(accounts[0]);

          // const isVoteActive = await fetchIsVoteActive("");
          // console.log(isVoteActive);
        };
        callMetamask();
      }
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.off("accountsChanged", handleAccountsChanged);
      };
    } catch (error) {
      console.log("error");
    }
  }, [auth, setAuth]);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 p-4 text-white">
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
        <li>
          {auth !== null ? (
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
