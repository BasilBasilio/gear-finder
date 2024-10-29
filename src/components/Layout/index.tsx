import { Outlet } from 'react-router';
import Navbar from '../Navbar';

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
