import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  const { user } = useAuth()

  return (
    <div className='h-screen'>
      {/* Sidebar - fixed to the left */}
      <div className="fixed w-64 h-full bg-white shadow-md z-10">
        <AdminSidebar />
      </div>

      {/* Main Content - shifted to the right by 64 (16rem) */}
      <div className="ml-64 h-full overflow-y-auto">
        <Navbar />
        <div className="p-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
