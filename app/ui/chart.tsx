import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const dataObject = {
  "Sindu Aditya Janadi": 450,
  "Sebastian Pamungkas": 750,
  "Aydin Ilham Pramstha": 300,
};

const labels = Object.keys(dataObject);
const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map((label) => dataObject[label]),
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(255, 205, 86, 0.5)",
      ],
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Data Pemilihan",
    },
  },
};

export default function Chart() {
  return <Bar data={data} options={options}/>;


}
