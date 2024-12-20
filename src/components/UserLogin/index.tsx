import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLogIn } from './types';
import { logIn } from '../../auth';
import { useTranslation } from 'react-i18next';

const initialValue: UserLogIn = {
  email: '',
  password: '',
};

const UserLogin: React.FC = () => {
  const [userLogInfo, setUserLogInfo] = useState<UserLogIn>(initialValue);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await logIn(userLogInfo.email, userLogInfo.password);
      navigate('/');
    } catch (error) {
      console.log('Error', error);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await googleSignIn();
  //     navigate('/');
  //   } catch (error) {
  //     console.log('Error', error);
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
        <div className="hidden lg:block lg:w-1/2 bg-red-600 rounded-l-lg">
          <div className="flex items-center justify-center h-full p-10"></div>
        </div>

        <div className="w-full lg:w-1/2 p-6 lg:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-700">
            {t('login.login')}
          </h2>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder={t('login.email')}
                value={userLogInfo.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserLogInfo({ ...userLogInfo, email: e.target.value })
                }
                required
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder={t('login.password')}
                value={userLogInfo.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserLogInfo({ ...userLogInfo, password: e.target.value })
                }
                required
              />
            </div>
            <button
              data-testid="login"
              type="submit"
              className="w-full px-4 py-2 mt-6 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              {t('login.login')}
            </button>
          </form>
          {/* <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-gray-700 bg-white border rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              {t('login.logingoogle')}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
