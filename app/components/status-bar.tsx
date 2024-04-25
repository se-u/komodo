"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Favicon from "@/app/favicon.ico";

function NavAccount() {
  const [active, setVoterStatus] = useState(false);

  const handleToggleVoterStatus = () => {
    setVoterStatus(active);
  };

  // Metamask
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts: any[]) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  // End Metamask

  // -----
  // const { data, error } = useSWR("/api/status", fetcher, {
  //   refreshInterval: 1000,
  // });
  // const voteActive = data;
  // const [auth, setAuth] = useContext(AuthContext);
  // console.log(auth);
  // const handleConnect = async () => {
  //   if (window) {
  //     const web3 = new Web3(window.ethereum);
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //     const accounts = await web3.eth.getAccounts();
  //     // setAuth(accounts[0]);
  //   }
  // };

  // useEffect(() => {
  //   handleConnect();
  //   window.ethereum.on("accountsChanged", handleConnect);
  //   return () => {
  //     window.ethereum.off("accountsChanged", handleConnect);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth]);
  // ----
  return (
    <div>
      {walletAddress && walletAddress.length > 0 ? (
        <>
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
              <span className="block text-xs">Akun</span>
              <div>
                <span className="block text-sm font-bold">
                  {`${walletAddress.substring(
                    0,
                    6
                  )}...${walletAddress.substring(38)}`}
                </span>
              </div>
            </Dropdown.Header>
            {/* Tambahkan item ini hanya jika terkoneksi */}
            {/* {auth && (
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
            )} */}

            {/* <Dropdown.Item
              onClick={connectWallet}
              className={`text-sm ${auth ? "text-red-700" : "text-lime-700"}`}
            >
              {auth ? "Putuskan Koneksi" : "Sambungkan"}
            </Dropdown.Item> */}
            {/* <Dropdown.Item>Switch Theme</Dropdown.Item> */}
          </Dropdown>
        </>
      ) : (
        <button
          onClick={connectWallet}
          type="button"
          className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          <svg
            className="w-5 h-5 me-2 -ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"
            />
          </svg>
          Connect Wallet
        </button>
      )}
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
