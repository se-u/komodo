import BarChart from "@/app/ui/chart";
import { ClockIcon } from "@heroicons/react/20/solid";
import { Suspense } from "react";

export const Chart = async () => {
  const voteActive = false;
  const candidates = [{name:'Sindu', count: 0}]
  let chartData: { [key: string]: number } = {};
  for (const item of candidates) {
    chartData[item.name] = Number(item.count);
  }

  return (
    <>
      {!voteActive ? (
        <div className="w-full">
          <BarChart dataObject={chartData} title="Pemilihan" />
        </div>
      ) : (
        <div className="container mx-auto flex h-screen items-center justify-center p-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-[#012169]">
              <ClockIcon className="mb-1 mr-2 inline-block h-20 " />
              Statistik
            </h1>
            <p className="text-xl text-[#012169]">
              Pemilihan belum berakhir. Tetap pantau untuk hasil selanjutnya!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default function Statistik() {
  return (
    <div className="flex h-screen w-full justify-center gap-4 pt-12 ">
      <div className="flex-col p-6">
        <h1 className="inline border-b-[5px] border-[#F0B323] text-5xl font-bold ">
          Statistik
        </h1>

        <h3 className="mt-4 font-bold ">
          Klik, Pilih Aman. Demokrasi Tanpa Keraguan
        </h3>
      </div>
      <div className="w-[65%] flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          <Chart />
        </Suspense>
      </div>
    </div>
  );
}
