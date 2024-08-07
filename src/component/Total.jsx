import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Total() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const storedIncome = JSON.parse(localStorage.getItem('incomes')) || [];
    const combinedTransactions = [...storedExpenses, ...storedIncome].filter(Boolean);

    setTransactions(combinedTransactions);
    setLoading(false);
  }, []);

  const handleEdit = (id) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      navigate('/addfinance', { state: { transaction, id } });
    } else {
      console.error('Transaction not found for editing');
    }
  };

  const handleDelete = (id) => {
    const isExpense = transactions.find(t => t.id === id)?.amount < 0;
    const storageKey = isExpense ? 'expenses' : 'incomes';

    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);

    localStorage.setItem(storageKey, JSON.stringify(updatedTransactions.filter(t => t.amount < 0 === isExpense)));
  };

  return (
    <>
      <h2 className="text-center login-title">Transactions</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table table-striped shadow mt-4">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id || index}>
                <td>{index + 1}</td>
                <td>{transaction.date || 'N/A'}</td>
                <td>{transaction.category || 'N/A'}</td>
                <td>{transaction.amount || 'N/A'}</td>
                <td>{transaction.note || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(transaction.id)}
                  >
                    <i class="fa-solid fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
