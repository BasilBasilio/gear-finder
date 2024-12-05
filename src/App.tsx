import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { UserAuthProvider } from './context/userAuthContext';
import router from './routes/Router';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserAuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </UserAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
