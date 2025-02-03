// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9_eSJmDq3Ws3yOhmCtvvYxYKZ8Th1ZWg",
  authDomain: "patrimonio-b4724.firebaseapp.com",
  projectId: "patrimonio-b4724",
  storageBucket: "patrimonio-b4724.firebasestorage.app",
  messagingSenderId: "374497821467",
  appId: "1:374497821467:web:fde65096bf72531a7a09be",
  measurementId: "G-CESFPQ1NSJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };