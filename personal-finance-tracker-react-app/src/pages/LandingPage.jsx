// src/pages/LandingPage.jsx

import React, { useState, useEffect } from "react";
import banner from "../assets/banner.jpg";
import expenses from "../assets/expenses.jpg";
import { FaCheckCircle } from "react-icons/fa";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

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
const Navbar = ({ darkMode, toggleDarkMode }) => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed w-full bg-indigo-700 text-white px-6 py-3 flex justify-between items-center z-50 shadow-md top-0">
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
        className="ml-4 p-2 rounded hover:bg-indigo-600 transition"
      >
        {darkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-400" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-200" />
        )}
      </button>
    </nav>
  );
};

// Main Component
const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode ? storedMode === "true" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className="min-h-screen pt-20 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 flex flex-col items-center justify-start px-6 py-10 transition-colors duration-500"
      id="home"
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <section className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6 text-center md:text-left animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight animate-pulse">
            Welcome to{" "}
            <span className="text-purple-600 dark:text-purple-400">FinMate</span> 💰
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
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
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
          FinMate helps you track income and expenses seamlessly with clear insights and saving goals.
        </p>
      </section>

      {/* Track Expenses Section */}
      <section id="expenses" className="w-full max-w-6xl my-16 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
          📈 Track Your Expenses Visually
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
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
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
          Have questions or feedback? Reach out via <span className="font-semibold">support@finmate.com</span>.
        </p>
      </section>

      {/* Finance Tips */}
      <section className="w-full max-w-4xl mb-16 animate-fade-in">
        <h2 className="text-2xl font-semibold text-center text-purple-700 dark:text-purple-400 mb-4">
          💡 Finance Tips
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-2">
          {financeTips.map((tip, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300 text-center">
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
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition"
            >
              <div className="flex items-center mb-2">
                <FaCheckCircle className="text-purple-600 dark:text-purple-400 mr-2" />
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                  {t.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">“{t.feedback}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-gray-500 dark:text-gray-400 pb-6">
        © {new Date().getFullYear()} FinMate. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
