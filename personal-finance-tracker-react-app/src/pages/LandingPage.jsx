// src/pages/LandingPage.jsx

import React from "react";
import banner from "../assets/banner.jpg";
import expenses from "../assets/expenses.jpg";
import { FaCheckCircle, FaSun, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const financeTips = [
  "💡 Track every rupee you spend.",
  "📊 Set monthly saving goals.",
  "🧾 Categorize your expenses wisely.",
  "🔒 Secure your data. Your privacy matters.",
];

const testimonials = [
  {
    name: "Sneha Patil",
    feedback: "FinMate made my budgeting super easy. I love the clean dashboard!",
  },
  {
    name: "Amit Kulkarni",
    feedback: "I saved ₹5,000 in my first month just by tracking with FinMate!",
  },
];

// Navbar
const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={`fixed w-full px-6 py-3 flex justify-between items-center z-50 shadow-md top-0 transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-indigo-700 text-white'
      }`}>
      <div
        className="text-2xl font-bold hover:text-indigo-300 cursor-pointer"
        onClick={() => handleScroll("home")}
      >
        FinMate
      </div>

      <div className="hidden md:flex space-x-8">
        {["home", "about", "contact"].map((section, idx) => (
          <button
            key={idx}
            onClick={() => handleScroll(section)}
            className="text-indigo-200 hover:text-white transition duration-300 font-semibold capitalize"
          >
            {section}
          </button>
        ))}
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
        className={`ml-4 p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600'
          }`}
      >
        {darkMode ? (
          <FaSun className="h-6 w-6 text-yellow-400" />
        ) : (
          <FaMoon className="h-6 w-6 text-gray-200" />
        )}
      </button>
    </nav>
  );
};

// Main Component
const LandingPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen pt-20 transition-colors duration-300 flex flex-col items-center justify-start px-6 py-10 ${darkMode
        ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white'
        : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900'
        }`}
      id="home"
    >
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6 text-center md:text-left animate-fade-in">
          <h1 className={`text-4xl md:text-5xl font-extrabold leading-tight animate-pulse ${darkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
            Welcome to{" "}
            <span className="text-purple-600 dark:text-purple-400">FinMate</span> 💰
          </h1>
          <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
            Your smart financial companion to track income, expenses, and grow your savings.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 border border-purple-600 text-purple-600 bg-white rounded-xl hover:bg-purple-50 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="animate-fade-in">
          <img
            src={banner}
            alt="Finance Tracker"
            className="w-full rounded-2xl shadow-xl hover:scale-105 transition duration-500"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full max-w-6xl my-16 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
          About FinMate
        </h2>
        <p className={`mb-6 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
          FinMate helps you track income and expenses seamlessly with clear insights and saving goals.
        </p>
      </section>

      {/* Track Expenses Section */}
      <section id="expenses" className="w-full max-w-6xl my-16 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
          📈 Track Your Expenses Visually
        </h2>
        <p className={`mb-6 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
          Get clear insights into your spending with graphs and categorization. Stay informed and save better!
        </p>
        <img
          src={expenses}
          alt="Expense Tracking"
          className="mx-auto rounded-xl shadow-xl hover:scale-105 transition duration-500 max-w-3xl"
        />
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full max-w-6xl my-16 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
          Contact Us
        </h2>
        <p className={`mb-6 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
          Have questions or feedback? Reach out via <span className="font-semibold">support@finmate.com</span>.
        </p>
      </section>

      {/* Finance Tips */}
      <section className="w-full max-w-4xl mb-16 animate-fade-in">
        <h2 className="text-2xl font-semibold text-center text-purple-700 dark:text-purple-400 mb-4">
          💡 Finance Tips
        </h2>
        <div className={`p-6 rounded-xl shadow-lg space-y-2 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
          {financeTips.map((tip, index) => (
            <p key={index} className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
              {tip}
            </p>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-5xl animate-fade-in">
        <h2 className="text-2xl font-semibold text-center text-purple-700 dark:text-purple-400 mb-6">
          🌟 What Our Users Say
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl shadow hover:shadow-xl transition ${darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
            >
              <div className="flex items-center mb-2">
                <FaCheckCircle className="text-purple-600 dark:text-purple-400 mr-2" />
                <h3 className={`font-bold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>
                  {t.name}
                </h3>
              </div>
              <p className={`italic ${darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>"{t.feedback}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={`mt-20 text-center text-sm pb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
        © {new Date().getFullYear()} FinMate. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
