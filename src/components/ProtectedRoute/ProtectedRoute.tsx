import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useEffect, type JSX } from 'react';
import { check } from '@store/reducers/ActionCreators';
import { Loader } from '@components/LoadingComp/LoadingComp';

export const ProtectedRoute = ({ 
  children,
  role = 'ADMIN'
}: {
  children: JSX.Element;
  role?: string;
}) => {
  const { user, isAuth,isLoading } = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch()
  useEffect(() => {
  const checkAuth = () => {
    try {
      dispatch(check());
    } catch (err) {
      console.log(err)
    }
  };
  checkAuth();
}, [dispatch]);
  if (isLoading) return <Loader />;
  if (!isAuth || user?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};