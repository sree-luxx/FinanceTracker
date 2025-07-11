import React, { useState } from 'react';
import axios from 'axios';

function TransactionForm({ fetchTransactions }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState('Expense');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || !date) {
      setError('Please fill in all required fields');
      return;
    }
    if (amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/transactions', {
        description,
        amount: parseFloat(amount),
        category,
        type,
        date
      });
      setDescription('');
      setAmount('');
      setCategory('Food');
      setType('Expense');
      setDate('');
      setError('');
      fetchTransactions();
    } catch (error) {
      setError('Failed to add transaction');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Transaction</h2>
      {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          step="0.01"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Bills">Bills</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" className="add">Add Transaction</button>
      </form>
    </div>
  );
}

export default TransactionForm;