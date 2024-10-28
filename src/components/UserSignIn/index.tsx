import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSignIn } from '../interfaces';
import { googleSignIn, signUp } from '../../auth';

const initialValue: UserSignIn = {
  email: '',
  password: '',
  confirmPassword: '',
};

const UserSignUp: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserSignIn>(initialValue);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await signUp(userInfo.email, userInfo.password);
      navigate('/');
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate('/');
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Register
        </h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              id="id"
              type="text"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter your email"
              value={userInfo.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserInfo({ ...userInfo, email: e.target.value })
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
              type="text"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter your password"
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
              type="text"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Confirm your password"
              value={userInfo.confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserInfo({ ...userInfo, confirmPassword: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Register
          </button>
        </form>
        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-gray-700 bg-white border rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
