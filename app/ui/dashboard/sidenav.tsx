import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import Image from "next/image";
import { lusitana } from "../fonts";
// import AcmeLogo from '@/app/ui/acme-logo';
// import { PowerIcon } from '@heroicons/react/24/outline';
// import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-orange-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <div
            className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
          >
            <div className="w-32 text-white md:w-40">
              <div
                className={`flex flex-row items-center leading-none text-white`}
              >
                <Image
                  width={200}
                  height={200}
                  className="h-12 w-12"
                  src="/logologin.png"
                  alt="logo"
                />{" "}
                <p className="text-[22px] mx-2">Gerbang Suara</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
        // action={async () => {
        //   "use server";
        //   await signOut();
        // }}
        >
          {/* <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">

            <div className="hidden md:block">Sign Out</div>
          </button> */}
        </form>
      </div>
    </div>
  );
}
