/** @format */

import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  LucideVoicemail,
  UsersRound,
} from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { userAgent } from "next/server";
import StatusBar from "@/app/components/status-bar";

const cardData: CardProps[] = [
  {
    label: "Total Suara",
    amount: "40",
    discription: "Demokrasi Milenial",
    icon: LucideVoicemail,
  },
  {
    label: "Total Partisipan",
    amount: "1000",
    discription: "Hak Pilih",
    icon: Users,
  },
  {
    label: "Candidat",
    amount: "3",
    discription: "Total Calon",
    icon: UsersRound,
  },
  {
    label: "User",
    amount: "ADMIN",
    discription: "Anda Login sebagai Admin",
    icon: Activity,
  },
];

export default function Dashboard() {
  return (
    <div className="flex w-full flex-col  gap-5">
      <StatusBar />
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-1">
        <CardContent>
          <p className="p-4 font-semibold">Statistik Suara</p>
          <BarChart />
        </CardContent>
      </section>
    </div>
  );
}
