'use client';

import Chart from "@/app/ui/chart";

export default function Statistic() {
    return (
        <>
            <div className="hero min-h-screen bg-white">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Statistik Sistem</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <Chart />
                    </div>

                </div>
            </div>

        </>
    );
}
