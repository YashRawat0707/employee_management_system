import React from 'react';
import { useAuth } from '../../context/authContext.jsx';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-400 text-white py-3 px-6 flex items-center justify-between shadow-md font-[Poppins]">
      <p className="text-lg font-semibold">Welcome {user ? user.name : "Guest"}</p>
      <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
