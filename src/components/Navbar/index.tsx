import {
  FaUser,
  FaHome,
  FaCashRegister,
  FaSignOutAlt,
  FaSignInAlt,
  FaNewspaper,
  FaGuitar,
} from 'react-icons/fa';
import { useUserAuth } from '../../context/userAuthContext';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import VaulDrawer from '../Drawer';

const Navbar: React.FC = () => {
  const user = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.log('Error during logout', error);
    }
  };

  return (
    <nav className="bg-blue-600 py-2 px-22">
      <div className="flex justify-between mx-auto items-center py-4 px-24">
        <div className="hidden sm:flex text-white font-bold text-xl absolute left-10">
          Gearfinder
          <FaGuitar className="mt-0.5" />
        </div>
        <div className="flex sm:hidden text-white font-bold text-xl absolute left-10">
          G
          <FaGuitar className="mt-0.5" />
        </div>
        <ul className="hidden md:flex gap-8 ml-auto mr-6 text-white cursor-pointer">
          <li>
            <Link to="/" className="flex items-center gap-2 mt-1">
              Home
              <FaHome />
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/new" className="flex items-center gap-2 mt-1">
                  New
                  <FaNewspaper />
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="nav-link flex items-center gap-2 mt-1"
                >
                  Logout
                  <FaSignOutAlt />
                </button>
              </li>
              <li>
                <Link to="/user" className="flex items-center gap-2 mt-1">
                  <span>{user.email}</span>
                  <FaUser />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="flex items-center gap-2 mt-1">
                  Register
                  <FaCashRegister />
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex items-center gap-2 mt-1">
                  Login
                  <FaSignInAlt />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="md:hidden absolute right-10 top-1">
        <VaulDrawer />
      </div>
    </nav>
  );
};

export default Navbar;
