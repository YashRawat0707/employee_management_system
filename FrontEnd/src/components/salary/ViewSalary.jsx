import React from "react";


const ViewSalary = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Salary Details</h2>
        <p><strong>Department:</strong> {data.department}</p>
        <p><strong>Employee:</strong> {data.employee}</p>
        <p><strong>Basic Salary:</strong> ₹{data.basicSalary}</p>
        <p><strong>Allowances:</strong> ₹{data.allowances}</p>
        <p><strong>Deductions:</strong> ₹{data.deductions}</p>
        <p><strong>Pay Date:</strong> {data.payDate}</p>
        <p className="mt-2"><strong>Net Pay:</strong> ₹{data.basicSalary + data.allowances - data.deductions}</p>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewSalary;
