import { Outlet } from 'react-router';
import Navbar from '../Navbar';

const Layout: React.FC = () => {
  return (
    <div className="relative h-screen overflow-x-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
