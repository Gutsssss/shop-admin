import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks/redux';
import { type JSX } from 'react';

import { Loader } from '@components/Loader/Loader';

export const ProtectedRoute = ({ 
  children,
  role = 'ADMIN'
}: {
  children: JSX.Element;
  role?: string;
}) => {
  const { user, isAuth, isLoading } = useAppSelector(state => state.userReducer);
  const location = useLocation();

  if (!isAuth && !isLoading) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (user?.role !== role) {
    return <Navigate to="/all" replace />;
  }

  return children;
};