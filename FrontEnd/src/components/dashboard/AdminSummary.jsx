import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard.jsx';
import {
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
  FaBuilding,
} from 'react-icons/fa';
import axios from 'axios';

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('http://localhost:5007/api/dashboard/summary', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(summary);
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white text-xl font-semibold font-[Poppins]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 sm:p-10 font-[Poppins] text-white">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-10">
        {/* Dashboard Overview Header */}
        <h3 className="text-center text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 bg-clip-text text-white drop-shadow">
          Dashboard Overview
        </h3>

        {/* Main Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            icon={<FaUsers />}
            text="Total Employees"
            number={summary.totalEmployees}
            color="bg-gradient-to-r from-purple-500 to-indigo-600"
          />
          <SummaryCard
            icon={<FaBuilding />}
            text="Total Departments"
            number={summary.totalDepartments}
            color="bg-gradient-to-r from-blue-500 to-teal-600"
          />
          <SummaryCard
            icon={<FaMoneyBillWave />}
            text="Monthly Salary"
            number={summary.totalSala}
            color="bg-gradient-to-r from-green-500 to-teal-500"
          />
        </div>

        {/* Leave Details Header */}
        <div className="mt-16">
          <h4 className="text-center text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 bg-clip-text text-white drop-shadow">
            Leave Details
          </h4>

          {/* Leave Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SummaryCard
              icon={<FaFileAlt />}
              text="Leave Applied"
              number={summary.leaveSummary.appliedFor}
              color="bg-gradient-to-r from-purple-400 to-indigo-500"
            />
            <SummaryCard
              icon={<FaCheckCircle />}
              text="Leave Approved"
              number={summary.leaveSummary.approved}
              color="bg-gradient-to-r from-green-400 to-teal-500"
            />
            <SummaryCard
              icon={<FaHourglassHalf />}
              text="Leave Pending"
              number={summary.leaveSummary.pending}
              color="bg-gradient-to-r from-yellow-400 to-orange-500"
            />
            <SummaryCard
              icon={<FaTimesCircle />}
              text="Leave Rejected"
              number={summary.leaveSummary.rejected}
              color="bg-gradient-to-r from-red-500 to-pink-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
