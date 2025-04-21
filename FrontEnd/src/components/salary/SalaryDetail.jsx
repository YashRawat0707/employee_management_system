import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ViewSalary from "./view"; // your popup component

const SalaryDetailPage = () => {
  const { id } = useParams(); // employee ID from URL
  const [salaryData, setSalaryData] = useState(null);
  const [showModal, setShowModal] = useState(true); // show modal by default

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const res = await axios.get(`/api/salaries/employee/${id}`);
        if (res.data) {
          setSalaryData(res.data);
        } else {
          alert("No salary found for this employee.");
        }
      } catch (err) {
        console.error("Error fetching salary:", err);
        alert("Something went wrong.");
      }
    };

    fetchSalary();
  }, [id]);

  return (
    <div>
      {showModal && salaryData && (
        <ViewSalary data={salaryData} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default SalaryDetailPage;
