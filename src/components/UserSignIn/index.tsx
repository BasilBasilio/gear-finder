import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSignIn } from './types';
import { signUp } from '../../auth';
import { useTranslation } from 'react-i18next';
import { updateProfile } from 'firebase/auth';

const initialValue: UserSignIn = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const UserSignUp: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserSignIn>(initialValue);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const credential = await signUp(userInfo.email, userInfo.password);
      const user = credential.user;
      await updateProfile(user, { displayName: userInfo.username });
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
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {t('signin.register')}
        </h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              id="id"
              type="text"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600"
              placeholder={t('signin.email')}
              value={userInfo.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder={t('signin.username')}
              value={userInfo.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600"
              placeholder={t('signin.password')}
              value={userInfo.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="confirmpassword" className="block text-sm">
              Confirm password
            </label>
            <input
              id="confirmpassword"
              type="password"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600"
              placeholder={t('signin.confirmpassword')}
              value={userInfo.confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserInfo({ ...userInfo, confirmPassword: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
          >
            {t('signin.register')}
          </button>
        </form>
        {/* <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-gray-700 bg-white border rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            {t('signin.signin')}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default UserSignUp;
