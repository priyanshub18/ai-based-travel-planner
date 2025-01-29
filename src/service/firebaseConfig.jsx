// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  {getFirestore}  from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlS1QW7YqujWo2t_TOru9qoVvrRQWtkUI",
  authDomain: "ai-trip-planner-73319.firebaseapp.com",
  projectId: "ai-trip-planner-73319",
  storageBucket: "ai-trip-planner-73319.firebasestorage.app",
  messagingSenderId: "972310049904",
  appId: "1:972310049904:web:822d73dfba24b4639d30b5",
  measurementId: "G-HZXPBQRF19"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
