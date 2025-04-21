import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import ViewSalary from "./ViewSalary";

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState(null);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const res = await axios.get("/api/salaries");
        setSalaries(res.data);
      } catch (err) {
        console.error("Error fetching salaries:", err);
      }
    };

    fetchSalaries();
  }, []);

  const columns = [
    {
      name: "Department",
      selector: (row) => row.department?.name,
      sortable: true,
    },
    {
      name: "Employee",
      selector: (row) => row.employee?.name,
      sortable: true,
    },
    {
      name: "Basic Salary",
      selector: (row) => `₹${row.basicSalary}`,
    },
    {
      name: "Allowances",
      selector: (row) => `₹${row.allowances}`,
    },
    {
      name: "Deductions",
      selector: (row) => `₹${row.deductions}`,
    },
    {
      name: "Pay Date",
      selector: (row) => new Date(row.payDate).toLocaleDateString(),
    },
    {
      name: "Total",
      selector: (row) =>
        `₹${row.basicSalary + row.allowances - row.deductions}`,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          onClick={() => setSelectedSalary({
            department: row.department?.name,
            employee: row.employee?.name,
            basicSalary: row.basicSalary,
            allowances: row.allowances,
            deductions: row.deductions,
            payDate: new Date(row.payDate).toLocaleDateString()
          })}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Salary Records</h2>

      <DataTable
        columns={columns}
        data={salaries}
        pagination
        highlightOnHover
        responsive
        striped
        dense
      />

      {selectedSalary && (
        <ViewSalary
          data={selectedSalary}
          onClose={() => setSelectedSalary(null)}
        />
      )}
    </div>
  );
};

export default SalaryList;
