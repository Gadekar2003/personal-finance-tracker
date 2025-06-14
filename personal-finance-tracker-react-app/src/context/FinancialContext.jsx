import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FinancialContext = createContext();

export const useFinancial = () => {
  return useContext(FinancialContext);
};

export const FinancialProvider = ({ children }) => {
  const { user } = useAuth();
  const [financialData, setFinancialData] = useState({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savings: 0,
    recentTransactions: [],
    categories: {
      income: ["Salary", "Freelance", "Investments", "Other"],
      expense: ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"]
    }
  });

  // Load user's financial data when user changes
  useEffect(() => {
    if (user) {
      const allFinancialData = JSON.parse(localStorage.getItem('financialData') || '{}');
      const userData = allFinancialData[user.id] || financialData;
      setFinancialData(userData);
    }
  }, [user]);

  // Save financial data whenever it changes
  useEffect(() => {
    if (user) {
      const allFinancialData = JSON.parse(localStorage.getItem('financialData') || '{}');
      allFinancialData[user.id] = financialData;
      localStorage.setItem('financialData', JSON.stringify(allFinancialData));
    }
  }, [financialData, user]);

  const addTransaction = (transaction) => {
    setFinancialData(prev => {
      const newTransactions = [...prev.recentTransactions, {
        ...transaction,
        id: Date.now().toString(),
        date: new Date().toISOString()
      }];

      // Calculate new totals
      const newMonthlyIncome = newTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const newMonthlyExpenses = newTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        ...prev,
        recentTransactions: newTransactions,
        monthlyIncome: newMonthlyIncome,
        monthlyExpenses: newMonthlyExpenses,
        savings: newMonthlyIncome - newMonthlyExpenses
      };
    });
  };

  const deleteTransaction = (transactionId) => {
    setFinancialData(prev => {
      const newTransactions = prev.recentTransactions.filter(t => t.id !== transactionId);

      // Recalculate totals
      const newMonthlyIncome = newTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const newMonthlyExpenses = newTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        ...prev,
        recentTransactions: newTransactions,
        monthlyIncome: newMonthlyIncome,
        monthlyExpenses: newMonthlyExpenses,
        savings: newMonthlyIncome - newMonthlyExpenses
      };
    });
  };

  const updateTransaction = (transactionId, updatedTransaction) => {
    setFinancialData(prev => {
      const newTransactions = prev.recentTransactions.map(t =>
        t.id === transactionId ? { ...t, ...updatedTransaction } : t
      );

      // Recalculate totals
      const newMonthlyIncome = newTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const newMonthlyExpenses = newTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        ...prev,
        recentTransactions: newTransactions,
        monthlyIncome: newMonthlyIncome,
        monthlyExpenses: newMonthlyExpenses,
        savings: newMonthlyIncome - newMonthlyExpenses
      };
    });
  };

  const value = {
    financialData,
    addTransaction,
    deleteTransaction,
    updateTransaction
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
}; 