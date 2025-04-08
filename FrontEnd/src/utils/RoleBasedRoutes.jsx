import React from 'react';
import { useAuth } from '../context/authContext.jsx';
import { Navigate } from 'react-router-dom';

const RoleBasedRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading......</div>;
  }

  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />; // 
  }

  return children; // 
};

export default RoleBasedRoutes;
