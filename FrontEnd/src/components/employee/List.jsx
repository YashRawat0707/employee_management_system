// components/employee/List.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/employees");
      const data = res.data.map((emp, index) => ({
        ...emp,
        sno: index + 1,
        action: (
          <div className="space-x-2">
            <Link to={`/admin-dashboard/employee/${emp._id}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                Edit
              </button>
            </Link>
            <Link to={`/admin-dashboard/view-employee/${emp._id}`}>
              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                View
              </button>
            </Link>
            <Link to={`/admin-dashboard/salary/${emp._id}`}>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm">
                Salary
              </button>
            </Link>
            <Link to={`/admin-dashboard/leave/${emp._id}`}>
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                Leave
              </button>
            </Link>
          </div>
        ),
        imageElement: (
          <img
            src={emp.image}
            alt="employee"
            className="w-12 h-12 rounded-full object-cover"
          />
        )
      }));
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const results = employees.filter((emp) =>
      emp.name.toLowerCase().includes(value) ||
      emp.department.toLowerCase().includes(value)
    );
    setFilteredEmployees(results);
  };

  const columns = [
    {
      name: "S.No",
      selector: (row) => row.sno,
      sortable: true,
      width: "70px"
    },
    {
      name: "Image",
      selector: (row) => row.imageElement,
      width: "90px"
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "DOB",
      selector: (row) => row.dob,
      sortable: true
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true
    },
    {
      name: "Actions",
      selector: (row) => row.action
    }
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Employee List</h2>
        <Link to="/admin-dashboard/add-employee">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow">
            + Add Employee
          </button>
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or department"
          onChange={handleSearch}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredEmployees}
        progressPending={loading}
        pagination
        noDataComponent={<div className="text-gray-500 p-4">No employees found</div>}
        customStyles={{
          rows: {
            style: {
              minHeight: '64px'
            }
          }
        }}
      />
    </div>
  );
};

export default List;
