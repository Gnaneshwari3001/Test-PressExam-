// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjXrSVacruC8aX5xJ3HqXkXwJaiE5xFYc",
  authDomain: "testpress-68b51.firebaseapp.com",
  databaseURL: "https://testpress-68b51-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testpress-68b51",
  storageBucket: "testpress-68b51.appspot.com",
  messagingSenderId: "942587338594",
  appId: "1:942587338594:web:05f6da4d4147e63055563b",
  measurementId: "G-K4N164ZL6F"
};


// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };
