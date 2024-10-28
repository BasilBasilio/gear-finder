import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/index.tsx';
import Error from '../pages/error/index.tsx';
import Login from '../pages/login/index.tsx';
import UserProfile from '../pages/user/index.tsx';
import ProtectedRoutes from '../components/ProtectedRoutes/index.tsx';
import UserSignUp from '../components/UserSignIn/index.tsx';

const baseUrl = import.meta.env.PROD ? '/gear-finder/' : '';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: `${baseUrl}user`,
        element: <UserProfile />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: `${baseUrl}`,
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: `${baseUrl}register`,
    element: <UserSignUp />,
    errorElement: <Error />,
  },
  {
    path: `${baseUrl}login`,
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: `${baseUrl}*`,
    element: <Error />,
    errorElement: <Error />,
  },
]);

export default router;
