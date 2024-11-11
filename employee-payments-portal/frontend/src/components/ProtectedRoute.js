import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login page
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
