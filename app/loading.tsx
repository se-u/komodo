export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div className="">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-black dark:border-slate-100"></div>
        <p className="text-xl font-semibold">Mohon Tunggu Sebentar</p>
        <p className="mt-2 text-sm text-gray-500">
          Kami memerlukan sedikit waktu untuk menyelesaikan proses anda
        </p>
      </div>
    </div>
  );
}
