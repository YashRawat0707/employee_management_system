import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers
} from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="bg-gradient-to-b from-purple-700 to-blue-500 text-white h-screen fixed left-0 top-0 bottom-0 w-64 shadow-xl">
      {/* Sidebar Header */}
      <div className="bg-white text-gray-800 h-16 flex items-center justify-center shadow-md">
        <h3 className="text-2xl font-bold font-[Poppins]">Employee MS</h3>
      </div>

      {/* Sidebar Links */}
      <div className="mt-4 space-y-2">
        <NavLink
          to="/admin-dashboard"
          end // ✅ This makes sure only exact path matches for Dashboard
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-6 rounded-lg transition-all ${
              isActive ? "bg-white text-gray-800 font-semibold shadow-md" : "hover:bg-white hover:text-gray-900"
            }`
          }
        >
          <span className="text-xl"><FaTachometerAlt /></span>
          <span className="text-lg font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-6 rounded-lg transition-all ${
              isActive ? "bg-white text-gray-800 font-semibold shadow-md" : "hover:bg-white hover:text-gray-900"
            }`
          }
        >
          <span className="text-xl"><FaUsers /></span>
          <span className="text-lg font-medium">Employee</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-6 rounded-lg transition-all ${
              isActive ? "bg-white text-gray-800 font-semibold shadow-md" : "hover:bg-white hover:text-gray-900"
            }`
          }
        >
          <span className="text-xl"><FaBuilding /></span>
          <span className="text-lg font-medium">Department</span>
        </NavLink>

        <NavLink
          to="/admin-leave"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-6 rounded-lg transition-all ${
              isActive ? "bg-white text-gray-800 font-semibold shadow-md" : "hover:bg-white hover:text-gray-900"
            }`
          }
        >
          <span className="text-xl"><FaCalendarAlt /></span>
          <span className="text-lg font-medium">Leave</span>
        </NavLink>

        <NavLink
          to="/admin-salary"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-6 rounded-lg transition-all ${
              isActive ? "bg-white text-gray-800 font-semibold shadow-md" : "hover:bg-white hover:text-gray-900"
            }`
          }
        >
          <span className="text-xl"><FaMoneyBillWave /></span>
          <span className="text-lg font-medium">Salary</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
