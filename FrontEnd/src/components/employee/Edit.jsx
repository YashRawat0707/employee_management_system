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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl animate-fade-in text-white font-[Poppins]">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Edit Employee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-200">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="mt-1 w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="mt-1 w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-200">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="mt-1 w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-200">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Marketing / Sales / HR"
              className="mt-1 w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 hover:brightness-110 text-white font-semibold rounded-lg transition duration-300 shadow-md"
          >
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
