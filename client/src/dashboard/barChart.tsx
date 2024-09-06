import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Define the interface for the bar chart data
interface BarChartData {
    labels: string[];
    data: number[];
}

export function BarChart() {
    const [chartData, setChartData] = useState<BarChartData | null>(null);

    async function fetchBarChartData() {
        try {
            const res = await fetch("http://127.0.0.1:8000/polls/barchart-data", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data: BarChartData = await res.json();
            setChartData(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    useEffect(() => {
        fetchBarChartData();
    }, []);

    // Prepare the data for Chart.js
    const data = {
        labels: chartData?.labels || [],
        datasets: [
            {
                label: 'Sales Data',
                data: chartData?.data || [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => `Value: ${tooltipItem.raw}`,
                },
            },
        },
    };

    return (
        <div>
            {chartData ? (
                <Bar data={data} options={options} />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
}