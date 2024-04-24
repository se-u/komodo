import { Card } from "@/app/ui/dashboard/cards";
import BarChart from "@/app/ui/chart";
import { fetchCandidates } from "@/app/lib/data";
export default async function Page() {
  const candidates = await fetchCandidates();

  const chartData = candidates.reduce(
    (
      result: { [x: string]: number },
      candidate: { name: string; count: any }
    ) => {
      const candidateName = candidate.name.trim().toLowerCase();
      result[candidateName] = Number(candidate.count);
      return result;
    },
    {}
  );

  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>

      <div className="mt-6">
        {candidates.length === 0 ? (
          "Data Kosong"
        ) : (
          <BarChart dataObject={chartData} title="Data Pemilihan" />
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
    </main>
  );
}
