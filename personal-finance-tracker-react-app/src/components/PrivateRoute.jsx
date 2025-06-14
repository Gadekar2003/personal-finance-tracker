import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect to login if there's no authenticated user
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the protected component
  return children;
};

export default PrivateRoute; 