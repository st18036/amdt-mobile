import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCToBO7psiOX9x-SIZzcvA0EGotfGO16Vo",
  authDomain: "amdt-mobile.firebaseapp.com",
  projectId: "amdt-mobile",
  storageBucket: "amdt-mobile.firebasestorage.app",
  messagingSenderId: "920653407631",
  appId: "1:920653407631:web:f27c2146d661b3e27397fa",
  measurementId: "G-YE1B0ZLR56"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);