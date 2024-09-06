import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ChartData,
  ChartOptions,
  TimeScale
} from "chart.js";
import { Chart as ChartJSReact } from "react-chartjs-2";
import 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns'; // Import the date-fns adapter
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";

// Register necessary components for Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  TimeScale, // Register the TimeScale
  CandlestickController,
  CandlestickElement
);

interface FinancialDataPoint {
  x: number; // Timestamp in milliseconds
  o: number; // Open value
  h: number; // High value
  l: number; // Low value
  c: number; // Close value
}

interface CandleChartData {
  data: FinancialDataPoint[];
}

export function CandlestickChart() {
  const [candleStickChartData, setCandleStickChartData] = useState<CandleChartData | null>(null);

  async function fetchCandleStickChart() {
    try {
      const res = await fetch("http://127.0.0.1:8000/polls/candlestick-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      // Transform the data to match the expected structure
      const transformedData: CandleChartData = {
        data: data.data.map((item: { x: string; open: number; high: number; low: number; close: number }) => ({
          x: new Date(item.x).getTime(), // Convert date to timestamp
          o: item.open,
          h: item.high,
          l: item.low,
          c: item.close
        }))
      };

      setCandleStickChartData(transformedData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  useEffect(() => {
    fetchCandleStickChart();
  }, []);

  const data: ChartData<"candlestick"> = {
    datasets: [
      {
        label: "Candlestick Chart",
        data: candleStickChartData?.data || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options: ChartOptions<"candlestick"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `Open: ${tooltipItem.raw.o}, High: ${tooltipItem.raw.h}, Low: ${tooltipItem.raw.l}, Close: ${tooltipItem.raw.c}`,
        },
      },
    },
    scales: {
      x: {
        type: "time", // Use the 'time' scale for x-axis to support dates
        time: {
          unit: "day",
        },
        position: "bottom",
      },
      y: {
        type: "linear",
        position: "left",
      },
    },
  };

  return (
    <div>
      {candleStickChartData ? (
        <ChartJSReact
          type="candlestick"
          data={data}
          options={options}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}