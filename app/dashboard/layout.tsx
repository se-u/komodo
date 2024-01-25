"use client";
import { useContext, useEffect, useState } from "react";
import SideNav from "../ui/dashboard/sidenav";
import { fetchAdmins } from "../lib/data";
import AccessDenied from "../ui/access-denied";
import { AuthContext } from "../auth-context";
import StatusBar from "../components/status-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [account, _] = useContext(AuthContext);

  console.log(account);

  useEffect(() => {
    fetchAdmins().then((data: string[]) => {
      if (data.includes(account ?? "")) {
        setAuthorized(true);
      }
    });
    console.log(account);
  }, [account]);
  return (
    <>
      <StatusBar />
      {authorized === true ? (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
}
