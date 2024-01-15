// pages/index.js
"use client";
import { useCallback } from "react";
import { connectToMetaMask } from "../lib/data";

export function ConnectButton() {
  const _connectToMetaMask = useCallback(async () => {
    await connectToMetaMask();
  }, []);

  return <button onClick={_connectToMetaMask}>Connect to MetaMask</button>;
}
