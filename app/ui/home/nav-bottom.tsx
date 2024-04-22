"use client";
import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/16/solid";
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
    prefetch: true,
  },
  { name: "Statistik", href: "/statistic", prefetch: true, icon: ChartBarIcon },
];

export default function BottomNav() {
  "use client";
  const path = usePathname();
  return (
    <section className="fixed inset-x-0 bottom-0 z-10 block border-t-2 bg-slate-50 bg-opacity-30 shadow backdrop-blur-lg backdrop-filter">
      <div id="tabs" className="flex justify-between">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "inline-block  w-full justify-center pb-1 pt-2 text-center hover:text-blue-500 focus:text-blue-500",
                path === link.href
                  ? "text-blue-600  dark:text-blue-400"
                  : "text-gray-800 dark:text-gray-200",
              )}
            >
              <LinkIcon className="mb-1 inline-block h-[25px] w-[25px]" />
              <span className="block text-xs">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
