"use client";
import { ChartBarIcon } from "@heroicons/react/16/solid";
import { BookOpenIcon, HomeIcon } from "@heroicons/react/16/solid";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
  { name: "Beranda", href: "/", icon: HomeIcon, prefetch: true },
  {
    name: "Panduan",
    href: "/faq",
    icon: BookOpenIcon,
    prefetch: true 
  },
  { name: "Statistik", href: "/statistic", prefetch: true ,icon: ChartBarIcon },
];

export function NavBottom() {
  const path = usePathname();
  return (
    <>
      <div className="btm-nav glass bg-black text-gray-300 text-sm">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              href={link.href}
              key={link.name}
              prefetch={link.prefetch}
              className={clsx(
                "hover:bg-orange-400 hover:text-white hover:font-bold",
                {
                  "active bg-orange-400 text-gray-800 font-bold":
                    path === link.href,
                }
              )}
            >
              <LinkIcon className="h-7 w-7" />
              <span className="btm-nav-label">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
