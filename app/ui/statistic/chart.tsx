// Statistik.jsx
import styles from "./chart.module.css";
import { Bar } from "react-chartjs-2";
import faker from "faker";
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

const labels = [
  "Sindu Aditya Janadi",
  "Sebastian Pamungkas",
  "Aydin Ilham Pramstha",
];

const colorPalette = [
  "rgba(255, 99, 132, 0.5)",
  "rgba(75, 192, 192, 0.5)",
  "rgba(255, 205, 86, 0.5)",
];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: colorPalette,
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
  return (
    <>
      <div className={styles.jumbotron - statistic}>
        <div className={styles.heading - statistic}>
          <h1>Statistik Sistem</h1>
          <h3>Demokrasi Milenial</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
            eaque!
          </p>
        </div>
        <div className={styles.chart - container}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
}
