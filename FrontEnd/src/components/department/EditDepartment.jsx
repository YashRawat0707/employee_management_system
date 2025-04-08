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
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
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
                <div>Loading....</div>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-400">
                    <div className="bg-white p-8 rounded-2xl shadow-lg w-96 font-[Poppins]">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                            Edit Department
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
                                    value={department.dep_name}
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
                                    value={department.description}
                                    placeholder="Description"
                                    className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                                    rows="4"
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-all">
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
