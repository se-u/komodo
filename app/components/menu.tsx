"use client";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useContext, useEffect } from "react";
import useSWR from "swr";
import { AuthContext } from "../auth-context";
import Web3 from "web3";
import { useTheme } from "next-themes";
import Link from "next/link";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((r) => r.json());
export function Menu() {
  const { data, error } = useSWR("/api/status", fetcher, {
    refreshInterval: 1000,
  });
  const voteActive = data;

  const { theme, setTheme } = useTheme();
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
  }, []);
  return (
    //   {voteActive ? "Terhubung" : "Tidak Terhubung"}
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4 ">
      <MenubarMenu>
        <MenubarTrigger className="font-bold">Gerbang Suara</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About Gerbang Suara</MenubarItem>
          <MenubarSeparator />
          {/* <MenubarItem>
            Preferences... <MenubarShortcut>⌘,</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Hide Music... <MenubarShortcut>⌘H</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Hide Others... <MenubarShortcut>⇧⌘H</MenubarShortcut>
          </MenubarItem> */}
          <MenubarShortcut />
          <MenubarItem>
            <Link href={"/"}> Go To Home </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* <MenubarMenu>
        <MenubarTrigger className="relative">File</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>New</MenubarSubTrigger>
            <MenubarSubContent className="w-[230px]">
              <MenubarItem>
                Playlist <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                Playlist from Selection <MenubarShortcut>⇧⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Smart Playlist... <MenubarShortcut>⌥⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Playlist Folder</MenubarItem>
              <MenubarItem disabled>Genius Playlist</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>
            Open Stream URL... <MenubarShortcut>⌘U</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Close Window <MenubarShortcut>⌘W</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Library</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Update Cloud Library</MenubarItem>
              <MenubarItem>Update Genius</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Organize Library...</MenubarItem>
              <MenubarItem>Export Library...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Import Playlist...</MenubarItem>
              <MenubarItem disabled>Export Playlist...</MenubarItem>
              <MenubarItem>Show Duplicate Items</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Get Album Artwork</MenubarItem>
              <MenubarItem disabled>Get Track Names</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>
            Import... <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>Burn Playlist to Disc...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Show in Finder <MenubarShortcut>⇧⌘R</MenubarShortcut>{" "}
          </MenubarItem>
          <MenubarItem>Convert</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Page Setup...</MenubarItem>
          <MenubarItem disabled>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu> */}
      {/* <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>
            Cut <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Copy <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Paste <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Select All <MenubarShortcut>⌘A</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Deselect All <MenubarShortcut>⇧⌘A</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Smart Dictation...{" "}
            <MenubarShortcut>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4"
                viewBox="0 0 24 24"
              >
                <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                <circle cx="17" cy="7" r="5" />
              </svg>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Emoji & Symbols{" "}
            <MenubarShortcut>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>  */}
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          {theme === "light" ? (
            <MenubarCheckboxItem checked onClick={() => setTheme("light")}>
              Light Mode
            </MenubarCheckboxItem>
          ) : (
            <MenubarCheckboxItem onClick={() => setTheme("light")}>
              Light Mode
            </MenubarCheckboxItem>
          )}

          {theme === "dark" ? (
            <MenubarCheckboxItem checked onClick={() => setTheme("dark")}>
              Dark Mode
            </MenubarCheckboxItem>
          ) : (
            <MenubarCheckboxItem onClick={() => setTheme("dark")}>
              Dark Mode
            </MenubarCheckboxItem>
          )}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="block">Account</MenubarTrigger>
        <MenubarContent forceMount>
          <MenubarLabel inset>Detail Account</MenubarLabel>
          <MenubarSeparator />
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="benoit">
              {auth !== null ? auth : "Belum Terkoneksi"}
            </MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          {auth !== null ? (
            <>
              <MenubarItem onClick={() => setAuth(null)} inset>
                Disconnect
              </MenubarItem>
            </>
          ) : (
            <MenubarItem onClick={handleConnect} inset>
              Connect
            </MenubarItem>
          )}
        </MenubarContent>
      </MenubarMenu>

      <div style={{ marginLeft: "auto" }}>
        {voteActive ? (
          <a className="flex items-center text-sm">
            <span className="relative mx-2 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
            Aktif{" "}
          </a>
        ) : (
          <a className="flex items-center text-sm">
            <span className="relative mx-2 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </span>
            Tidak Aktif
          </a>
        )}
      </div>
    </Menubar>
  );
}
