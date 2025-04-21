import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: '', otp: '', newPassword: '' });
  const navigate = useNavigate();  // Initialize navigate

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const sendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5007/api/auth/send-otp', { email: form.email });
      alert(res.data.message);
      setStep(2);
    } catch (err) {
      alert('Error sending OTP');
    }
  };

  const resetPassword = async () => {
    try {
      const res = await axios.post('http://localhost:5007/api/auth/reset-password', {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword,
      });
      alert(res.data.message);
      navigate('/login');  // Redirect to login page after successful password reset
    } catch (err) {
      alert('Reset failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-400">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 font-[Poppins]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {step === 1 ? (
            <>
              <div>
                <label className="block text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                  required
                />
              </div>
              <button
                onClick={sendOtp}
                className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-700 font-semibold">OTP</label>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={form.otp}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                  required
                />
              </div>
              <button
                onClick={resetPassword}
                className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
              >
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
