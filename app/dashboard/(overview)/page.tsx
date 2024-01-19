import { Card } from "@/app/ui/dashboard/cards";
import BarChart from "@/app/ui/chart";
import { fetchCandidates } from "@/app/lib/data";
export default async function Page() {
  const candidates = await fetchCandidates();
  const chartData = candidates.reduce((result, candidate) => {
    const candidateName = candidate.name.trim().toLowerCase();
    result[candidateName] = Number(candidate.count);
    return result;
  }, {});

  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={12} type="collected" />
        <Card title="Pending" value={13} type="pending" />
        <Card title="Total Invoices" value={14} type="invoices" />
        <Card title="Total Customers" value={15} type="customers" />
      </div>

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
