import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSalary = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    department: '',
    employee: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    payDate: '',
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const empRes = await axios.get('/api/employees');
        setEmployees(empRes.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/salaries', formData);
      alert('Salary record added!');
      setFormData({
        department: '',
        employee: '',
        basicSalary: '',
        allowances: '',
        deductions: '',
        payDate: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add salary!');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Add Salary</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="department"
          placeholder="Department (type manually)"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          required
        />

        <select
          name="employee"
          onChange={handleChange}
          className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          value={formData.employee}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e._id} value={e._id}>{e.name}</option>
          ))}
        </select>

        <input
          type="number"
          name="basicSalary"
          placeholder="Basic Salary"
          value={formData.basicSalary}
          onChange={handleChange}
          className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          required
        />

        <input
          type="number"
          name="allowances"
          placeholder="Allowances"
          value={formData.allowances}
          onChange={handleChange}
          className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <input
          type="number"
          name="deductions"
          placeholder="Deductions"
          value={formData.deductions}
          onChange={handleChange}
          className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <input
          type="date"
          name="payDate"
          value={formData.payDate}
          onChange={handleChange}
          className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all"
        >
          Add Salary
        </button>
      </form>
    </div>
  );
};

export default AddSalary;
