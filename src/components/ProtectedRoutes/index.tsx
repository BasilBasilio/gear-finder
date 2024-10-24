import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoutes: React.FC = () => {
  const isAuth: boolean = false;
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoutes;
