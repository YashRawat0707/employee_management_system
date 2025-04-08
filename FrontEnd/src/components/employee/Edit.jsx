import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    image: "",
    name: "",
    dob: "",
    department: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/employees/${id}`);
        if (res.ok) {
          const data = await res.json();
          setForm(data);
        } else {
          alert("Failed to fetch employee details");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Server error while fetching employee");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Employee updated successfully!");
        navigate("/admin-dashboard/employees");
      } else {
        alert("Failed to update employee");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Server error while updating employee");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-600 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600 font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600 font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Marketing / Sales / HR"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
}

export default Edit;
