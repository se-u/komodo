import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { fetchIsVoteActive } from "@/app/lib/data";
import StatusBar from "@/app/components/status-bar";
import Form from "@/app/ui/home/validate-form";
export async function ValidateForm() {
  const isActive = await fetchIsVoteActive("");
  return (
    <>
      {isActive ? (
        <Form />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-4">
              Akses Ditutup
            </h1>
            <p className="text-slate-200 mb-4">Pemilihan Telah Berakhir</p>
            <Link href="/">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                <ArrowLeftIcon className="w-6 h-6 mr-2" />
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
  return (
    <div
      className="flex items-center w-full h-screen justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('/prambanan.jpg')`,
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <StatusBar />
      <ValidateForm />
    </div>
  );
}
