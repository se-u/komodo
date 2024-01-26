"use client";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PolygonBlur, PolygonBlurSecond } from "../(home)/page";
import Loading from "../loading";

const guides = [
  { img: "/1.png", title: "Masukan Data Diri", desc: "saas" },
  { img: "/2.png", title: "Tunggu Verifikasi", desc: "saas" },
  { img: "/3.png", title: "Memilih", desc: "saas" },
  { img: "special", title: "", desc: "Pastikan kamu sudah paham cara memilih" },
];

export default function Guide({ params }: { params: { index: string } }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <>
      {!loading ? (
        <div className="bg-white">
          <div className="relative isolate px-6 lg:px-8">
            <PolygonBlur />

            <div className="fixed top-0 w-full min-h-screen">
              <div className="">
                <input
                  className="sr-only peer"
                  type="radio"
                  name="carousel"
                  id="carousel-1"
                  checked
                />
                <div className="max-w-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 opacity-0 peer-checked:opacity-100 peer-checked:z-10 z-0">
                  {step !== 3 ? (
                    <>
                      <Image
                        height={400}
                        width={500}
                        className="rounded-t-lg object-cover"
                        src={guides[step].img}
                        alt={guides[step].title}
                      />
                      <div className="py-4 px-8 text-center dark:text-white text-gray-900">
                        <h1 className="hover:cursor-pointer mt-2 font-bold text-2xl tracking-tight">
                          {guides[step].title}
                        </h1>
                        <p className="hover:cursor-pointer py-3 text-gray-600 dark:text-slate-300 leading-6">
                          {guides[step].desc}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-32 h-32 mx-auto text-blue-600 dark:text-blue-500"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                        />
                      </svg>

                      <div className="py-8 px-8 text-center">
                        <h1 className="hover:cursor-pointer text-gray-900 dark:text-slate-200 font-bold text-2xl tracking-tight">
                          Apakah Kamu Sudah Siap Memilih?
                        </h1>
                        <p className="hover:cursor-pointer py-3 text-gray-600 dark:text-slate-300 leading-6">
                          {guides[step].desc}
                        </p>

                        <Link href={"/check"} className="block">
                          <button
                            onClick={() => setLoading(true)}
                            className="group relative h-12 w-full overflow-hidden rounded bg-white text-lg shadow"
                          >
                            <div className="absolute inset-0 w-[0px] bg-green-500 dark:bg-green-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                            <span className="relative text-black group-hover:text-white">
                              Ya! Siap.
                            </span>
                          </button>
                        </Link>
                      </div>
                    </>
                  )}
                  <div className="absolute top-1/2 w-full flex justify-between z-20">
                    <label className="inline-block text-gray-800 cursor-pointer -translate-x-9 bg-white rounded-full shadow-md active:translate-y-0.5">
                      {step >= 1 ? (
                        <svg
                          onClick={handlePrev}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-14 w-14"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </label>

                    <label className="inline-block text-gray-800 cursor-pointer translate-x-9 bg-white rounded-full shadow-md active:translate-y-0.5">
                      {step < 3 ? (
                        <svg
                          onClick={handleNext}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-14 w-14"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <PolygonBlurSecond />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>

    // ========
    // <div className={`hero min-h-screen `}>
    //   <span
    //     className={`bg-gradient-to-b from-gray-900 to-gray-600 bg-image  top-0 left-0 w-full h-full`}
    //   ></span>
    //   <div className="absolute inset-0 bg-cover bg-center blur-sm"></div>
    //   <div className="container mx-auto z-10">
    //     <GuideCard />
    //     <div className="w-full h-20 mx-auto p-5">
    //       <div className="btm-nav glass bg-black text-gray-300 text-sm">
    //         <Link
    //           href={"/check"}
    //           prefetch={true}
    //           className="hover:bg-orange-400 hover:text-white flex-row"
    //         >
    //           <ArrowRightIcon className="h-7 w-7" />
    //           <span className="text-lg">Mulai</span>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
