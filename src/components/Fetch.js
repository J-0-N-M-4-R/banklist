import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchBankDetails from '../fetch/FetchBankIDs'; // Adjust the import based on your actual file structure
import './fetch.css';

function Fetch() {
  const navigate = useNavigate();
  const [logMessages, setLogMessages] = useState([]); // State for logs
  const [fetching, setFetching] = useState(false); // State to manage fetching status

  // Handle completion of bank data fetch
  const handleFetchComplete = (data) => {
    setLogMessages(prevLogs => [
      ...prevLogs,
      `Fetched ${data.length} banks`
    ]);
    console.log('Fetched Data:', data); // Log the fetched data for debugging
  };

  // Function to initiate fetching bank IDs
  const handleFetchBankIDs = async () => {
    setFetching(true); // Set fetching state to true
    setLogMessages([]); // Clear previous logs
    try {
      await fetchBankDetails(handleFetchComplete); // Call the fetch function
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setFetching(false); // Reset fetching state
    }
  };

  return (
    <div className="fetch-container">
      {/* Button to navigate back to home */}
      <button 
        className="navigate-home-btn"
        onClick={() => navigate('/home')}
      >
        &lt; Home
      </button>

      {/* Fetch Bank IDs Button */}
      <button 
        className="fetch-btn-wide"
        onClick={handleFetchBankIDs} // Call the function to fetch IDs
        disabled={fetching} // Disable button while fetching
      >
        Fetch Bank IDs
      </button>

      {/* Log Window */}
      <div className="log-window">
        {logMessages.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}

export default Fetch;