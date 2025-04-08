// components/employee/View.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function View() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/employees`);
        const data = await res.json();
        const emp = data.find((e) => e._id === id);
        setEmployee(emp);
      } catch (err) {
        console.error("Failed to fetch employee:", err);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading employee details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-blue-600 hover:underline"
        >
          ← Back to Employee List
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            src={employee.image}
            alt={employee.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-md mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {employee.name}
          </h2>
          <p className="text-sm text-gray-500">{employee.department}</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold">Date of Birth:</span>
            <span>{employee.dob}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold">Department:</span>
            <span>{employee.department}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold">Employee ID:</span>
            <span className="break-all">{employee._id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
