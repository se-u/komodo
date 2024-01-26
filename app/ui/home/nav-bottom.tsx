"use client";
import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/16/solid";
import { BookOpenIcon, HomeIcon } from "@heroicons/react/16/solid";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const GuideIcon = () => {
  return (
    <svg
      width="25"
      height="25"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="inline-block mb-1"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />

      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path
          d="M21.0847458,3.38674884 C17.8305085,7.08474576 17.8305085,10.7827427 21.0847458,14.4807396 C24.3389831,18.1787365 24.3389831,22.5701079 21.0847458,27.6548536 L21.0847458,42 L8.06779661,41.3066256 L6,38.5331279 L6,26.2681048 L6,17.2542373 L8.88135593,12.4006163 L21.0847458,2 L21.0847458,3.38674884 Z"
          fill="currentColor"
          fill-opacity="0.1"
        ></path>
        <path
          d="M11,8 L33,8 L11,8 Z M39,17 L39,36 C39,39.3137085 36.3137085,42 33,42 L11,42 C7.6862915,42 5,39.3137085 5,36 L5,17 L7,17 L7,36 C7,38.209139 8.790861,40 11,40 L33,40 C35.209139,40 37,38.209139 37,36 L37,17 L39,17 Z"
          fill="currentColor"
        ></path>
        <path
          d="M22,27 C25.3137085,27 28,29.6862915 28,33 L28,41 L16,41 L16,33 C16,29.6862915 18.6862915,27 22,27 Z"
          stroke="currentColor"
          stroke-width="2"
          fill="currentColor"
          fill-opacity="0.1"
        ></path>
        <rect
          fill="currentColor"
          transform="translate(32.000000, 11.313708) scale(-1, 1) rotate(-45.000000) translate(-32.000000, -11.313708) "
          x="17"
          y="10.3137085"
          width="30"
          height="2"
          rx="1"
        ></rect>
        <rect
          fill="currentColor"
          transform="translate(12.000000, 11.313708) rotate(-45.000000) translate(-12.000000, -11.313708) "
          x="-3"
          y="10.3137085"
          width="30"
          height="2"
          rx="1"
        ></rect>
      </g>
    </svg>
  );
};

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
    <section className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow border-t-2">
      <div id="tabs" className="flex justify-between">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "w-full focus:text-indigo-500 hover:text-indigo-500 justify-center inline-block text-center pt-2 pb-1",
                path === link.href ? "text-indigo-600" : ""
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
