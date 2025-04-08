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
      const response = await axios.get('http://localhost:5000/api/department', {
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
        <div className="min-h-screen flex flex-col items-center justify-start pt-10 bg-gradient-to-r from-purple-600 to-blue-400">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-[600px] font-[Poppins] mb-8">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Manage Departments
            </h3>

            <div className="flex justify-between items-center space-x-4">
              <input
                type="text"
                placeholder="Search By Department Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                onChange={filterDepartments}
              />
              <Link
                to="/admin-dashboard/add-department"
                className="px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all"
              >
                Add
              </Link>
            </div>
          </div>

          <div className="w-[90%] max-w-4xl bg-white rounded-2xl shadow-lg p-6">
            <DataTable
              columns={columns}
              data={filteredDepartments} pagination
              noDataComponent={<div className="text-center text-gray-500 p-4">No departments found</div>}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
