// src/components/auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  // console.log("isAuthenticated in ProtectedRoute:", isAuthenticated);
  // console.log("User in ProtectedRoute:", user);
  // console.log("Loading in ProtectedRoute:", loading);

  // Show nothing while checking authentication status
  if (loading) {
    return null; // Or a loading spinner component
  }

  // Only redirect after we've checked localStorage
  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;