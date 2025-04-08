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
      const res = await fetch("http://localhost:5000/api/employees", {
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
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Marketing / HR / Engineering"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default Add;
