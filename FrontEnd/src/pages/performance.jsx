import React from 'react';

const PerformancePage = () => {
  return (
    <div className="min-h-screen flex flex-col p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-[Poppins] text-white">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Employee Performance
        </h2>
        <button className="bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
          Export Data
        </button>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold text-white">Overall Rating</h3>
          <p className="text-4xl font-extrabold text-green-400 mt-2">85%</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold text-white">Completed Tasks</h3>
          <p className="text-4xl font-extrabold text-blue-400 mt-2">120</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold text-white">Pending Tasks</h3>
          <p className="text-4xl font-extrabold text-yellow-400 mt-2">5</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl mb-12">
        <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
        <ul className="space-y-4">
          <li className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-lg">✅ Completed Task: Report Generation</span>
            <span className="text-sm text-white/70">April 10, 2025</span>
          </li>
          <li className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-lg">💬 Submitted Feedback: Client Meeting</span>
            <span className="text-sm text-white/70">April 9, 2025</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-lg">✅ Completed Task: Data Analysis</span>
            <span className="text-sm text-white/70">April 8, 2025</span>
          </li>
        </ul>
      </div>

      {/* Top Performer */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl mb-12">
        <h3 className="text-2xl font-bold text-white mb-6">Top Performer of the Month</h3>
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/50"
            alt="Employee Photo"
            className="w-16 h-16 rounded-full mr-6 border-4 border-white/20"
          />
          <div>
            <h4 className="text-xl font-bold">John Doe</h4>
            <p className="text-white/80">Performance Rating: 95%</p>
            <p className="text-white/60">Department: Sales</p>
          </div>
        </div>
      </div>

      {/* Feedback & Ratings */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6">Feedback & Ratings</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-lg">🧑‍🤝‍🧑 Teamwork</p>
            <p className="text-lg text-green-300">4.5 / 5</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg">💬 Communication</p>
            <p className="text-lg text-blue-300">4.2 / 5</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg">🧠 Problem-Solving</p>
            <p className="text-lg text-purple-300">4.8 / 5</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg">⏰ Punctuality</p>
            <p className="text-lg text-yellow-300">4.6 / 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;
