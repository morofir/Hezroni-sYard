<<<<<<< Updated upstream
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
=======
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


>>>>>>> Stashed changes

const firebaseConfig = {
    apiKey: "AIzaSyDA82FCRo2Wxo-0MM-lXqJHEKO9N8hQvCE",
    authDomain: "react-native-authenticat-f9a11.firebaseapp.com",
    databaseURL: "https://react-native-authenticat-f9a11-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-native-authenticat-f9a11",
    storageBucket: "react-native-authenticat-f9a11.appspot.com",
    messagingSenderId: "403450464603",
    appId: " 1:403450464603:web:bc2df5568b6d9e4887327e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getDatabase(app);

<<<<<<< Updated upstream
export { db };
=======
// Initialize Firebase authentication
const auth = getAuth(app);

// Initialize Firebase Realtime Database
const database = getDatabase(app);


export { auth, firestore, collection, database };
>>>>>>> Stashed changes
