import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Akses Ditolak</h1>
        <p className="text-slate-200 mb-4">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <ArrowLeftIcon className="w-6 h-6 mr-2" />
            Kembali
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
