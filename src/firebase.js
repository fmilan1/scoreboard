// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUFtTaI2GuarO8UKsUJrEFG0tRRCnV7x8",
    authDomain: "scoreboard-df5d8.firebaseapp.com",
    projectId: "scoreboard-df5d8",
    storageBucket: "scoreboard-df5d8.appspot.com",
    messagingSenderId: "89526102771",
    appId: "1:89526102771:web:8258483c1a38012ddda586",
    databaseURL: "https://scoreboard-df5d8-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;

export const db = getDatabase(app);