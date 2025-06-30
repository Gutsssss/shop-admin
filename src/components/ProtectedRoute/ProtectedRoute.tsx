import { Navigate } from 'react-router-dom';
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
  const { user, isAuth,isLoading } = useAppSelector(state => state.userReducer);
  if (isLoading) return <Loader />;
  if (!isAuth || user?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};