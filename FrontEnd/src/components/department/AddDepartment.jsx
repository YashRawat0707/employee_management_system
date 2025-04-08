import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            const response = await axios.post('http://localhost:5000/api/department/add', department, {
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-400">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96 font-[Poppins]">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Add New Department
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="dep_name" className="block text-gray-700 font-semibold">
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="dep_name"
                            onChange={handleChange}
                            placeholder="Department Name"
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-semibold">
                            Description
                        </label>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                            rows="4"
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-all">
                        Add Department
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;
