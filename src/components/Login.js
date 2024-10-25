import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Modal from './Modal';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState(''); // Modal text for reset confirmation

  const navigate = useNavigate(); // To navigate to other pages

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!validateEmail(email)) {
      setError('Invalid email format');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Try to sign in
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      navigate('/home');
      console.log('should navigate home');
    } catch (error) {
      console.error('Login attempt error:', error.code);

      if (error.code === 'auth/wrong-password') {
        setError('Incorrect username or password');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many login attempts. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setIsModalOpen(false); // Close modal

    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent! Navigating to /password-reset...');
      navigate('/password-reset'); // Redirect to password-reset page after sending email
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
      console.error('Password reset error:', error);
    }
  };

  const openPasswordResetModal = () => {
    if (!email || !validateEmail(email)) {
      // If no valid email, show error message
      setError('Please enter your email before tapping the Forgot Password link.');
    } else {
      // If email is valid, proceed to open the modal
      setModalText('Would you like to reset your password?');
      setIsModalOpen(true); // Open modal to confirm password reset
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/assets/Banklist-logo.png" alt="Banklist Logo" className="login-logo" />
        <h1>Banklist</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'Login'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}

        {/* Forgot Password and Sign Up Links */}
        <div className="login-links-inline">
          <span onClick={openPasswordResetModal} className="link">Forgot Password?</span>
          <span onClick={() => navigate('/signup')} className="link">Sign Up</span>
        </div>
      </div>

      {/* Render custom modal for password reset */}
      <Modal
        isOpen={isModalOpen}
        title="Password Reset"
        text={modalText}
        confirmText="Yes"
        cancelText="No"
        onConfirm={handlePasswordReset}  // Trigger password reset
        onClose={() => setIsModalOpen(false)}  // Close modal
      />
    </div>
  );
}

export default Login;