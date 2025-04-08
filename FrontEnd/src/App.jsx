import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import { useAuth } from "./context/authContext";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import EditEmployee from "./components/employee/Edit";
import ViewEmployee from "./components/employee/View";
import EmployeeSalary from "./components/employee/Salary";
import EmployeeLeave from "./components/employee/Leave";


function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          user ? 
            <Navigate to={user.role === "admin" ? "/admin-dashboard" : "/employee-dashboard"} /> 
            : <Navigate to="/login" />
        } />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard with nested routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="employee/:id" element={<EditEmployee />} />
          <Route path="view-employee/:id" element={<ViewEmployee />} />
          <Route path="salary/:id" element={<EmployeeSalary />} />
          <Route path="leave/:id" element={<EmployeeLeave />} />

        </Route>

        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
