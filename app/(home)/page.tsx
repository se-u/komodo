import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import Image from "next/image";
import { Figtree } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"], weight: ["700"] });

export async function Hero() {
  return (
    <div className={`${figtree.className} hero min-h-screen `}>
      <span
        className={`bg-gradient-to-b from-gray-900 to-gray-600 bg-image  top-0 left-0 w-full h-full`}
      ></span>
      <div className="absolute inset-0 bg-cover bg-center blur-sm"></div>
      <div className="container mx-auto p-8 lg:p-16 flex justify-between items-center  z-10">
        <div className="text-center lg:text-left lg:w-1/2 text-white">
          <h1 className="text-6xl my-2 text-orange-400 drop-shadow-glow">
            Gerbang Suara
          </h1>
          <h2 className="text-5xl my-2">
            {/* <span class="bg-gradient-to-r from-yellow-300 to-transparent absolute top-0 left-0 w-full h-full"></span> */}
            Klik, Pilih, Aman. Demokrasi Tanpa Keraguan 👋
          </h2>

          <Link href={"/guide"} prefetch={true}>
            <button className="btn glass btn-lg text-white">
              <PaperAirplaneIcon className="w-6" />
              Mulai Memilih
            </button>
          </Link>
        </div>
        <div className="">
          <Image
            width={250}
            height={250}
            src="/logologin.png"
            className="max-w-sm rounded-lg"
            alt="Logo Gerbang Suara"
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
