import {
  FaUser,
  FaHome,
  FaCashRegister,
  FaSignOutAlt,
  FaSignInAlt,
} from 'react-icons/fa';
import { useUserAuth } from '../../context/userAuthContext';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';

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
        <div className="text-white font-bold text-xl">Gearfinder</div>
        <ul className="flex gap-8 ml-auto mr-6 text-white cursor-pointer">
          <li>
            <Link to="/" className="flex items-center gap-2">
              Home
              <FaHome />
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="nav-link flex items-center gap-2"
                >
                  Logout
                  <FaSignOutAlt />
                </button>
              </li>
              <li>
                <Link to="/user" className="flex items-center gap-2">
                  <FaUser />
                  <span>{user.email}</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="flex items-center gap-2">
                  Register
                  <FaCashRegister />
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex items-center gap-2">
                  Login
                  <FaSignInAlt />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
