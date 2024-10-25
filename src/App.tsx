import { RouterProvider } from 'react-router';
import { UserAuthProvider } from './context/userAuthContext';
import router from './routes/Router';

const App: React.FC = () => {
  return (
    <UserAuthProvider>
      <RouterProvider router={router} />
    </UserAuthProvider>
  );
};

export default App;
