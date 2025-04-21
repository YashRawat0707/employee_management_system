import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex items-center bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl font-[Poppins]">
      {/* Icon Section */}
      <div className={`text-4xl flex justify-center items-center ${color} text-white px-6 py-6 rounded-l-2xl`}>
        {icon}
      </div>

      {/* Text Section */}
      <div className="pl-6 py-4">
        <p className="text-lg font-semibold text-white drop-shadow-sm">
          {text}
        </p>
        <p className="text-3xl font-extrabold text-white drop-shadow-md">
          {number}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
