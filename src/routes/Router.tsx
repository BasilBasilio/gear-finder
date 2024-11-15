import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/index.tsx';
import Home from '../pages/home/index.tsx';
import Error from '../pages/error/index.tsx';
import UserProfile from '../pages/user/index.tsx';
import ProtectedRoutes from '../components/ProtectedRoutes/index.tsx';
import UserSignUp from '../components/UserSignIn/index.tsx';
import Insertion from '../components/Insertion/InsertionFormForNewInsertion/index.tsx';
import Login from '../pages/login/index.tsx';
import Results from '../components/Insertion/ResultsOnSearch/index.tsx';
import InsertionDetail from '../components/Insertion/InsertionDetailPage/index.tsx';

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
          {
            path: '/new',
            element: <Insertion />,
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
        path: '/insertion/:objectId',
        element: <InsertionDetail />,
        errorElement: <Error />,
      },
      {
        path: '/results',
        element: <Results />,
        errorElement: <Error />,
      },
      {
        path: '/*',
        element: <Error />,
      },
    ],
  },
]);

export default router;
