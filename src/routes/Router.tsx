import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/index.tsx';
import Error from '../pages/error/index.tsx';
import Login from '../pages/login/index.tsx';

export const router = createBrowserRouter([
    {
        path: "/home",
        element: <Home />,
        errorElement: <Error />
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <Error />
    }
]);

export default router;