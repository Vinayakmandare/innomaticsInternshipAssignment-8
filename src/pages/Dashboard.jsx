import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import '../../src/index.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = ({ students }) => {
  const classDistribution = students.reduce((acc, student) => {
    acc[student.class] = (acc[student.class] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(classDistribution),
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(classDistribution),
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows manual control of height/width
  };

  return (
    <div className="container">
      <h2 className="text-center my-3">Dashboard</h2>
      <div className="chart-container d-flex my-5">
        <div className="chart" style={{ width: '500px', height: '300px', margin: 'auto' }}>
          <h5 className="text-center">Class Distribution (Bar Chart)</h5>
          <Bar data={data} options={chartOptions} />
        </div>
        <div className="chart pie" style={{ width: '500px', height: '300px', margin: 'auto' }}>
          <h5 className="text-center">Class Distribution (Pie Chart)</h5>
          <Pie data={data} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
