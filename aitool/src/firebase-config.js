import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9-voThFwBUZxSuoUcqv18vTCaXTf9NjA",
    authDomain: "ai-tool-e00dd.firebaseapp.com",
    projectId: "ai-tool-e00dd",
    storageBucket: "ai-tool-e00dd.firebasestorage.app",
    messagingSenderId: "981461982544",
    appId: "1:981461982544:web:7ae95fd7df1c0da1776055",
    // measurementId: "G-QR0DCX74MY",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);
export default app;
