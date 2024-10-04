import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useAutoLogout = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const logoutTimer = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user && user.token) {
        const payload = JSON.parse(atob(user.token.split('.')[1]));
        const expirationTime = payload.exp * 1000; // Convert to milliseconds
        const timeUntilExpiration = expirationTime - Date.now();

        if (timeUntilExpiration <= 0) {
          // Token has already expired
          toast.error('Your session has expired. Please log in again.');
          logout();
          navigate('/login');
        } else {
          // Set timer for automatic logout
          logoutTimer.current = setTimeout(() => {
            logout();
            navigate('/login');
          }, timeUntilExpiration);
        }
      }
    }

    return () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
  }, [isAuthenticated, logout, navigate]);
};