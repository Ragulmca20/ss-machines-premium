// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyC78K1jGxzFhFuGZS2FyC-kKX9Zu21r-4w",
  authDomain: "ss-premium-machines.firebaseapp.com",
  databaseURL:
    "https://ss-premium-machines-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ss-premium-machines",
  storageBucket: "ss-premium-machines.appspot.com",
  messagingSenderId: "1046994630795",
  appId: "1:1046994630795:web:9e03979c00f372a709fc8e",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
export const db = getFirestore();
export default auth;
