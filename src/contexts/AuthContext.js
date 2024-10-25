import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, reload } from 'firebase/auth';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false); // New state to track email verification

  useEffect(() => {
    // Listen to changes in the user's auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in:', user.email);
        // Reload the user to get the latest email verification status
        reload(user)
          .then(() => {
            console.log('User reloaded, email verified:', user.emailVerified);
            setCurrentUser(user);
            setEmailVerified(user.emailVerified);
          })
          .catch((error) => {
            console.error('Error reloading user:', error);
          });
      } else {
        console.log('No user is logged in');
        setCurrentUser(null);
        setEmailVerified(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, emailVerified, setEmailVerified }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};