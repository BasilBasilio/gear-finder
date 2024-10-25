import { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';

interface iUserAuthProviderProps {
  children: React.ReactNode;
}

export const UserAuthContext = createContext<User | null | undefined>(
  undefined,
);

export const UserAuthProvider: React.FC<iUserAuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        setUser(null);
        return;
      }
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <UserAuthContext.Provider value={user}>{children}</UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
