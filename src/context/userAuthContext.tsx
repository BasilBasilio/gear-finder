import { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';

interface iUserAuthProviderProps {
  children: React.ReactNode;
}

export const UserAuthContext = createContext<User | null>(null);

export const UserAuthProvider: React.FC<iUserAuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log('The logged in user state is: ', user);
        setUser(user);
      }
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <UserAuthContext.Provider value={user}>{children}</UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
