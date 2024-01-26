import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import Image from "next/image";
import { Figtree } from "next/font/google";
import { Button } from "@/components/ui/button";

const figtree = Figtree({ subsets: ["latin"], weight: ["700"] });

export async function Hero() {
  return (
    <>
      <div className="absolute inset-0 bg-cover bg-center blur-sm"></div>
      <div className="container mx-auto p-8 lg:p-16 flex justify-between items-center  z-10">
        <div className="text-center lg:text-left lg:w-1/2 text-white">
          <h1 className="text-6xl my-2 text-orange-400 drop-shadow-glow">
            Gerbang Suara
          </h1>
          <h2 className="text-5xl my-2">
            {/* <span className="bg-gradient-to-r from-yellow-300 to-transparent absolute top-0 left-0 w-full h-full"></span> */}
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
    </>
  );
}

function announcement() {
  return (
    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
      <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
        Announcing our next round of funding.
        <a href="#" className="font-semibold text-indigo-600">
          <span className="absolute inset-0" aria-hidden="true"></span>
          Read more <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}

export function PolygonBlur() {
  return (
    <div
      className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      ></div>
    </div>
  );
}

export function PolygonBlurSecond() {
  return (
    <div
      className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true"
    >
      <div
        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      ></div>
    </div>
  );
}
export default function Home() {
  return (
    <>
      <div className="bg-inherit">
        <div className="relative isolate px-6 lg:px-8">
          <PolygonBlur />

          <div className="flex justify-between items-center">
            <div className="flex-col">
              <div className="max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-left">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl">
                    Klik, Pilih, Aman. Demokrasi Tanpa Keraguan 👋
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200 ">
                    Tenang Kita Simpan Datamu Di Tempat Yang Aman
                  </p>
                  <div className="mt-10 flex items-center justify-start gap-x-6">
                    <Link href={"/guide"}>
                      <Button>Mulai Memilih!</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col ">
              <Image
                width={250}
                height={250}
                src="/logologin.png"
                className="max-w-sm mx-auto rounded-lg"
                alt="Logo Gerbang Suara"
              />
            </div>
          </div>

          <PolygonBlurSecond />
        </div>
      </div>
    </>
  );
}
