import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components of Chart.js you need
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type LineChartData = {
    labels: string[];
    data: number[];
};

export function LineChart() {
    const [lineChartData, setLineChartData] = useState<LineChartData>({
        labels: [],
        data: []
    });

    useEffect(() => {
        async function fetchLineChart() {
            try {
                const res = await fetch("http://127.0.0.1:8000/polls/linechart-data", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await res.json();
                // Assuming the response structure is { labels: string[], data: number[] }
                setLineChartData({
                    labels: data.labels,
                    data: data.data
                });
            } catch (error) {
                console.error("Error fetching line chart data:", error);
            }
        }

        fetchLineChart();
    }, []);

    // Define the chart data and options
    const chartData = {
        labels: lineChartData.labels,
        datasets: [
            {
                label: 'My Line Chart',
                data: lineChartData.data,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `Value: ${context.raw}`,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}