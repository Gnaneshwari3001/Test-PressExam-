// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Hardcoded Firebase configuration to ensure it's always available.
const firebaseConfig = {
    apiKey: "AIzaSyAw0Q7B3F7-r-r55aU8Y5q4j5k9c8l0dY",
    authDomain: "testpress-68b51.firebaseapp.com",
    projectId: "testpress-68b51",
    storageBucket: "testpress-68b51.appspot.com",
    messagingSenderId: "367069729986",
    appId: "1:367069729986:web:d71e233b21696e1f0e42d7",
    measurementId: "G-XXXXXXXXXX"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };
