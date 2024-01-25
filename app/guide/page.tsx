import { ArrowRightIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

function GuideCard() {
  return (
    <>
      <div className="hero flex flex-col">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center mt-10">
            <div className="max-w-sm">
              <div className="flex rounded-lg dark:bg-gray-800 bg-teal-400 flex-col">
                <Image
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover rounded-md"
                  src="/1.png"
                  blurDataURL={"/1.png"}
                  placeholder="blur"
                  alt="Masukkan Data diri"
                />
              </div>
            </div>
            <div className="max-w-sm">
              <div className="flex rounded-lg dark:bg-gray-800 bg-teal-400 flex-col">
                <Image
                  width={500}
                  height={500}
                  blurDataURL={"/2.png"}
                  placeholder="blur"
                  className="w-full h-auto object-cover rounded-md"
                  src="/2.png"
                  alt="Menunggu Vertifikasi"
                />
              </div>
            </div>
            <div className="max-w-sm">
              <div className="flex rounded-lg dark:bg-gray-800 bg-teal-400 flex-col">
                <Image
                  width={500}
                  height={500}
                  blurDataURL={"/3.png"}
                  placeholder="blur"
                  className="w-full h-auto object-cover rounded-md"
                  src="/3.png"
                  alt="Pilih Kandidat"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Guide() {
  return (
    <div className={`hero min-h-screen `}>
      <span
        className={`bg-gradient-to-b from-gray-900 to-gray-600 bg-image  top-0 left-0 w-full h-full`}
      ></span>
      <div className="absolute inset-0 bg-cover bg-center blur-sm"></div>
      <div className="container mx-auto z-10">
        <GuideCard />
        <div className="w-full h-20 mx-auto p-5">
          <div className="btm-nav glass bg-black text-gray-300 text-sm">
            <Link
              href={"/check"}
              prefetch={true}
              className="hover:bg-orange-400 hover:text-white flex-row"
            >
              <ArrowRightIcon className="h-7 w-7" />
              <span className="text-lg">Mulai</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
