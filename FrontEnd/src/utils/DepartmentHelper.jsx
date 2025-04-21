import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ DepId, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Do you want to Delete?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5007/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          // Notify parent to remove the deleted department from the UI
          onDepartmentDelete(id);
        } else {
          alert("Failed to delete department.");
        }
      } catch (error) {
        if (error.response && error.response.data && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          console.error("Delete error:", error);
          alert("Something went wrong while deleting.");
        }
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        className="px-3 py-1 bg-yellow-500 text-white rounded-md"
        onClick={() => navigate(`/admin-dashboard/department/${DepId}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded-md"
        onClick={() => handleDelete(DepId)}
      >
        Delete
      </button>
    </div>
  );
};
