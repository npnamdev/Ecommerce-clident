import './home.scss';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

// Hàm tạo dữ liệu giả mạo
const generateFakeData = (length) => Array.from({ length }, () => Math.floor(Math.random() * 2000) - 1000);

const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7'];

const data = {
    labels,
    datasets: [
        {
            type: 'line',
            label: 'Doanh số Bán Hàng (VND)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: [20000, 200000, -200000, -80000, 70000, -90000, 130000],
            // data: generateFakeData(labels.length),
        },
        {
            type: 'bar',
            label: 'Chi phí Quảng Cáo (VND)',
            backgroundColor: 'rgb(75, 192, 192)',
            // data: [500, 600, 700, 800, 900, 1000, 1100],
            // data: generateFakeData(labels.length),
            data: [-200000, 260000, -230000, 189000, 160000, 280000, 230000],
            borderColor: 'white',
            borderWidth: 2,
        },
        {
            type: 'bar',
            label: 'Chi phí Vận Chuyển (VND)',
            backgroundColor: 'rgb(53, 162, 235)',
            data: [-310000, 360000, -70000, -268000, 1400, -260800, 90000],
            // data: generateFakeData(labels.length),
        },
    ],
};

const Home = () => {
    return (
        <div className='chat-container'>
            <Chart type='bar' data={data} />
        </div>
    );
}

export default Home;
