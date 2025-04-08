import React from 'react'
import SummaryCard from './SummaryCard.jsx'
import { FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers, FaBuilding } from 'react-icons/fa'

const AdminSummary = () => {
  return (
    <div className="p-6 font-[Poppins]">
      <h3 className="text-3xl font-bold text-gray-800 text-center">Dashboard Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={13} color="bg-purple-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={13} color="bg-blue-600"/>
        <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number="$2500" color="bg-green-600"/>
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold text-gray-800">Leave Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={5} color="bg-purple-500" />
          <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={5} color="bg-green-500" />
          <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={5} color="bg-yellow-500" />
          <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={5} color="bg-red-500" />
        </div>
      </div>
    </div>
  )
}

export default AdminSummary;
