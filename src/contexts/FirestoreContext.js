import React from 'react';
import { createContext, useContext, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import PropTypes from 'prop-types';

const FirestoreContext = createContext();

export function useFirestore() {
  return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
  const [banks, setBanks] = useState([]);

  const addBank = async (bankData) => {
    const collectionRef = collection(db, 'banks');
    await addDoc(collectionRef, bankData);
  };

  const getBanks = async () => {
    const querySnapshot = await getDocs(collection(db, 'banks'));
    setBanks(querySnapshot.docs.map((doc) => doc.data()));
  };

  return (
    <FirestoreContext.Provider value={{ banks, addBank, getBanks }}>
      {children}
    </FirestoreContext.Provider>
  );
}

FirestoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};