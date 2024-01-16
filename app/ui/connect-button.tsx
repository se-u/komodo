// pages/index.js
"use client";
import { useCallback, useEffect, useState } from "react";
import { connectToMetaMask } from "../lib/data";
import Link from "next/link";
import { Suspense } from "react";
import loading from "../guide/loading";
import { ConnectSkeleton } from "./skeleton";
import  Hint from "./home/hint";

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

  return (
    <Hint />
  );
}
