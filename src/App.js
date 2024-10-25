import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import VerificationHandler from './components/VerificationHandler';
import EmailConfirmation from './components/EmailConfirmation';
import PasswordReset from './components/PasswordReset';

function App() {
  const { currentUser, emailVerified } = useAuth(); // Use global email verification status

  useEffect(() => {
    console.log('Current user:', currentUser);
    console.log('Email verified:', emailVerified);
  }, [currentUser, emailVerified]);

  const isVerifiedUser = currentUser && emailVerified;

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={isVerifiedUser ? <Navigate to="/home" /> : <Login />}
        />
        
        {/* Signup route */}
        <Route
          path="/signup"
          element={isVerifiedUser ? <Navigate to="/home" /> : <Signup />}
        />
        
        {/* Email confirmation route */}
        <Route
          path="/email-confirmation"
          element={isVerifiedUser ? <Navigate to="/home" /> : <EmailConfirmation />}
        />
        
        {/* Password reset route */}
        <Route
          path="/password-reset"
          element={isVerifiedUser ? <Navigate to="/home" /> : <PasswordReset />}
        />

        {/* Home route */}
        <Route
          path="/home"
          element={isVerifiedUser ? <Home /> : <Navigate to="/login" />}
        />

        {/* Verification handler route */}
        <Route path="/verify" element={<VerificationHandler />} />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;