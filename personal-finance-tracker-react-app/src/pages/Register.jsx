import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { darkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to create an account");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${darkMode
        ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900"
        : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
        }`}
    >
      <div
        className={`p-8 rounded-xl shadow-2xl w-full max-w-md ${darkMode ? "bg-gray-800" : "bg-white"
          }`}
      >
        <h2
          className={`text-3xl font-bold text-center mb-8 ${darkMode ? "text-white" : "text-gray-800"
            }`}
        >
          Create an Account
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`mt-1 block w-full rounded-md ${darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 block w-full rounded-md ${darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`mt-1 block w-full rounded-md ${darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <div
          className={`mt-6 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-600"
            }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
