import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useFinancial } from "../context/FinancialContext";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaBell,
  FaPlus,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaWallet,
  FaPiggyBank,
  FaChartBar,
  FaTimes,
  FaMoneyBillWave,
  FaCreditCard,
  FaExchangeAlt,
  FaSun,
  FaMoon,
  FaEdit,
  FaTrash
} from "react-icons/fa";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { currentUser, signout, user } = useAuth();
  const { financialData, addTransaction, deleteTransaction, updateTransaction } = useFinancial();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Ensure we have numbers for calculations
  const monthlyIncome = Number(financialData?.monthlyIncome) || 0;
  const monthlyExpenses = Number(financialData?.monthlyExpenses) || 0;
  const savings = Number(financialData?.savings) || 0;
  const totalBalance = monthlyIncome - monthlyExpenses;

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Add this function to calculate category totals from transactions
  const calculateCategoryTotals = () => {
    const categoryTotals = {
      food: 0,
      transportation: 0,
      entertainment: 0,
      shopping: 0,
      bills: 0,
      others: 0
    };

    // Sum up expenses by category from transactions
    financialData?.recentTransactions?.forEach(transaction => {
      if (transaction.type === 'expense' && transaction.category) {
        categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + Number(transaction.amount);
      }
    });

    return [
      { name: 'Food & Dining', value: categoryTotals.food },
      { name: 'Transportation', value: categoryTotals.transportation },
      { name: 'Entertainment', value: categoryTotals.entertainment },
      { name: 'Shopping', value: categoryTotals.shopping },
      { name: 'Bills & Utilities', value: categoryTotals.bills },
      { name: 'Others', value: categoryTotals.others }
    ].filter(item => item.value > 0);
  };

  // Prepare data for the pie chart
  const pieChartData = calculateCategoryTotals();

  const handleLogout = async () => {
    try {
      signout();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, newTransaction);
      setEditingTransaction(null);
    } else {
      addTransaction(newTransaction);
    }
    setNewTransaction({
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setNewTransaction({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      date: transaction.date
    });
  };

  const handleDelete = (transactionId) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(transactionId);
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: FaHome },
    { id: "transactions", label: "Transactions", icon: FaWallet },
    { id: "insights", label: "Financial Insights", icon: FaChartBar },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Total Balance Card */}
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Total Balance
              </h3>
              <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <FaWallet className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
            </div>
            <p className={`text-3xl font-bold ${totalBalance >= 0 ? darkMode ? 'text-green-400' : 'text-green-600' : darkMode ? 'text-red-400' : 'text-red-600'}`}>
              ₹{totalBalance.toFixed(2)}
            </p>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {totalBalance >= 0 ? 'Positive Balance' : 'Negative Balance'}
            </p>
          </div>

          {/* Monthly Income Card */}
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Monthly Income
              </h3>
              <div className={`p-3 rounded-full ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                <FaArrowUp className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
            </div>
            <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ₹{monthlyIncome.toFixed(2)}
            </p>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Total Income This Month
            </p>
          </div>

          {/* Monthly Expenses Card */}
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Monthly Expenses
              </h3>
              <div className={`p-3 rounded-full ${darkMode ? 'bg-red-900' : 'bg-red-100'}`}>
                <FaArrowDown className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
              </div>
            </div>
            <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ₹{monthlyExpenses.toFixed(2)}
            </p>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Total Expenses This Month
            </p>
          </div>

          {/* Savings Card */}
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Savings
              </h3>
              <div className={`p-3 rounded-full ${darkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
                <FaPiggyBank className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
            </div>
            <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ₹{savings.toFixed(2)}
            </p>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Total Savings This Month
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart for Categories */}
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Expenses by Category
            </h3>
            <div className="h-80">
              {pieChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, value }) => `${name}: ₹${value.toFixed(2)}`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `₹${value.toFixed(2)}`}
                      contentStyle={{
                        backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        color: darkMode ? '#FFFFFF' : '#000000'
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => (
                        <span style={{ color: darkMode ? '#FFFFFF' : '#000000' }}>
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className={`h-full flex items-center justify-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No expense data available
                </div>
              )}
            </div>
          </div>

          {/* Bar Chart for Monthly Data */}
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Monthly Overview
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Income', amount: monthlyIncome },
                    { name: 'Expenses', amount: monthlyExpenses }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => `₹${value}`}
                    contentStyle={{
                      backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      color: darkMode ? '#FFFFFF' : '#000000'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTransactions = () => {
    return (
      <div className="space-y-6">
        {/* Add Transaction Form */}
        <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
          </h3>
          <form onSubmit={handleTransactionSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Type
                </label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                  className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                  required
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Amount
                </label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category
                </label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="food">Food & Dining</option>
                  <option value="transportation">Transportation</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="shopping">Shopping</option>
                  <option value="bills">Bills & Utilities</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Date
                </label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                  required
                />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <input
                type="text"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                placeholder="Enter description"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              {editingTransaction && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingTransaction(null);
                    setNewTransaction({
                      type: 'expense',
                      amount: '',
                      category: '',
                      description: '',
                      date: new Date().toISOString().split('T')[0]
                    });
                  }}
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
              >
                {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
              </button>
            </div>
          </form>
        </div>

        {/* Transaction History */}
        <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Transaction History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Description</th>
                  <th className="text-right p-2">Amount</th>
                  <th className="text-center p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {financialData?.recentTransactions?.length > 0 ? (
                  financialData.recentTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                      <td className={`p-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className={`p-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${transaction.type === 'income'
                            ? darkMode
                              ? 'bg-green-900 text-green-300'
                              : 'bg-green-100 text-green-800'
                            : darkMode
                              ? 'bg-red-900 text-red-300'
                              : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className={`p-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {transaction.category}
                      </td>
                      <td className={`p-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {transaction.description}
                      </td>
                      <td className={`p-2 text-right ${transaction.type === 'income'
                        ? darkMode ? 'text-green-400' : 'text-green-600'
                        : darkMode ? 'text-red-400' : 'text-red-600'
                        }`}>
                        ₹{Number(transaction.amount).toFixed(2)}
                      </td>
                      <td className="p-2">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(transaction)}
                            className={`p-1 rounded ${darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-600 hover:bg-gray-100'
                              }`}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className={`p-1 rounded ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'
                              }`}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={`text-center p-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderFinancialInsights = () => {
    // Calculate savings rate
    const savingsRate = monthlyIncome > 0
      ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100
      : 0;

    return (
      <div className="space-y-6">
        {/* Income vs Expenses Chart */}
        <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Income vs Expenses
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Income', value: monthlyIncome },
                  { name: 'Expenses', value: monthlyExpenses }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `₹${value}`}
                  contentStyle={{
                    backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    color: darkMode ? '#FFFFFF' : '#000000'
                  }}
                />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Rate */}
        <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Savings Rate
          </h3>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className={`${savingsRate >= 0 ? 'text-green-500' : 'text-red-500'}`}
                  strokeWidth="10"
                  strokeDasharray={`${Math.abs(savingsRate) * 2.51} 251.2`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${savingsRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {savingsRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
          <p className={`text-center mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {savingsRate >= 0
              ? 'You are saving money!'
              : 'You are spending more than your income'}
          </p>
        </div>

        {/* Category Breakdown */}
        <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Category Breakdown
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, value }) => `${name}: ₹${value}`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `₹${value}`}
                  contentStyle={{
                    backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    color: darkMode ? '#FFFFFF' : '#000000'
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span style={{ color: darkMode ? '#FFFFFF' : '#000000' }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="space-y-6">
        <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Account Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-500'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Display Name
              </label>
              <input
                type="text"
                value={user?.displayName || ''}
                className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                placeholder="Enter display name"
              />
            </div>
            <button
              className={`w-full py-2 px-4 rounded-lg font-medium ${darkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
            >
              Update Profile
            </button>
          </div>
        </div>

        <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Dark Mode
              </span>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {darkMode ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-30`}>
        <div className="p-6">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>FinMate</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ${activeSection === item.id
                ? darkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-purple-100 text-purple-600'
                : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Header */}
        <header className={`sticky top-0 z-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <FaBars className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {darkMode ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <FaUser className="w-6 h-6" />
                  <span>{user?.email}</span>
                </button>

                {showProfileMenu && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className={`flex items-center w-full px-4 py-2 text-left ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FaSignOutAlt className="w-5 h-5 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="space-y-6">
            {activeSection === "dashboard" && renderDashboard()}
            {activeSection === "transactions" && renderTransactions()}
            {activeSection === "insights" && renderFinancialInsights()}
            {activeSection === "settings" && renderSettings()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 