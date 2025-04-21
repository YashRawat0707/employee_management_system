import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white h-screen fixed left-0 top-0 w-64 shadow-xl z-50">
      {/* Sidebar Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 h-20 flex items-center justify-center shadow-md">
        <h3 className="text-2xl font-bold font-[Poppins] bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Employee MS
        </h3>
      </div>

      {/* Sidebar Links */}
      <div className="mt-4 px-4 space-y-3 font-[Poppins]">
        {[
          { to: "/admin-dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
          { to: "/admin-dashboard/employees", label: "Employee", icon: <FaUsers /> },
          { to: "/admin-dashboard/departments", label: "Department", icon: <FaBuilding /> },
          { to: "/admin-dashboard/salary", label: "Salary", icon: <FaMoneyBillWave /> },
          { to: "/admin-dashboard/leaves", label: "Leaves", icon: <FaCalendarAlt /> },
          { to: "/admin-dashboard/performance", label: "Performance", icon: <FaChartLine /> },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-white/20 text-white font-semibold shadow-md"
                  : "hover:bg-white/10 hover:text-gray-100"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-lg">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
