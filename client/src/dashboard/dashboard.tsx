import { BarChart } from "../dashboard/barChart";
import { CandlestickChart } from "../dashboard/candlestickChart";
import { PieChart } from "../dashboard/pieChart";
import { LineChart } from "./lineChart";
import '../dashboard.css';  // Import the CSS file

export function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="chart-box bar-chart">
                <h2 className="chart-title">Bar Chart</h2>
                <BarChart />
            </div>
            <div className="chart-box pie-chart">
                <h2 className="chart-title">Pie Chart</h2>
                <PieChart />
            </div>
            <div className="chart-box line-chart">
                <h2 className="chart-title">Line Chart</h2>
                <LineChart />
            </div>
            <div className="chart-box candlestick-chart">
                <h2 className="chart-title">Candlestick Chart</h2>
                <CandlestickChart />
            </div>
        </div>
    );
}