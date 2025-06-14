import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = (email, password) => {
    try {
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password, // In a real app, this should be hashed
        createdAt: new Date().toISOString()
      };

      // Add new user to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Initialize user's financial data
      const allFinancialData = JSON.parse(localStorage.getItem('financialData') || '{}');
      allFinancialData[newUser.id] = {
        monthlyIncome: 0,
        monthlyExpenses: 0,
        savings: 0,
        recentTransactions: [],
        categories: {
          income: ["Salary", "Freelance", "Investments", "Other"],
          expense: ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"]
        }
      };
      localStorage.setItem('financialData', JSON.stringify(allFinancialData));

      // Set current user
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  const signin = (email, password) => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Find user with matching email and password
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Set current user
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));

      return { success: true };
    } catch (error) {
      console.error('Signin error:', error);
      return { success: false, error: error.message };
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = {
    user,
    signup,
    signin,
    signout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
