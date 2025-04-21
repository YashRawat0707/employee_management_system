import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Salary = () => {
  const { employeeId } = useParams(); // Extract employeeId from URL params
  const [salaryData, setSalaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const response = await axios.get(`/api/employees/${employeeId}/salary`);
        setSalaryData(response.data); // Assuming response contains salary details
      } catch (err) {
        setError('Failed to fetch salary data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalary();
  }, [employeeId]);

  if (loading) return <div>Loading salary details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Salary Details</h2>

      {salaryData ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Salary Information</h3>
          <p><strong>Employee ID:</strong> {salaryData.employeeId}</p>
          <p><strong>Employee Name:</strong> {salaryData.name}</p>
          <p><strong>Salary Amount:</strong> ${salaryData.amount}</p>
          <p><strong>Salary Date:</strong> {salaryData.date}</p>
        </div>
      ) : (
        <p>No salary data found for this employee.</p>
      )}
    </div>
  );
};

export default Salary;
