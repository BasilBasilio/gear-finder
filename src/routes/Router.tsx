import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/index.tsx';
import Home from '../pages/home/index.tsx';
import Error from '../pages/error/index.tsx';
import Login from '../pages/login/index.tsx';
import UserProfile from '../pages/user/index.tsx';
import ProtectedRoutes from '../components/ProtectedRoutes/index.tsx';
import UserSignUp from '../components/UserSignIn/index.tsx';

export const router = createBrowserRouter([
  {
    path: '/register',
    element: <UserSignUp />,
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
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
      },
      {
        path: '/*',
        element: <Error />,
      },
    ],
  },
]);

export default router;
