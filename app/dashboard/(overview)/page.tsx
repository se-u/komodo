// import CardWrapper from "@/app/ui/dashboard/cards";
// import RevenueChart from "@/app/ui/dashboard/revenue-chart";
// import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
// // import { lusitana } from '@/app/ui/fonts';
// import { Suspense } from "react";
// // import {
// //   CardSkeleton,
// //   LatestInvoicesSkeleton,
// //   RevenueChartSkeleton,
// // } from '@/app/ui/skeletons';

// export default async function Page() {
//   return (
//     <main>
//       <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {/* <Suspense fallback={<CardSkeleton />}> */}
//         {/* <CardWrapper /> */}
//         {/* </Suspense> */}
//       </div>
//       <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
//         {/* <Suspense fallback={<RevenueChartSkeleton />}> */}
//         {/* <RevenueChart />
//         </Suspense>
//         <Suspense fallback={<LatestInvoicesSkeleton />}>
//           <LatestInvoices />
//         </Suspense> */}
//       </div>
//     </main>
//   );
// }

'use client';
import { Card } from "@/app/ui/dashboard/cards";
import Chart from "@/app/ui/chart";
import BarChart from "@/app/ui/chart";
// import { lusitana } from '@/app/ui/fonts';
export default async function Page() {
    const chartData = {
        "Sindu Aditya Janadi": 450,
        "Sebastian Pamungkas": 750,
        "Aydin Ilham Pramstha": 300,
    };
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={12} type="collected" />
        <Card title="Pending" value={13} type="pending" />
        <Card title="Total Invoices" value={14} type="invoices" />
        <Card title="Total Customers" value={15} type="customers" />
          <BarChart dataObject={chartData} title="Data Pemilihan"/>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      </div>
    </main>
  );
}
