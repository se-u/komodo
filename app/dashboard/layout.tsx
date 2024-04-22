"use client";
import { useContext, useEffect, useState } from "react";
import SideNav from "../ui/dashboard/sidenav";
import { fetchAdmins } from "../lib/data";
import AccessDenied from "../ui/access-denied";
import { AuthContext } from "../auth-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [account, _] = useContext(AuthContext);

  useEffect(() => {
    fetchAdmins().then((data: string[]) => {
      console.log(`Admin: ${data}`);
      if (data.includes(account || "")) {
        console.log("disini");
        setAuthorized(true);
      }
    });
  }, [account]);
  return (
    <>
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
