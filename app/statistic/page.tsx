'use client';

import Chart from "@/app/ui/chart";
import BarChart from "@/app/ui/chart";

export default function Statistic() {
    const chartData = {
        "Sindu Aditya Janadi": 450,
        "Sebastian Pamungkas": 750,
        "Aydin Ilham Pramstha": 300,
    };
    return (
        <>
            <div className="hero min-h-screen bg-white">
                <div className="hero-content flex-col lg:flex-row">
                    <div>
                        <h1 className="text-5xl font-bold text-[#012169] border-b-[8px] inline border-[#F0B323]">Statistic System</h1>
                        <h2 className="text-3xl pt-20 font-bold text-[#012169]">Gerbang Suara</h2>
                        <p className="py-2 font-medium">Klik, Pilih, Aman. Demokrasi Milenial</p>
                    </div>
                    <BarChart dataObject={chartData} title="Pemilihan"/>
                </div>
            </div>
        </>
    );
}
