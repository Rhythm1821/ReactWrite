import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useAuth } from '../contexts/AuthContext'
import api from '../api'; 

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated, refresh_token } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(err => console.error(err));
  }, []);

  const auth = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decode = jwtDecode(token);
    const tokenExpiration = decode.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refresh_token();
      setIsAuthenticated(true);
      setIsAuthorized(true);
    } else {
      setIsAuthenticated(true);
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) return <div>Loading...</div>;

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
