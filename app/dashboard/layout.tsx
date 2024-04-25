"use client";

import SideNav from "../ui/dashboard/sidenav";
// import { fetchAdmins } from "../lib/data";
import AccessDenied from "../ui/access-denied";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {true ? (
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
