import BarChart from "@/app/ui/chart";
import { fetchCandidates, fetchIsVoteActive } from "../../lib/data";
import { ClockIcon } from "@heroicons/react/20/solid";
import { Suspense } from "react";

export const Chart = async () => {
  const voteActive = await fetchIsVoteActive("");
  const candidates = await fetchCandidates();
  const chartData = candidates.reduce(
    (
      result: { [x: string]: number },
      candidate: { name: string; count: any }
    ) => {
      const candidateName = candidate.name.trim().toLowerCase();
      result[candidateName] = Number(candidate.count);
      return result;
    }
  );
  return (
    <>
      {!voteActive ? (
        <div className="w-2/3 ml-4">
          <div className=" p-4">
            <BarChart dataObject={chartData} title="Pemilihan" />
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-4 flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#012169] mb-4">
              <ClockIcon className="inline-block mr-2 mb-1 h-20 " />
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
    <div className="bg-slate-200 w-full h-screen">
      <div className="container mx-auto p-4 flex">
        <div className="w-1/3">
          <div className="p-4">
            <h1 className="text-4xl font-bold text-[#012169] border-b-[8px] inline border-[#F0B323]">
              Statistik
            </h1>
            <h2 className="text-4xl pt-12 font-bold text-[#012169]">
              Gerbang Suara
            </h2>
            <p className="py-2 font-medium text-gray-800">
              Klik, Pilih, Aman. Demokrasi Milenial
            </p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <Chart />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
