// pages/index.js
// "use client";
// import { useCallback, useEffect, useState } from "react";
// import { connectToMetaMask } from "../lib/data";
// import { ConnectSkeleton } from "./skeleton";
import GuideCard from "./home/guide-card";
// import { Button } from "./button";
import Link from "next/link";

export default async function ConnectButton() {
  // const [proxy, setProxy] = useState(false);
  // useEffect(() => {
  //   const handleConnect = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     // const connect = await connectToMetaMask();
  //     setProxy(true);
  //   };

  //   handleConnect();
  // });

  // if (!proxy) {
  //   return <ConnectSkeleton />;
  // }

  return (
    <>
      <GuideCard />
      <div className="w-40 h-20 mx-auto p-5">
        <Link href="/check">
          <button className="btn glass ">Validasi Data</button>
        </Link>
      </div>
    </>
  );
}
