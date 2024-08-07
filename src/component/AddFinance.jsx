import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AddFinance() {
  const location = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [transactionType, setTransactionType] = useState('expense');
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({
    date: '',
    category: '',
    amount: '',
    note: ''
  });

  useEffect(() => {
    if (location.state) {
      const { transaction, id } = location.state;
      setDate(transaction.date);
      setCategory(transaction.category);
      setAmount(Math.abs(transaction.amount));
      setNote(transaction.note);
      setTransactionType(transaction.amount < 0 ? 'expense' : 'income');
      setEditId(id);
    }
  }, [location.state]);

  const validate = () => {
    const newErrors = {
      date: '',
      category: '',
      amount: '',
      note: ''
    };

    if (!date) newErrors.date = 'Date is required';
    if (!category) newErrors.category = 'Category is required';
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) newErrors.amount = 'Amount must be a positive number';
    if (note.length > 255) newErrors.note = 'Note cannot exceed 255 characters';

    setErrors(newErrors);

    // Return true if no errors, false otherwise
    return Object.values(newErrors).every(error => !error);
  };

  const handleSubmit = () => {
    if (!validate()) return; // Stop submission if validation fails

    let numericAmount = parseFloat(amount);

    if (transactionType === 'expense') {
      numericAmount = -Math.abs(numericAmount);
    } else {
      numericAmount = Math.abs(numericAmount);
    }

    const transaction = {
      id: editId || Date.now(), // Use a unique ID or generate a new one
      date,
      category,
      amount: numericAmount,
      note
    };

    const storageKey = transactionType === 'expense' ? 'expenses' : 'incomes';
    const existingTransactions = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (editId) {
      // Update the existing transaction by ID
      const updatedTransactions = existingTransactions.map(t =>
        t.id === editId ? transaction : t
      );
      localStorage.setItem(storageKey, JSON.stringify(updatedTransactions));
    } else {
      // Add a new transaction
      existingTransactions.push(transaction);
      localStorage.setItem(storageKey, JSON.stringify(existingTransactions));
    }

    // Redirect to the Total page
    navigate('/total');
  };

  return (
    <div>
      <h2 className="text-center login-title">{editId !== null ? 'Edit Transaction' : 'Add Transaction'}</h2>

      <div className="row mb-3">
        <div className="col">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="transactionType"
              id="expense"
              value="expense"
              checked={transactionType === 'expense'}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="expense">
              Expense
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="transactionType"
              id="income"
              value="income"
              checked={transactionType === 'income'}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="income">
              Income
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-8 col-sm-8 form-floating">
          <input
            type="date"
            className="form-control shadow"
            autoComplete="off"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label className="form-label mx-3"><b>Date</b></label>
          {errors.date && <div className="text-danger">{errors.date}</div>}
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4 form-floating mb-3">
          <select
            className="form-select shadow"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=""></option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Personal">Personal</option>
            <option value="Salary">Salary</option>
            <option value="Investments">Investments</option>
            <option value="Rental Income">Rental Income</option>
            <option value="Business Income">Business Income</option>
          </select>
          <label className="form-label mx-3"><b>Category</b></label>
          {errors.category && <div className="text-danger">{errors.category}</div>}
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 form-floating">
          <input
            type="text"
            placeholder="Enter Amount"
            className="form-control shadow"
            autoComplete="off"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label className="form-label mx-3"><b>Amount</b></label>
          {errors.amount && <div className="text-danger">{errors.amount}</div>}
        </div>
      </div><br />
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4 form-floating">
          <input
            type="text"
            placeholder="Enter Note"
            className="form-control shadow"
            autoComplete="off"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <label className="form-label mx-3"><b>Note</b></label>
          {errors.note && <div className="text-danger">{errors.note}</div>}
        </div>
      </div> <br />

      <button className="btn btn-success shadow mt-4" onClick={handleSubmit}>{editId !== null ? 'Update' : 'Submit'}</button>
    </div>
  );
}
