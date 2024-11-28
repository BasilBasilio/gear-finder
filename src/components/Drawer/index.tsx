import { Drawer } from 'vaul';
import { FaBars, FaWindowClose } from 'react-icons/fa';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/userAuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useTranslation } from 'react-i18next';

const VaulDrawer: React.FC = () => {
  const user = useUserAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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
    <Drawer.Root
      direction="right"
      dismissible={false}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Drawer.Trigger className="p-2 bg-red-700 text-white rounded-full mt-1">
        <FaBars />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />

        <Drawer.Content
          className="fixed right-0 top-0 bottom-0 z-10 outline-none w-screen max-w-md flex"
          style={
            { '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties
          }
        >
          <div className="bg-zinc-50 h-full w-full p-5 flex flex-col rounded-l-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <Drawer.Title className="font-medium text-lg text-zinc-900">
                Gearfinder Menu
              </Drawer.Title>
              <FaWindowClose
                className="cursor-pointer text-red-600 text-xl"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <Drawer.Description>
              <ul className="space-y-4 text-zinc-900">
                <li>
                  <Link to="/" className="flex items-center gap-2">
                    {t('drawer.home')}
                  </Link>
                </li>
                {user ? (
                  <>
                    <li>
                      <Link to="/new" className="flex items-center gap-2">
                        {t('drawer.new')}
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-left w-full"
                      >
                        {t('drawer.login')}
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/register" className="flex items-center gap-2">
                        {t('drawer.register')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" className="flex items-center gap-2">
                        {t('drawer.login')}
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
