import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface IUserContext {
  user: FirebaseAuthTypes.User | null;
  setUser?: (user: FirebaseAuthTypes.User) => {};
}

const defaultState = {
  user: null,
};

const UserContext = createContext<IUserContext>(defaultState);

export const UserProvider: FC = ({children}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    userInfo => {
      setUser(userInfo);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
