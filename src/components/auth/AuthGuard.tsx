import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../common/LoadingScreen';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedUserTypes?: Array<'student' | 'educator' | 'admin'>;
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  allowedUserTypes, 
  redirectTo = '/' 
}) => {
  const { user, userType, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} />;
  }

  // If user type restrictions are specified and user doesn't have permission
  if (allowedUserTypes && userType && !allowedUserTypes.includes(userType)) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};

export default AuthGuard;