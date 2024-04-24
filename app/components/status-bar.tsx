"use client";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { SignalIcon } from "@heroicons/react/16/solid";
import { fetchIsVoteActive } from "../lib/data";
import Web3 from "web3";
import { AuthContext } from "../auth-context";
import useSWR from "swr";

import Link from "next/link";
import Image from "next/image";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Favicon from "@/app/favicon.ico";

function NavAccount() {
  const [active, setVoterStatus] = useState(false);

  // const handleToggleConnection = () => {
  //   setConnected(!connected);
  // };

  const handleToggleVoterStatus = () => {
    setVoterStatus(active);
  };

  // -----
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
  // ----
  return (
    <div>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt="User"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-xs">Status Akun</span>
          <div>
            <span className="block text-sm font-bold">
              {voteActive ? "Sudah Terkoneksi" : "Belum Terkoneksi"}
            </span>
          </div>
        </Dropdown.Header>
        {/* Tambahkan item ini hanya jika terkoneksi */}
        {auth && (
          <>
            <Dropdown.Item>{auth}</Dropdown.Item>
            <Dropdown.Item className="grid border border-neutral-900">
              {" "}
              <span className="block text-xs text-left">Status Pilih</span>
              <div>
                <span
                  className={`block text-sm text-left font-bold ${
                    active ? "text-lime-700" : "text-red-700"
                  }`}
                >
                  {active ? "Aktif" : "NonAktif"}
                </span>
              </div>
            </Dropdown.Item>
          </>
        )}
        <Dropdown.Item
          onClick={handleConnect}
          className={`text-sm ${auth ? "text-red-700" : "text-lime-700"}`}
        >
          {auth ? "Putuskan Koneksi" : "Sambungkan"}
        </Dropdown.Item>
        <Dropdown.Item>Switch Theme</Dropdown.Item>
      </Dropdown>
    </div>
  );
}
export default function NavBar() {
  return (
    <Navbar fluid rounded>
      {/* Ini adalah bagian Favicon */}
      <Navbar.Brand as={Link} href="/">
        <Image src={Favicon} className="mr-3 h-9 w-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Gerbang Suara
        </span>
      </Navbar.Brand>
      {/* Ini bagian Avatar (Account) */}
      <div className="flex md:order-2">
        <NavAccount />
        <Navbar.Toggle />
      </div>

      {/* Menu pada Navbar */}
      <Navbar.Collapse>
        <Navbar.Link href="/about">Tentang</Navbar.Link>
        <Navbar.Link href="/guidline">Panduan</Navbar.Link>
        <Navbar.Link href="/statistic">Statistik</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((r) => r.json());

// export function StatusBar() {
//   const { data, error } = useSWR("/api/status", fetcher, {
//     refreshInterval: 1000,
//   });
//   const voteActive = data;
//   const [auth, setAuth] = useContext(AuthContext);
//   console.log(auth);
//   const handleConnect = async () => {
//     if (window) {
//       const web3 = new Web3(window.ethereum);
//       await window.ethereum.request({ method: "eth_requestAccounts" });
//       const accounts = await web3.eth.getAccounts();
//       setAuth(accounts[0]);
//     }
//   };

//   useEffect(() => {
//     handleConnect();
//     window.ethereum.on("accountsChanged", handleConnect);
//     return () => {
//       window.ethereum.off("accountsChanged", handleConnect);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [auth]);

//   return (
//     <div className="fixed top-0 left-0 bg-white z-50">
//       <p className="text-red-500">!JUST DEV TOOLS!</p>
//       {auth !== null ? (
//         <>
//           <p>{auth}</p>
//           <button onClick={() => setAuth(null)} className="bg-purple-300">
//             Sign Out
//           </button>
//         </>
//       ) : (
//         <button onClick={handleConnect} className="bg-purple-300">
//           Sign In
//         </button>
//       )}

//       {voteActive ? "Terhubung" : "Tidak Terhubung"}
//     </div>
//   );
// }
