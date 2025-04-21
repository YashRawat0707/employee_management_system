import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5007/api/department/add', department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            alert(error.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl animate-fade-in text-white font-[Poppins]">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Add New Department
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Department Name */}
                    <div>
                        <label htmlFor="dep_name" className="block text-sm font-medium text-gray-200">
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="dep_name"
                            onChange={handleChange}
                            placeholder="Enter department name"
                            required
                            className="mt-1 w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-200">
                            Description
                        </label>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            placeholder="Enter description"
                            required
                            className="mt-1 w-full p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 hover:brightness-110 text-white font-semibold rounded-lg transition duration-300 shadow-md"
                    >
                        Add Department
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;
