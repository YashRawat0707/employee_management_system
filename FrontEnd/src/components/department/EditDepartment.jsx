import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    });
    const [depLoading, setDepLoading] = useState(false);

    // 🔄 Fetch department data by ID
    useEffect(() => {
        const fetchDepartment = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`http://localhost:5007/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    setDepartment(response.data.department);
                }
            } catch (error) {
                alert(error.response?.data?.error || "Failed to fetch department.");
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartment();
    }, [id]);

    // 🖊️ Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 📤 Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                alert("Department updated successfully!");
                navigate("/admin-dashboard/departments"); // ⬅️ Redirect if needed
            }
        } catch (error) {
            alert(error.response?.data?.error || "Failed to update department.");
        }
    };

    return (
        <>
            {depLoading ? (
                <div className="text-white text-2xl font-bold">Loading....</div>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl animate-fade-in text-white font-[Poppins]">
                        <h2 className="text-2xl font-bold text-center text-gray-200 mb-6">
                            Edit Department
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="dep_name" className="block text-gray-200 font-semibold">
                                    Department Name
                                </label>
                                <input
                                    type="text"
                                    name="dep_name"
                                    onChange={handleChange}
                                    value={department.dep_name}
                                    placeholder="Department Name"
                                    className="w-full mt-1 p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-gray-200 font-semibold">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    onChange={handleChange}
                                    value={department.description}
                                    placeholder="Description"
                                    className="w-full mt-1 p-3 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-300"
                                    rows="4"
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 hover:brightness-110 text-white font-semibold rounded-lg p-3 transition duration-300 shadow-md">
                                Edit Department
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditDepartment;
