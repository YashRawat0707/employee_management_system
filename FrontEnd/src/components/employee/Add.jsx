import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    image: "",
    name: "",
    dob: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.image || !form.name || !form.dob || !form.department) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5007/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("✅ Employee added successfully!");
        navigate("/admin-dashboard/employees");
      } else {
        alert("❌ Error adding employee.");
      }
    } catch (err) {
      console.error(err);
      alert("🚨 Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl animate-fade-in text-white font-[Poppins]">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Add New Employee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-200">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              required
              className="mt-1 w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Employee Name"
              required
              className="mt-1 w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-200">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
              className="mt-1 w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-200">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Marketing / HR / Engineering"
              required
              className="mt-1 w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
            />
          </div>

          {/* Add Employee Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 hover:brightness-110 text-white font-semibold rounded-lg transition duration-300 shadow-md"
          >
            Add Employee
          </button>
        </form>

        {/* Redirect to Employees Page */}
        <div className="text-center text-sm text-gray-400 mt-6">
          <button
            onClick={() => navigate('/admin-dashboard/employees')}
            className="text-pink-400 hover:underline font-medium"
          >
            Back to Employee List
          </button>
        </div>
      </div>
    </div>
  );
}

export default Add;
