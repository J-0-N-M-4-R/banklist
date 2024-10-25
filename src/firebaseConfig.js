// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebase = {
  apiKey: "AIzaSyDXmip3rRSMYuEhjqhPf_A4w257SAT_amE",
  authDomain: "banklist-app.firebaseapp.com",
  projectId: "banklist-app",
  storageBucket: "banklist-app.appspot.com",
  messagingSenderId: "6104605105",
  appId: "1:6104605105:web:5d73dcff2a67b076459d90",
  measurementId: "G-408D4BRNQY"
};

console.log('Initializing Firebase with config:', firebase);

// Initialize Firebase
const app = initializeApp(firebase);

export const auth = getAuth(app);
export const db = getFirestore(app);