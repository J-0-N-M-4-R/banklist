import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  console.log('Home: Current User: ', currentUser);

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
      {/* Fetch link fixed in the top left */}
      <span className="text-link top-left" onClick={() => navigate('/fetch')}>
        Fetch
      </span>

      {/* Logout link fixed in the top right */}
      <span className="text-link top-right" onClick={handleLogout}>
        Logout
      </span>

      {/* You can add other content here */}
    </div>
  );
}

export default Home;