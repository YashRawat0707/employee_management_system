// import React, { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LeavePage = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [filteredLeaves, setFilteredLeaves] = useState([]);
//   const [search, setSearch] = useState('');
//   const navigate = useNavigate();

//   const fetchLeaves = () => {
//     axios.get('/api/leaves')
//       .then(res => {
//         setLeaves(res.data.leaves);
//         setFilteredLeaves(res.data.leaves);
//       })
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   useEffect(() => {
//     setFilteredLeaves(
//       leaves.filter(l =>
//         l.employeeId.userId.employeeId.toLowerCase().includes(search.toLowerCase())
//       )
//     );
//   }, [search, leaves]);

//   const handleFilterStatus = (status) => {
//     if (status === 'all') setFilteredLeaves(leaves);
//     else setFilteredLeaves(leaves.filter(l => l.status === status));
//   };

//   const columns = [
//     { name: 'S.N.', selector: (row, idx) => idx + 1, sortable: true },
//     { name: 'Employee ID', selector: row => row.employeeId.userId.employeeId },
//     { name: 'Name', selector: row => row.employeeId.userId.name },
//     { name: 'Type', selector: row => row.leaveType },
//     { name: 'Department', selector: row => row.employeeId.department.dep_name },
//     { name: 'Days', selector: row => row.days },
//     { name: 'Status', selector: row => row.status },
//     {
//       name: 'Action',
//       cell: row => (
//         <button
//           onClick={() => navigate(`/admin-dashboard/leave/${row._id}`)}
//           className="text-blue-500 underline"
//         >
//           View
//         </button>
//       )
//     }
//   ];

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Leaves Management</h2>
//       <div className="flex justify-between mb-4">
//         <input
//           type="text"
//           placeholder="Search by Employee ID"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <div className="space-x-2">
//           {['all','pending','approved','rejected'].map(status => (
//             <button
//               key={status}
//               onClick={() => handleFilterStatus(status)}
//               className="px-3 py-1 border rounded capitalize"
//             >
//               {status}
//             </button>
//           ))}
//         </div>
//       </div>
//       <DataTable columns={columns} data={filteredLeaves} pagination />
//     </div>
//   );
// };

// export default LeavePage;




import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeavePage = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null); // Added state for error handling
  const navigate = useNavigate();

  const fetchLeaves = () => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    axios
      .get('/api/leaves', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLeaves(res.data.leaves);
        setFilteredLeaves(res.data.leaves);
        setError(null); // Reset error on successful fetch
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch leaves. Please try again later.'); // Show error message
      });
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  useEffect(() => {
    setFilteredLeaves(
      leaves.filter(
        (l) =>
          l.employeeId?.userId?.employeeId
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    );
  }, [search, leaves]);

  const handleFilterStatus = (status) => {
    if (status === 'all') setFilteredLeaves(leaves);
    else setFilteredLeaves(leaves.filter((l) => l.status === status));
  };

  const columns = [
    { name: 'S.N.', selector: (row, idx) => idx + 1, sortable: true },
    { name: 'Employee ID', selector: (row) => row.employeeId?.userId?.employeeId },
    { name: 'Name', selector: (row) => row.employeeId?.userId?.name },
    { name: 'Type', selector: (row) => row.leaveType },
    { name: 'Department', selector: (row) => row.employeeId?.department?.dep_name },
    { name: 'Days', selector: (row) => row.days },
    { name: 'Status', selector: (row) => row.status },
    {
      name: 'Action',
      cell: (row) => (
        <button
          onClick={() => navigate(`/admin-dashboard/leave/${row._id}`)}
          className="text-blue-500 underline"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Leaves Management</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by Employee ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <div className="space-x-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterStatus(status)}
              className="px-3 py-1 border rounded capitalize"
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Show error if any */}
      <DataTable columns={columns} data={filteredLeaves} pagination />
    </div>
  );
};

export default LeavePage;
