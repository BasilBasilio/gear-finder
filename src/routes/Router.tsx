import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/index.tsx';
import Home from '../pages/home/index.tsx';
import Error from '../pages/error/index.tsx';
import UserProfile from '../pages/user/index.tsx';
import ProtectedRoutes from '../components/ProtectedRoutes/index.tsx';
import UserSignUp from '../components/UserSignIn/index.tsx';
import ListingForm from '../components/Listing/ListingForm/ListingFormForNewListing/index.tsx';
import Login from '../pages/login/index.tsx';
import Results from '../components/Listing/ResultsOnSearch/index.tsx';
import ListingDetail from '../components/Listing/ListingDetailPage/index.tsx';
import Update from '../pages/update/index.tsx';

export const router = createBrowserRouter([
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
            element: <ListingForm />,
            errorElement: <Error />,
          },
          {
            path: '/update/:objectId',
            element: <Update />,
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
        path: '/signup',
        element: <UserSignUp />,
        errorElement: <Error />,
      },
      {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: '/listing/:objectId',
        element: <ListingDetail />,
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
