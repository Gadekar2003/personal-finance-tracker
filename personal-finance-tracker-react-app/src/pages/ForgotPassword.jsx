import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { FaKey, FaEnvelope } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset email sent! Check your inbox.");
      setEmail("");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 px-4 py-12">
      <ToastContainer />
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl max-w-md w-full space-y-8">
        {/* Key Icon */}
        <div className="flex justify-center">
          <FaKey className="text-purple-600 dark:text-purple-400 text-6xl animate-pulse" />
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Forgot Password?
        </h2>

        {/* Subheading */}
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Enter your email to reset your password
        </p>

        {/* Form */}
        <form onSubmit={handleReset} className="space-y-6">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
          >
            Email address:
          </label>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        {/* Links */}
        <div className="text-center text-gray-600 dark:text-gray-300">
          <Link
            to="/login"
            className="text-purple-600 hover:underline font-semibold mx-1"
          >
            Back to Login
          </Link>
          <span> | </span>
          <Link
            to="/signup"
            className="text-purple-600 hover:underline font-semibold mx-1"
          >
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
