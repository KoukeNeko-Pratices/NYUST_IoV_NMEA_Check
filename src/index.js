import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firnpm install -g firebase-toolsebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3qtNTBUGyMwB9YPV6rNLdrQhuLpq2h4E",
  authDomain: "iov-nmea-map-react-a9806.firebaseapp.com",
  projectId: "iov-nmea-map-react-a9806",
  storageBucket: "iov-nmea-map-react-a9806.appspot.com",
  messagingSenderId: "104991129436",
  appId: "1:104991129436:web:456f140b1fc140442ccb99",
  measurementId: "G-2LD3Z03QFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
