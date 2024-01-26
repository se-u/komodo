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
  );
}
