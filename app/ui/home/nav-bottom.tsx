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
  {
    name: "About",
    href: "/about",
    prefetch: true,
    icon: QuestionMarkCircleIcon,
  },
];

export default function BottomNav() {
  "use client";
  const path = usePathname();
  return (
    <section className="block fixed inset-x-0 bottom-0 z-10 bg-slate-50 dark:bg-black shadow border-t-2">
      <div id="tabs" className="flex justify-between">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "w-full text-gray-800 dark:text-gray-200 focus:text-indigo-500 hover:text-indigo-500 justify-center inline-block text-center pt-2 pb-1",
                path === link.href ? "text-indigo-600 dark:text-blue-400" : ""
              )}
            >
              <LinkIcon className="w-[25px] h-[25px] inline-block mb-1" />
              <span className="block text-xs">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
