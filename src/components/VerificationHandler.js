import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext'; // Import the AuthContext
import './verification-handler.css';

function ActionHandler() {
  const [message, setMessage] = useState('Processing your request...');
  const [password, setPassword] = useState(''); // For password reset
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const { setEmailVerified } = useAuth(); // Pull in setEmailVerified from context

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const actionCode = urlParams.get('oobCode');
    const mode = urlParams.get('mode');

    if (actionCode && mode) {
      handleAction(mode, actionCode);
    } else {
      setMessage('Invalid or expired link.');
    }
  }, [handleAction]);

  const handleAction = (mode, actionCode) => {
    switch (mode) {
      case 'verifyEmail':
        applyActionCode(auth, actionCode)
          .then(() => {
            setMessage('Email verified! Redirecting to home...');
            setEmailVerified(true); // Set email verification globally
            setTimeout(() => navigate('/home'), 2000); // Redirect to home
          })
          .catch((error) => {
            setMessage('Error verifying your email.');
            console.error('Error verifying email:', error);
          });
        break;

      case 'resetPassword':
        setIsPasswordReset(true); // Show the password reset form
        verifyPasswordResetCode(auth, actionCode)
          .then(() => {
            setMessage('Please enter a new password.');
          })
          .catch((error) => {
            setMessage('Invalid or expired password reset code.');
            console.error('Error resetting password:', error);
          });
        break;

      default:
        setMessage('Unknown action. Please contact support.');
        break;
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const actionCode = urlParams.get('oobCode');

    try {
      await confirmPasswordReset(auth, actionCode, password);
      setMessage('Password has been reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login or home after resetting password
    } catch (error) {
      setMessage('Error resetting your password.');
      console.error('Error during password reset:', error);
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-box">
        <img
          src={isPasswordReset ? "/assets/Banklist-lock.png" : "/assets/Banklist-checkmark.png"}
          alt={isPasswordReset ? "lock" : "checkmark"}
          className="verification-logo"
        />
        <h2>{message}</h2>

        {isPasswordReset && (
          <form onSubmit={handlePasswordReset}>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
        )}

        <p>If you&apos;re not redirected,<br /> <a href="/login">click here to login</a>.</p>
      </div>
    </div>
  );
}

export default ActionHandler;