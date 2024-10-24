import { RouterProvider } from 'react-router';
import router from './routes/Router';

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
