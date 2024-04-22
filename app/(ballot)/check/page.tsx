"use client";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Form from "@/app/ui/home/validate-form";
import { FormEvent, useContext, useState } from "react";
import { navigateBallot, validateVoter } from "@/app/lib/actions";
import { AuthContext } from "@/app/auth-context";

import { PolygonBlur, PolygonBlurSecond } from "@/app/(home)/page";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div className="">
        <div className="inline-block h-20 w-20 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-full w-full"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
            />
          </svg>
        </div>
        <p className="text-2xl font-semibold">Mengirim Permintaan</p>

        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 ">
          Datamu sedang kami kirim, mohong tunggu sebentar.
        </p>
      </div>
    </div>
  );
}

export async function ValidateForm() {
  const isActive = false;
  return (
    <>
      {isActive ? (
        <Form />
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-red-500">
              Akses Ditutup
            </h1>
            <p className="mb-4 text-slate-200">Pemilihan Telah Berakhir</p>
            <Link href="/">
              <button className="flex items-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                <ArrowLeftIcon className="mr-2 h-6 w-6" />
                Kembali
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default function Validate() {
  const [connectedAccount, _] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      if (formData?.get("name") !== "calvin") {
        setLoading(false);
        setError(true);
      } else {
        navigateBallot("dummy");
      }
    } catch (error: any) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog open={error} onOpenChange={setError}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Maaf Permintaan Tidak Dapat Kami Proses
            </AlertDialogTitle>
            <AlertDialogDescription>
              Maaf anda sudah melakukan voting atau sudah terdaftar (pakai name:
              calvin biar ke kirim)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Mengerti</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="absolute right-0 top-0 w-full">
        <PolygonBlur />
        <div className="absolute -right-0 -top-40 h-80 w-80 rounded-full border-4 border-t-8 border-opacity-30"></div>
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border-4 border-t-8 border-opacity-30"></div>
      </div>
      {!loading ? (
        <div className="min-w-s h-screen md:flex">
          <div className="relative hidden w-1/2 items-center justify-around overflow-hidden md:flex">
            <div className="z-10 m-5">
              <div className="rounded-md p-5">
                <img src={"/hero-check.png"} />
              </div>
            </div>
            <div className="absolute -bottom-32 -left-40 h-80 w-80 rounded-full border-4 border-t-8 border-opacity-30"></div>
            <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full border-4 border-t-8 border-opacity-30"></div>
          </div>

          <div className="flex items-center justify-center bg-white py-10  md:w-1/2">
            <form className="w-3/4" onSubmit={handleSubmit}>
              <h1 className="mb-1 text-2xl font-bold text-gray-800">
                Verifikasi Data Pemilih
              </h1>
              <p className="mb-7 text-sm font-normal text-gray-600">
                Silahkan masukan data diri anda dengan benar.
              </p>
              <div className="mb-4 flex items-center rounded border-2 px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  className="w-full bg-transparent pl-2 text-black outline-none"
                  type="text"
                  name="name"
                  placeholder="Nama Lengkap"
                />
              </div>
              <div className="mb-4 flex items-center rounded border-2 px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
                <input
                  className="w-full border-none bg-transparent pl-2 text-black outline-none"
                  type="text"
                  name="idCard"
                  id=""
                  placeholder="Nomor Induk Kependudukan"
                />
              </div>

              <button
                type="submit"
                className="mb-2 mt-4 block w-full rounded bg-black py-2 font-semibold text-white"
              >
                Verifikasi
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      ;
    </>
  );
}
