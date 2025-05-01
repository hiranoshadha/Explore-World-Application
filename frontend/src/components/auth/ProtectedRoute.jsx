// src/components/auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  console.log("isAuthenticated in ProtectedRoute:", isAuthenticated);
  console.log("User in ProtectedRoute:", user);

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
