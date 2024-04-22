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

export function Menu() {
  const voteActive = true;

  const { theme, setTheme } = useTheme();
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4 ">
      <MenubarMenu>
        <MenubarTrigger className="font-bold">Gerbang Suara</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About Gerbang Suara</MenubarItem>
          <MenubarSeparator />
          <MenubarShortcut />
          <MenubarItem>
            <Link href={"/"}> Go To Home </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
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
            <MenubarItem onClick={() => alert("udah hilang connectnya")} inset>
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
