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
  console.log(auth);
  const handleConnect = async () => {
    if (window) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setAuth(accounts[0]);
    }
  };

  useEffect(() => {
    handleConnect();
    window.ethereum.on("accountsChanged", handleConnect);
    return () => {
      window.ethereum.off("accountsChanged", handleConnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
<<<<<<< HEAD
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 p-4 text-white rounded-full shadow-lg">
        <ul className="flex space-x-4 bg-base-200 lg:menu-horizontal rounded-box">
          <li className="flex items-center">
            {auth !== null ? (
                <a className="flex items-center">
          <span className="relative flex h-5 w-5">
            <SignalIcon
                className="animate-ping absolute inline-flex h-full w-full rounded-full text-sky-400 opacity-75"></SignalIcon>
            <SignalIcon className="relative inline-flex rounded-full h-5 w-5 text-sky-500"></SignalIcon>
          </span>
                  <span className="ml-2 font-bold text-blue-500">Terhubung Ke Sistem</span>
                </a>
            ) : (
                <a className="flex items-center">
          <span className="relative flex h-5 w-5">
            <SignalIcon
                className="animate-ping absolute inline-flex h-full w-full rounded-full text-yellow-400 opacity-75"></SignalIcon>
            <SignalIcon className="relative inline-flex rounded-full h-5 w-5 text-yellow-500"></SignalIcon>
          </span>
                  <span className="ml-2 font-bold text-blue-500">Menghubungkan ke sistem ...</span>
                </a>
            )}
          </li>
          <li className="flex items-center">
            {voteActive ? (
                <a className="flex items-center">
          <span className="relative flex h-3 w-3">
            <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
                  <span className="ml-2 font-bold text-green-500">Pemilihan Berlansung</span>
                </a>
            ) : (
                <a className="flex items-center">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
                  <span className="ml-2 font-bold text-red-500">Pemilihan Berakhir</span>
                </a>
            )}
          </li>
        </ul>
      </div>

=======
    <div className="fixed top-0 left-0 bg-white z-50">
      <p className="text-red-500">!JUST DEV TOOLS!</p>
      {auth !== null ? (
        <>
          <p>{auth}</p>
          <button onClick={() => setAuth(null)} className="bg-purple-300">
            Sign Out
          </button>
        </>
      ) : (
        <button onClick={handleConnect} className="bg-purple-300">
          Sign In
        </button>
      )}

      {voteActive ? "Terhubung" : "Tidak Terhubung"}
    </div>
>>>>>>> 26bfa669244240e50331d915ff4ce68c4abd0c62
  );
}
