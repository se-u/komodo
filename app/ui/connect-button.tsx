// pages/index.js
"use client";
import { useCallback, useEffect, useState } from "react";
import { connectToMetaMask } from "../lib/data";
//
import { ConnectSkeleton } from "./skeleton";
import Hint from "./home/hint";

export async function ConnectButton() {
  const [proxy, setProxy] = useState(false);
  useEffect(() => {
    const handleConnect = async () => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const connect = await connectToMetaMask();
      setProxy(true);
    };

    handleConnect();
  });

  if (!proxy) {
    return <ConnectSkeleton />;
  }

  return <Hint />;
}
