// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAgNxSUp3-JiJgrSIAThxZcD7__yTyZ6fU",
  authDomain: "auth-55978.firebaseapp.com",
  databaseURL: "https://auth-55978-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auth-55978",
  storageBucket: "auth-55978.firebasestorage.app",
  messagingSenderId: "521867895391",
  appId: "1:521867895391:web:a9aa96c90d108792f6f1ea",
  measurementId: "G-KWTKFZTGYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);