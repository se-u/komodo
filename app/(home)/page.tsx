import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

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
export default async function Home() {
  return (
    <>
      <div className="bg-inherit">
        <div className="relative isolate px-6 lg:px-8">
          <PolygonBlur />
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="order-2 flex-col md:order-1">
              <div className="max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-left">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-50">
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

            <div className="order-1 flex-col md:order-2 dark:hidden">
              <Image
                width={600}
                height={600}
                src="/hero-light.svg"
                className=" mx-auto rounded-lg"
                alt="Logo Gerbang Suara"
              />
            </div>

            <div className="order-1 hidden flex-col md:order-2 dark:flex">
              <Image
                width={600}
                height={600}
                src="/hero-dark.svg"
                className=" mx-auto rounded-lg"
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
