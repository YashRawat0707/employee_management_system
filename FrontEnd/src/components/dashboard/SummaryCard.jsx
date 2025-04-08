import React from 'react'

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex items-center bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all hover:scale-105">
      <div className={`text-3xl flex justify-center items-center ${color} text-white px-6 py-4`}>
        {icon}
      </div>
      <div className="pl-6 py-4">
        <p className="text-lg font-semibold text-gray-700">{text}</p>
        <p className="text-2xl font-bold text-gray-900">{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard;
