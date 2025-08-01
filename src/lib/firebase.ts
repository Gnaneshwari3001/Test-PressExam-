// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Hardcoded Firebase configuration to ensure it's always available.
const firebaseConfig = {
  projectId: "testpress-dyrhv",
  appId: "1:512988871607:web:5254a3d6ef908bc6224632",
  storageBucket: "testpress-dyrhv.firebasestorage.app",
  apiKey: "AIzaSyCtgOjHEdovxj5qctfaMCc6MSA9SiNaq7E",
  authDomain: "testpress-dyrhv.firebaseapp.com",
  messagingSenderId: "512988871607",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };
