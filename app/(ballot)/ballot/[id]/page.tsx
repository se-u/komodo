"use client";
import { fetchCandidates, fetchVotersById } from "@/app/lib/data";
import Ballot from "@/app/ui/ballot/ballot";
import { useEffect, useState } from "react";
const VerificationLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div className="">
        <div className="animate-spin inline-block w-12 h-12 border-t-4 border-black dark:border-slate-50 border-solid rounded-full"></div>
        <p className="text-xl font-semibold">Menunggu Verifikasi</p>
        <p className="mt-2 text-lg text-gray-500">
          Jika Dalam 1 Menit Tidak Terverifikasi Sialah Hubungi Petugas
        </p>
      </div>
    </div>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  const [voter, setVoter] = useState({
    isRegistered: "any",
    isVerified: false,
    id: "any",
    name: "any",
    idCard: "any",
    account: "any",
  });
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const voter: any = await fetchVotersById(params.id);
      setVoter(voter);
    };

    // Fetch data initially
    fetchData();
    // Set up interval to fetch data every 1 second
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [params.id]);

  return (
    <>{!voter?.isVerified ? <VerificationLoading /> : <Ballot uuid={id} />}</>
  );
}
