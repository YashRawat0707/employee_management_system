import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/authContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5007/api/auth/login", { email, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate('/admin-dashboard');
        } else {
          navigate('/employee-dashboard');
        }
      }
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Login Failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl animate-fade-in text-white font-[Poppins]">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Login to EMS
        </h2>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1 w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1 w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-pink-500" />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-pink-400 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 hover:brightness-110 text-white font-semibold rounded-lg transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        {/* Register Redirect */}
        <div className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate('/register')}
            className="text-pink-400 hover:underline font-medium"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
