import Image from "next/image";
import { Inter } from "next/font/google";
import { Header } from "./ui/header";
import { useCallback } from "react";
import { ConnectButton } from "./ui/connectButton";
import { ethers } from "ethers";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  return <ConnectButton />;
}
