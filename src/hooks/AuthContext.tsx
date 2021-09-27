import React, { createContext, useContext, useEffect, useState } from 'react';

import firebase from 'firebase/app';

interface IUserSiteData {
  pushToken?: string;
  profileUpdatedAt?: string;
}
interface IFirebaseContextData {
  userFire: firebase.User | null;
  userSiteData: IUserSiteData;
  handleLogout: () => void;
}

export const FirebaseContext = createContext<IFirebaseContextData>(
  {} as IFirebaseContextData
);

export const FirebaseProvider: React.FC = ({ children }) => {
  const [userFire, setUserFire] = useState<firebase.User | null>(null);
  const [userSiteData, setUserSiteData] = useState<IUserSiteData>({} as any);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (userAuth) => {
      setUserFire(userAuth);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userFire?.uid) {
      const unsubscribe = firebase

        .firestore()

        .collection('users')

        .doc(userFire.uid)

        .onSnapshot((doc) => {
          const dataToSet = doc.data();

          setUserSiteData(dataToSet || {});
        });

      return () => {
        unsubscribe();

        setUserSiteData({} as any);
      };
    }
  }, [userFire]);

  function handleLogout() {
    firebase.auth().signOut();
  }

  return (
    <FirebaseContext.Provider
      value={{
        userFire,
        userSiteData,
        handleLogout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export function useFirebase(): IFirebaseContextData {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error('useFirebase must be used within an FirebaseProvider');
  }

  return context;
}
