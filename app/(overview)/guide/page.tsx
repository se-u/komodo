import Link from "next/link";
import ConnectButton from "../../ui/connect-button";
// import { ConnectButton } from "../ui/connect-button";
export default async function Guide() {
  // return <ConnectButton />;
  return (
    <div className={`hero min-h-screen `}>
      <span
        className={`bg-gradient-to-b from-gray-900 to-gray-600 bg-image  top-0 left-0 w-full h-full`}
      ></span>
      <div className="absolute inset-0 bg-cover bg-center blur-sm"></div>
      <div className="container mx-auto z-10">
        <ConnectButton />
      </div>
    </div>
  );
}
