import React, { useState } from 'react';
import axios from 'axios';
import {useAuth} from "../context/authContext";
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState(null);
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if(response.data.success){
            login(response.data.user);
            localStorage.setItem("token",response.data.token);
            if(response.data.user.role === "admin"){
                  navigate('/admin-dashboard');
            }
            else{
                  navigate('employee-dashboard');
            }
      }
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Login Failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-400">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 font-[Poppins]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Employee Management System
        </h2>
        {error && <p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email} // ✅ Controlled component fix
              placeholder="Enter Your Email"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password} // ✅ Controlled component fix
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-purple-600" />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-purple-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
