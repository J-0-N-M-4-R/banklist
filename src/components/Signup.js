import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import './login.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate(); // To navigate to other pages

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignUp = async (e) => {
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
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Send email verification
      await sendEmailVerification(userCredential.user);
      console.log('Sign-up successful, email verification sent');
      // Navigate to email confirmation page
      navigate('/email-confirmation');
    } catch (error) {
      console.error('Sign-up error:', error.code);
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else {
        setError('Error signing up. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="graytitle">Sign Up for Banklist</h2>
        <form onSubmit={handleSignUp}>
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
            {isLoading ? 'Please wait...' : 'Sign Up'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}

        {/* Log in link to navigate back to the login page */}
        <div className="login-links-right">
          <span onClick={() => navigate('/login')} className="link">Log in</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;