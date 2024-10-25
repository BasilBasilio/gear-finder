import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserAuth } from '../../context/userAuthContext';

const ProtectedRoutes: React.FC = () => {
  const user = useUserAuth();
  const location = useLocation();

  if (user === undefined) {
    return null;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
