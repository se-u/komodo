export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div className="">
        <div className="animate-spin inline-block w-12 h-12 border-t-4 border-black dark:border-slate-100 border-solid rounded-full"></div>
        <p className="text-xl font-semibold">Menunggu Verifikasi</p>
        <p className="mt-2 text-sm text-gray-500">
          Kami memerlukan sedikit waktu untuk menyelesaikan proses anda
        </p>
      </div>
    </div>
  );
}
