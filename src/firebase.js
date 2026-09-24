// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDXuDcTNEEtdk-NmypL87DzSUiBUhh4eRM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "market-booking-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "market-booking-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "market-booking-project.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "678040117836",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:678040117836:web:9cf755116cf8953e838ae9",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-P0KPELC5H0"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const db = getFirestore(app);
export const auth = getAuth(app);

export let analytics = null;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(err => console.log('Analytics notice:', err));

// Real Firebase is active
export const isRealFirebaseConfigured = true;

console.log("🔥 Connected to Firebase project:", firebaseConfig.projectId);