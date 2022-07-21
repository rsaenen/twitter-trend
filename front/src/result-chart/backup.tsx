import { ChartData, ChartOptions } from "chart.js";
import { FC, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

type ResultChartProps = {
  results: {
    term: string;
    count: number;
  }[];
};

export const ResultChart: FC<ResultChartProps> = ({ results }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const borderColors = ["rgb(255, 99, 132)", "rgb(53, 162, 235)"];
  const backgroundColors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(53, 162, 235, 0.5)",
  ];

  const [values1, setValues1] = useState<number[]>([]);
  const [values2, setValues2] = useState<number[]>([]);

  const [data, setData] = useState<ChartData<"line", number[]>>({
    labels: [],
    datasets: results.map((result, index) => ({
      label: result.term,
      data: [],
      borderColor: borderColors[index],
      backgroundColor: backgroundColors[index],
    })),
  });

  useEffect(() => {
    const newValue1 = results[0].count - values1.reduce((pv, cv) => (pv += cv), 0);
    const newValue2 = results[1].count - values2.reduce((pv, cv) => (pv += cv), 0);

    const newValues1 = [...values1, newValue1];
    const newValues2 = [...values2, newValue2];
    setValues1(newValues1);
    setValues2(newValues2);

    setData((data) => ({
      ...data,
      datasets: data.datasets.map((dataset, index) => {
        if (index === 0) {
          return {
            ...dataset,
            data: newValues1,
          };
        } else {
          return {
            ...dataset,
            data: newValues2,
          };
        }
      }),
    }));
  }, [results]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  console.log(data);

  return <Line options={options} data={data} />;
};