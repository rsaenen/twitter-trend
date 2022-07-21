import { ChartData, ChartOptions } from "chart.js";
import { FC, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

const borderColors = ["rgb(255, 99, 132)", "rgb(53, 162, 235)"];
const backgroundColors = [
  "rgba(255, 99, 132, 0.5)",
  "rgba(53, 162, 235, 0.5)",
];

type ResultChartProps = {
  results: {
    term: string;
    count: number;
  }[];
};

export const ResultChart: FC<ResultChartProps> = ({ results }) => {
  const [chartData, setChartData] = useState<ChartData<'bar', number[]>>({
    labels: ['Twitter'],
    datasets: results.map((result, index) => ({
      label: result.term,
      data: [result.count],
      borderColor: borderColors[index],
      backgroundColor: backgroundColors[index]
    }))
  });

  useEffect(() => {
    setChartData(chartData => ({
      ...chartData,
      datasets: results.map((result, index) => ({
        label: result.term,
        data: [result.count],
        borderColor: borderColors[index],
        backgroundColor: backgroundColors[index]
      }))
    }));
  }, [results]);

  return <Bar options={options} data={chartData} />;
};