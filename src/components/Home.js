import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  console.log ('Home: Current User: ', currentUser);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        localStorage.removeItem('validated'); // Clear the validated flag
        navigate('/login'); // Navigate to login after logout
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <div className="home-container">
      <h1>Home</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;