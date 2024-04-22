import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const AccessDenied = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-red-500">Akses Ditolak</h1>
        <p className=" mb-4">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <Link href="/">
          <button className="flex items-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            <ArrowLeftIcon className="mr-2 h-6 w-6" />
            Kembali
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
