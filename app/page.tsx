import Hero from "@/app/ui/home/hero";
import { ChartBarIcon, SignalIcon } from "@heroicons/react/16/solid";
import { BookOpenIcon, HomeIcon } from "@heroicons/react/16/solid";
import NotificationTop from "./ui/notification";

export function NavBottom() {
  return (
    <>
      <div className="btm-nav glass bg-black text-gray-300 text-sm">
        <button className="hover:bg-orange-400 hover:text-white hover:font-bold">
          <HomeIcon className="h-7 w-7" />

          <span className="btm-nav-label">Beranda</span>
        </button>
        <button className="hover:bg-orange-400 hover:text-white hover:font-bold">
          <BookOpenIcon className="h-7 w-7" />
          <span className="btm-nav-label">Panduan</span>
        </button>
        <button className="hover:bg-orange-400 hover:text-white hover:font-bold">
          <ChartBarIcon className="h-7 w-7" />
          <span className="btm-nav-label">Statistik</span>
        </button>
      </div>
    </>
  );
}

export default async function Home() {
  return (
    <>
      <NotificationTop />

      <Hero />
      <NavBottom />
    </>
  );
}
