import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SpendingChart from './components/SpendingChart';
import './index.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <img src="%PUBLIC_URL%/logo.png" alt="Logo" />
        <h1>Personal Finance Tracker</h1>
      </div>
      <TransactionForm fetchTransactions={fetchTransactions} />
      <SpendingChart transactions={transactions} />
      <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} />
    </div>
  );
}

export default App;