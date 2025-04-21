import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="h-screen w-full flex font-[Poppins] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Sidebar */}
      <div className="w-64 h-full fixed top-0 left-0 z-10 bg-[#1e1e2f] shadow-2xl rounded-r-2xl backdrop-blur-lg border-r border-white/10">
        <AdminSidebar />
      </div>

      {/* Main Section */}
      <div className="ml-64 flex-1 h-full overflow-y-auto">
        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
