import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Define TypeScript interfaces
interface PieChartDataResponse {
  labels: string[];
  data: number[];
}

interface PieChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export function PieChart() {
  const [pieChartData, setPieChartData] = useState<PieChartData>({
    labels: [],
    datasets: [
      {
        label: "Pie Chart Data",
        data: [],
        backgroundColor: [], // Default color
        borderColor: [],     // Default color
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchPieChartData();
  }, []);

  async function fetchPieChartData() {
    try {
      const res = await fetch("http://127.0.0.1:8000/polls/piechart-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data: PieChartDataResponse = await res.json();

      // Define default colors if not provided
      const defaultColors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'];

      setPieChartData({
        labels: data.labels,
        datasets: [
          {
            label: "Pie Chart Data",
            data: data.data,
            backgroundColor: defaultColors.slice(0, data.data.length),
            borderColor: defaultColors.slice(0, data.data.length).map(color =>
              color.replace("0.2", "1")
            ),
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch pie chart data:", error);
    }
  }

  return (
    <div className="pie-chart-container">
      <Pie data={pieChartData} />
    </div>
  );
}