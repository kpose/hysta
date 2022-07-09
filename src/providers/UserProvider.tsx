import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {IUserData} from '../types/user';
import firestore from '@react-native-firebase/firestore';

interface IUserContext {
  user: FirebaseAuthTypes.User | null;
  setUser?: (user: FirebaseAuthTypes.User) => void;
  userData?: IUserData;
}
interface BaseLayoutProps {
  children: ReactNode;
}

const defaultState = {
  user: null,
};

const UserContext = createContext<IUserContext>(defaultState);

export const UserProvider: FC<BaseLayoutProps> = ({children}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userData, setUserData] = useState<IUserData>();
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (userInfo: any) => {
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

  useEffect(() => {
    if (!user?.email) {
      return;
    }
    const subscriber = firestore()
      .collection('Users')
      .where('email', '==', user.email)
      .onSnapshot(querySnapshot => {
        let size = querySnapshot.size;
        if (size > 1) {
          return;
        }
        querySnapshot.forEach(documentSnapshot => {
          let userdata: IUserData = documentSnapshot.data();
          let id = documentSnapshot.id;
          userdata.id = id;
          setUserData(userdata);
        });
      });

    return subscriber;
  }, [onAuthStateChanged, user]);

  return (
    <UserContext.Provider value={{user, setUser, userData}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
