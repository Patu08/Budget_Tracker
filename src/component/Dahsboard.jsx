import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const storedIncome = JSON.parse(localStorage.getItem('incomes')) || [];

    // Filter out any invalid entries
    const validExpenses = storedExpenses.filter(transaction => transaction && typeof transaction.amount === 'number');
    const validIncome = storedIncome.filter(transaction => transaction && typeof transaction.amount === 'number');

    // Calculate total expenses and income
    const totalExpenses = validExpenses.reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);
    const totalIncome = validIncome.reduce((acc, transaction) => acc + transaction.amount, 0);

    // Assuming budget is the difference between total income and total expenses
    const totalBudget = totalIncome - totalExpenses;

    setExpenses(totalExpenses);
    setIncome(totalIncome);
    setBudget(totalBudget);
    setLoading(false);
  }, []);

  // Calculate the percentage of income and expenses
  const totalAmount = income + expenses;
  const incomePercentage = totalAmount ? ((income / totalAmount) * 100).toFixed(2) : 0;
  const expensesPercentage = totalAmount ? ((expenses / totalAmount) * 100).toFixed(2) : 0;

  const chartData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount',
        data: [income, expenses],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        display: true,
        formatter: (value) => `₹${value.toFixed(2)}`,
        color: '#000',
        font: {
          weight: 'bold',
          size: 14,
        },
      },
    },
    maintainAspectRatio: false, // Disable the aspect ratio to allow manual sizing
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="mt">
          <div className="row">
            <h2 className="text-center login-title">Budget Tracker</h2>

            <div className="col-xl-4 col-sm-6 col-12">
              <div className="card shadow">
                <div className="card-content">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title widget-card-title mb-3 fw-bold">TOTAL BUDGET</h5>
                        <h2 className="card-subtitle text-body-secondary m-0 fw-bold">₹{budget.toFixed(2)}</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex align-items-center mt-3">
                          <span className="lh-1 me-3 bg-danger-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                            <i className="bi bi-arrow-right-short bsb-rotate-45"></i>
                          </span>
                          <div>
                            <p className="fs-7 mb-0 text-primary fw-bold">since last week</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12">
              <div className="card shadow">
                <div className="card-content">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title widget-card-title mb-3 fw-bold">TOTAL INCOME</h5>
                        <h2 className="card-subtitle text-body-secondary m-0 fw-bold">₹{income.toFixed(2)}</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex align-items-center mt-3">
                          <span className="lh-1 me-3 bg-danger-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                            <i className="bi bi-arrow-right-short bsb-rotate-45"></i>
                          </span>
                          <div>
                            <p className="fs-7 mb-0 text-primary fw-bold">since last week</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12">
              <div className="card shadow">
                <div className="card-content">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title widget-card-title mb-3 fw-bold">TOTAL EXPENSE</h5>
                        <h2 className="card-subtitle text-body-secondary m-0 fw-bold">₹{expenses.toFixed(2)}</h2>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <div className="lh-1 text-white bg-dark rounded-circle p-3 d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-table-columns"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex align-items-center mt-3">
                          <span className="lh-1 me-3 bg-danger-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                            <i className="bi bi-arrow-right-short bsb-rotate-45"></i>
                          </span>
                          <div>
                            <p className="fs-7 mb-0 text-primary fw-bold">since last week</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="chart1 row mt-4">
            <div className="col-12">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title mb-3">Income vs Expense</h5>
                  <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
                    <Doughnut data={chartData} options={chartOptions} />
                  </div>
                  <div className="text-center mt-3 fw-bold">
                    <p>Income: {incomePercentage}%</p>
                    <p>Expense: {expensesPercentage}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
