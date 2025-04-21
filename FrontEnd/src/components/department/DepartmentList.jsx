import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get('http://localhost:5007/api/department', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map(dep => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons DepId={dep._id} onDepartmentDelete={onDepartmentDelete} />
          ),
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const filterDepartments = (e) => {
    const keyword = e.target.value.toLowerCase();
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(keyword)
    );
    setFilteredDepartments(records);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <>
      {depLoading ? (
        <div className="text-white text-2xl font-bold">Loading...</div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-start pt-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl animate-fade-in text-white font-[Poppins] mb-8">
            <h3 className="text-2xl font-bold text-center text-gray-200 mb-6">
              Manage Departments
            </h3>

            <div className="flex justify-between items-center space-x-4">
              <input
                type="text"
                placeholder="Search By Department Name"
                className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
                onChange={filterDepartments}
              />
              <Link
                to="/admin-dashboard/add-department"
                className="px-4 py-3 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 hover:brightness-110 text-white font-semibold rounded-lg transition duration-300 shadow-md"
              >
                Add
              </Link>
            </div>
          </div>

          <div className="w-[90%] max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              noDataComponent={<div className="text-center text-gray-500 p-4">No departments found</div>}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
