import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    // return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
