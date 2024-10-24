import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/index.tsx';
import Error from '../pages/error/index.tsx';
import Login from '../pages/login/index.tsx';
import UserProfile from '../pages/user/index.tsx';
import ProtectedRoutes from '../components/ProtectedRoutes/index.tsx';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/user',
        element: <UserProfile />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
]);

export default router;
