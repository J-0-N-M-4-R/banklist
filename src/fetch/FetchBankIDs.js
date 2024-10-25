import React from 'react';
import PropTypes from 'prop-types';
import { db } from '../firebaseConfig'; // Firestore instance
import axios from 'axios';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const FDIC_API_URL = 'https://banks.data.fdic.gov/api/institutions?format=json&limit=100';

async function fetchBankDetails(onFetchComplete) {
  try {
    const response = await axios.get(FDIC_API_URL);
    const banksData = response.data.data; // Correctly get the bank data array

    if (!Array.isArray(banksData) || banksData.length === 0) {
      console.error('No bank data available');
      return;
    }

    for (const bankInfo of banksData) {
      const bankDetails = {
        bankID: bankInfo.data.ID.toString(),
        name: bankInfo.data.NAME || 'Unknown Name',
        city: bankInfo.data.CITY || 'Unknown City',
        state: bankInfo.data.STALP || 'Unknown State',
        zip: bankInfo.data.ZIP || 'Unknown ZIP',
        address: bankInfo.data.ADDRESS || 'Unknown Address',
        fdicRegion: bankInfo.data.FDICREGN || 'Unknown Region',
        cert: bankInfo.data.CERT || 'Unknown Cert',
        latitude: bankInfo.data.LATITUDE || 'Unknown Latitude',
        longitude: bankInfo.data.LONGITUDE || 'Unknown Longitude',
        assetClass: bankInfo.data.BKCLASS || 'Unknown Class',
      };

      const bankRef = doc(db, 'banks', bankDetails.bankID);
      const existingBank = await getDoc(bankRef);

      if (!existingBank.exists()) {
        await setDoc(bankRef, bankDetails);
        console.log(`Added Bank ${bankDetails.name}`); // Log bank addition
      } else {
        console.log(`Bank ${bankDetails.name} already exists, skipping...`);
      }
    }

    onFetchComplete(banksData); // Call the onFetchComplete function with fetched data
  } catch (error) {
    console.error('Error fetching bank data:', error);
  }
}

// Prop validation for onFetchComplete
fetchBankDetails.propTypes = {
  onFetchComplete: PropTypes.func.isRequired,
};

export default fetchBankDetails;