// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration (อ่านจาก .env เท่านั้น ดู .env.example)
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const REQUIRED_ENV_KEYS = {
  apiKey: 'VITE_FIREBASE_API_KEY',
  authDomain: 'VITE_FIREBASE_AUTH_DOMAIN',
  projectId: 'VITE_FIREBASE_PROJECT_ID',
  appId: 'VITE_FIREBASE_APP_ID'
};

const missingKeys = Object.entries(REQUIRED_ENV_KEYS)
  .filter(([field]) => !firebaseConfig[field])
  .map(([, envName]) => envName);

if (missingKeys.length > 0) {
  throw new Error(
    `ไม่พบค่า Firebase config: ${missingKeys.join(', ')} — ` +
    'กรุณาคัดลอก .env.example เป็น .env แล้วใส่ค่าจาก Firebase Console จากนั้นรัน dev/build ใหม่'
  );
}

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const db = getFirestore(app);
export const auth = getAuth(app);

export let analytics = null;
isSupported().then(supported => {
  if (supported && firebaseConfig.measurementId) {
    analytics = getAnalytics(app);
  }
}).catch(err => console.log('Analytics notice:', err));

// Real Firebase is active
export const isRealFirebaseConfigured = true;

console.log("🔥 Connected to Firebase project:", firebaseConfig.projectId);