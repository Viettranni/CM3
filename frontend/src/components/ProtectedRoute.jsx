import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'
import { useAutoLogout } from '../hooks/useAutoLogout';

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  useAutoLogout();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    // return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
