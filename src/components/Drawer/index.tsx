import { Drawer } from 'vaul';
import {
  FaBars,
  FaCashRegister,
  FaHome,
  FaNewspaper,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/userAuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useTranslation } from 'react-i18next';

const VaulDrawer: React.FC = () => {
  const user = useUserAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.log('Error during logout', error);
    }
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="p-2 bg-red-700 text-white rounded-full mt-1">
        <FaBars />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />

        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4" />
            <div className="max-w-md w-auto">
              <Drawer.Title className="font-medium text-lg text-zinc-900">
                {user?.email ?? 'Gearfinder'}
                <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              </Drawer.Title>
            </div>

            <Drawer.Description>
              <ul className="space-y-4 text-zinc-900">
                <li>
                  <Link
                    to="/"
                    className="flex items-center gap-2 hover:opacity-30"
                  >
                    <FaHome />
                    {t('drawer.home')}
                  </Link>
                </li>
                {user ? (
                  <>
                    <li>
                      <Link to="/new" className="flex items-center gap-2">
                        <FaNewspaper />
                        {t('drawer.new')}
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-left w-full"
                      >
                        <FaSignOutAlt />
                        {t('drawer.logout')}
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="flex items-center gap-2 hover:opacity-30"
                      >
                        <FaSignInAlt />
                        {t('drawer.login')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="flex items-center gap-2 mb-6"
                      >
                        <FaCashRegister />
                        {t('drawer.register')}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </Drawer.Description>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default VaulDrawer;
