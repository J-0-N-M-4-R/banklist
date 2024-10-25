import React from 'react';
import PropTypes from 'prop-types';
import { db } from '../firebaseConfig'; // Firestore instance
import axios from 'axios';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const FDIC_API_URL = 'https://banks.data.fdic.gov/api/institutions?format=json&limit=100'; // Adjust limit

async function FetchBankData({ onFetchComplete }) {
  try {
    const response = await axios.get(FDIC_API_URL);
    
    // Log the full response to inspect its structure
    console.log('Full API Response:', response);

    // Check if the response has the correct data structure
    if (response && response.data && response.data.data && response.data.data.length > 0) {
      const banksData = response.data.data[0].data; // Access the bank data

      console.log('Raw Bank Info:', banksData); // Log the raw bank info

      // Check if banksData is an array and iterate through it
      if (Array.isArray(banksData)) {
        for (let bankInfo of banksData) {
          const bankDetails = {
            bankID: bankInfo.ID.toString(),
            name: bankInfo.NAME || 'Unknown Name',
            address: bankInfo.ADDRESS || 'Unknown Address',
            assetClass: bankInfo.BKCLASS || 'Unknown Class',
            cert: bankInfo.CERT || 'Unknown Cert',
            city: bankInfo.CITY || 'Unknown City',
            fdicRegion: bankInfo.FDICREGN || 'Unknown Region',
            state: bankInfo.STALP || 'Unknown State',
            zip: bankInfo.ZIP || 'Unknown ZIP',
            latitude: bankInfo.LATITUDE || 'Unknown Latitude',
            longitude: bankInfo.LONGITUDE || 'Unknown Longitude',
          };

          const bankRef = doc(db, `banks_${new Date().toISOString().split('T')[0]}`, bankDetails.bankID);
          const existingBank = await getDoc(bankRef);

          if (!existingBank.exists()) {
            await setDoc(bankRef, bankDetails);
            console.log(`Added Bank ${bankDetails.name}`);
          } else {
            console.log(`Bank ${bankDetails.name} already exists, skipping...`);
          }
        }

        onFetchComplete(banksData); // Call the completion handler with the data
      } else {
        console.error('Error: banksData is not an array');
      }
    } else {
      console.error('No data found in API response');
    }
  } catch (error) {
    console.error('Error fetching bank data:', error);
  }
}

FetchBankData.propTypes = {
  onFetchComplete: PropTypes.func.isRequired,
};

export default FetchBankData;