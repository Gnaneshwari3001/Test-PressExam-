// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Correct Firebase configuration for the user's project.
const firebaseConfig = {
    apiKey: "AIzaSyA43aL5h6GUc5O5wSg_W4J4R5z4Z7g8o8c",
    authDomain: "testpress-68b51.firebaseapp.com",
    projectId: "testpress-68b51",
    storageBucket: "testpress-68b51.appspot.com",
    messagingSenderId: "1074900984813",
    appId: "1:1074900984813:web:06e42d744f7a6345a1954e",
    measurementId: "G-8B31E3S1J1"
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
