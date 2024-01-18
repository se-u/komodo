"use client";
import { fetchVotersById } from "@/app/lib/data";
import Ballot from "@/app/ui/ballot/ballot";
import { useEffect, useState } from "react";
const VerificationLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-16 h-16">
        {/* Outer petals */}
        <div className="absolute w-16 h-16 bg-blue-500 rounded-full"></div>
        <div className="absolute w-16 h-16 bg-blue-500 rounded-full transform rotate-45"></div>
        <div className="absolute w-16 h-16 bg-blue-500 rounded-full transform rotate-90"></div>
        <div className="absolute w-16 h-16 bg-blue-500 rounded-full transform rotate-135"></div>

        {/* Inner petals */}
        <div className="absolute w-8 h-8 bg-white rounded-full"></div>
        <div className="absolute w-8 h-8 bg-white rounded-full transform rotate-45"></div>
        <div className="absolute w-8 h-8 bg-white rounded-full transform rotate-90"></div>
        <div className="absolute w-8 h-8 bg-white rounded-full transform rotate-135"></div>

        {/* Center */}
        <div className="absolute w-4 h-4 bg-blue-700 rounded-full top-6 left-6"></div>
      </div>

      <div className="ml-4">
        <div className="animate-spin inline-block w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full"></div>
        <p className="ml-2 text-gray-200 text-lg">Menunggu Verifikasi</p>
        <p className="mt-2 text-sm text-gray-500">
          Silahkan hubungi petugas terkait untuk informasi lebih lanjut.
        </p>
      </div>
    </div>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  const [voter, setVoter] = useState();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const voter = await fetchVotersById(params.id);
      setVoter(voter);
    };

    // Fetch data initially
    fetchData();
    // Set up interval to fetch data every 1 second
    const intervalId = setInterval(fetchData, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [params.id]);

  return <>{voter?.isVerified ? <Ballot /> : <VerificationLoading />}</>;
}
