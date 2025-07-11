import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function SpendingChart({ transactions }) {
  const categories = ['Food', 'Bills', 'Entertainment'];
  const data = categories.map(category => 
    transactions
      .filter(t => t.type === 'Expense' && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const chartData = {
    labels: ['Food', 'Bills', 'Entertainment'],
    datasets: [
      {
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF4C6B', '#1E90FF', '#FFD700'],
        borderColor: '#2d3748',
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#f1f5f9',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#f1f5f9'
      }
    }
  };

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <div style={{ height: '400px' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}

export default SpendingChart;