import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { ChartType, PollChartData } from "../../types";
import ChartDataLabels from 'chartjs-plugin-datalabels'
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartDataLabels );


interface ResultsChartProps {
    chartData: PollChartData,
    chartType: ChartType
}

const datalabels = {
    color: 'white',
    font: {
        size: 16
    },
    formatter: (value: number, context: any) => {
        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
        return Math.round((100 / total) * value) + "%"
    }
}

const barOptions = {
    scales: {
        y: {
            ticks: {
                precision: 0
            }
        }
    },
    plugins: {
        datalabels,
        legend: {
            display: false
        }
    }
}

const ResultsChart = ({chartData, chartType}: ResultsChartProps) => {
    return ( 
        // chartType === "PIE" ? <Pie data={chartData.data}></Pie> : <Bar data={chartData.data}></Bar>
        <div className='mb-5'>
            <div className='chart-container'>
                <h6>{chartData.title}</h6>
                <Bar options={barOptions} data={chartData.data}></Bar>
            </div>
        </div>
     );
}
 
export default ResultsChart;