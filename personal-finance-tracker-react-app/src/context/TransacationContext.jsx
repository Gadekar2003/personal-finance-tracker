import React, { createContext, useContext, useState } from "react";

// Create a context
const TransactionContext = createContext();

// Create a custom hook
export const useTransactionContext = () => useContext(TransactionContext);

// Create a provider component
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((txn) => (txn.id === id ? { ...txn, ...updatedTransaction } : txn))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((txn) => txn.id !== id));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
