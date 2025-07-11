import React from 'react';
import axios from 'axios';

function TransactionList({ transactions, fetchTransactions }) {
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id} className={transaction.type.toLowerCase()}>
            <div>
              <h3>{transaction.description}</h3>
              <p>
                ${transaction.amount.toFixed(2)} | {transaction.category} | {transaction.type} | {transaction.date}
              </p>
            </div>
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="delete"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;