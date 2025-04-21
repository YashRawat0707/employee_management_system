import React from 'react';
import { useAuth } from '../../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 text-white py-4 px-6 flex items-center justify-between shadow-xl font-[Poppins]">
      {/* Welcome Message */}
      <p className="text-xl sm:text-2xl font-semibold text-white drop-shadow-md">
        Welcome {user ? user.name : "Guest"}
      </p>

      {/* Logout Button */}
      <button
        className="bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:from-purple-600 hover:to-indigo-500 transform hover:scale-105 transition-all duration-300 shadow-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
