export default function GuideCard() {
  return (
    <>
      <div className="hero">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center mt-10">
          <div className="max-w-sm">
            <div className="flex rounded-lg dark:bg-gray-800 bg-teal-400 flex-col">
              <img
                className="w-full h-52 object-cover rounded-md"
                src="/1.png"
                alt="Masukkan Data diri"
              />
            </div>
          </div>
          <div className="max-w-sm">
            <div className="flex rounded-lg dark:bg-gray-800 bg-teal-400 flex-col">
              <img
                className="w-full h-52 object-cover rounded-md"
                src="/2.png"
                alt="Menunggu Vertifikasi"
              />
            </div>
          </div>
          <div className="max-w-sm">
            <div className="flex rounded-lg dark:bg-gray-800 bg-teal-400 flex-col">
              <img
                className="w-full h-52 object-cover rounded-md"
                src="/3.png"
                alt="Pilih Kandidat"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
