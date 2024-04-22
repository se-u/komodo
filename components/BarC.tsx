"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface ChartProps {
  dataObject: Record<string, number>;
  title: string;
}

const BarChart: React.FC<ChartProps> = ({ dataObject, title }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: Object.keys(dataObject),
            datasets: [
              {
                label: "Jumlah Pemilih",
                data: Object.values(dataObject),
                backgroundColor: [
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: title,
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [dataObject, title]);

  return (
    <div className="h-[500px] w-full rounded-2xl bg-slate-100 p-3 shadow-md">
      <canvas ref={chartRef} className="mx-auto w-[400px]" />
    </div>
  );
};

export default BarChart;
