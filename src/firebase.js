// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRy_29B7J3a_7-REWb2kAdL62sfBerxso",
    authDomain: "scoreboard-fb837.firebaseapp.com",
    projectId: "scoreboard-fb837",
    storageBucket: "scoreboard-fb837.appspot.com",
    messagingSenderId: "271259284940",
    appId: "1:271259284940:web:dd84abc00d5b40ba811969"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;