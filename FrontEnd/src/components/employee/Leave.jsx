import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeLeave = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    axios.get(`/api/leaves/detail/${id}`)
      .then(res => setLeave(res.data.leave))
      .catch(err => console.error(err));
  }, [id]);

  if (!leave) return <div className="text-white text-center">Loading...</div>;

  const handleUpdate = (status) => {
    axios.put(`/api/leaves/${id}`, { status })
      .then(() => navigate('/admin-dashboard/leaves'))
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4 py-8">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white/30 rounded-xl p-8 w-full max-w-lg shadow-lg space-y-6">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 mb-6">
          Leave Details
        </h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={leave.employeeId.userId.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border-4 border-indigo-500"
          />
          <p className="text-xl font-semibold text-white">{leave.employeeId.userId.name}</p>
          <p className="text-md text-gray-300"><strong>Employee ID:</strong> {leave.employeeId.userId.employeeId}</p>
        </div>

        <div className="text-white space-y-4">
          <p><strong>Leave Type:</strong> {leave.leaveType}</p>
          <p><strong>Reason:</strong> {leave.reason}</p>
          <p><strong>Department:</strong> {leave.employeeId.department.dep_name}</p>
          <p><strong>Start Date:</strong> {new Date(leave.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(leave.endDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${leave.status === 'pending' ? 'text-yellow-400' : leave.status === 'approved' ? 'text-green-400' : 'text-red-400'}`}>{leave.status}</span></p>
        </div>

        {leave.status === 'pending' && (
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => handleUpdate('approved')}
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition duration-300"
            >
              Approve
            </button>
            <button
              onClick={() => handleUpdate('rejected')}
              className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition duration-300"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeLeave;
