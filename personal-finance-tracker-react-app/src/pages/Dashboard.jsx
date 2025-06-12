import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaBars,
  FaUser,
  FaCog,
  FaChartPie,
  FaExchangeAlt,
  FaWallet,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import logo from "../assets/logo.png";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currency, setCurrency] = useState("INR");
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "food",
    type: "income",
  });
  const [editIndex, setEditIndex] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaChartPie /> },
    { id: "transactions", label: "Transactions", icon: <FaExchangeAlt /> },
    { id: "insights", label: "Spending Insights", icon: <FaChartPie /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expenses")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const totalBalance = totalIncome - totalExpenses;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    if (editIndex !== null) {
      const updated = [...transactions];
      updated[editIndex] = { ...formData, date: new Date().toLocaleDateString() };
      setTransactions(updated);
      setEditIndex(null);
    } else {
      setTransactions([
        ...transactions,
        { ...formData, date: new Date().toLocaleDateString() },
      ]);
    }
    setFormData({ description: "", amount: "", category: "food", type: "income" });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const tx = transactions[index];
    setFormData(tx);
    setShowForm(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...transactions];
    updated.splice(index, 1);
    setTransactions(updated);
  };

  const pieData = [
    { name: "Food", value: sumByCategory("food") },
    { name: "Transport", value: sumByCategory("transport") },
    { name: "Utilities", value: sumByCategory("utilities") },
    { name: "Entertainment", value: sumByCategory("entertainment") },
    { name: "Other", value: sumByCategory("other") },
  ];

  function sumByCategory(cat) {
    return transactions
      .filter((t) => t.category === cat && t.type === "expenses")
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  }

  const barData = [
    {
      name: "Summary",
      Income: totalIncome,
      Expenses: totalExpenses,
    },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isOpen ? 220 : 70 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 shadow-lg p-4 flex flex-col"
      >
        <div className="flex items-center space-x-2 mb-6">
          <img src={logo} alt="FinMate Logo" className="w-8 h-8" />
          {isOpen && <span className="text-xl font-bold text-purple-600">FinMate</span>}
        </div>
        <button onClick={toggleSidebar} className="mb-6 focus:outline-none">
          <FaBars />
        </button>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 w-full py-2 px-3 rounded-lg transition hover:bg-purple-100 dark:hover:bg-gray-700 ${
                activeTab === item.id ? "bg-purple-200 dark:bg-gray-700" : ""
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-2xl font-bold">
              Welcome, {currentUser?.displayName || "User"}!
            </h1>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Continue your journey to financial success
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2">
                  <FaWallet className="text-purple-500" />
                  <h2 className="text-lg font-semibold">Total Balance</h2>
                </div>
                <p className="mt-2 text-2xl font-bold">
                  ₹{totalBalance.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2">
                  <FaArrowDown className="text-green-500" />
                  <h2 className="text-lg font-semibold">Income</h2>
                </div>
                <p className="mt-2 text-2xl font-bold">
                  ₹{totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2">
                  <FaArrowUp className="text-red-500" />
                  <h2 className="text-lg font-semibold">Expenses</h2>
                </div>
                <p className="mt-2 text-2xl font-bold">
                  ₹{totalExpenses.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="font-bold mb-2">Expenses Categories Overview</h3>
                <PieChart width={300} height={300}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="font-bold mb-2">Income vs Expenses</h3>
                <BarChart width={300} height={300} data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Income" fill="#82ca9d" />
                  <Bar dataKey="Expenses" fill="#ff8042" />
                </BarChart>
              </div>
            </div>
          </>
        )}

        {activeTab === "transactions" && (
          <>
            <h2 className="text-xl font-bold mb-2">Transactions</h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Manage your financial transactions.
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="mb-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              + Add Transaction
            </button>

            {showForm && (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6"
              >
                <h3 className="font-bold text-lg">Add New Transaction</h3>
                <div>
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter transaction description"
                    className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded"
                  />
                </div>
                <div>
                  <label>Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded"
                  />
                </div>
                <div>
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white dark:bg-gray-700 rounded"
                  >
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="utilities">Utilities</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label>Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white dark:bg-gray-700 rounded"
                  >
                    <option value="income">Income</option>
                    <option value="expenses">Expenses</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditIndex(null);
                      setFormData({ description: "", amount: "", category: "food", type: "income" });
                    }}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {editIndex !== null ? "Update" : "Add"} Transaction
                  </button>
                </div>
              </form>
            )}

            <h3 className="text-lg font-bold mb-2">Transaction History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Category</th>
                    <th className="p-2 text-left">Amount</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-2">{tx.date}</td>
                      <td className="p-2">{tx.description}</td>
                      <td className="p-2 capitalize">{tx.category}</td>
                      <td className="p-2">₹{tx.amount}</td>
                      <td className="p-2 space-x-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "settings" && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md space-y-4">
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                type="text"
                value={currentUser?.displayName}
                readOnly
                className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                value={currentUser?.email}
                readOnly
                className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 p-2 rounded mt-1"
              >
                <option value="INR">INR - ₹</option>
                <option value="USD">USD - $</option>
                <option value="EUR">EUR - €</option>
              </select>
            </div>

            <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded">
              Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
