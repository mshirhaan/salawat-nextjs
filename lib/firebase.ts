// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcjIgpQUXqBwHfup7c1qT9FyEi0Rxrh5w",
  authDomain: "salawat-4ae6a.firebaseapp.com",
  projectId: "salawat-4ae6a",
  storageBucket: "salawat-4ae6a.appspot.com",
  messagingSenderId: "468253373342",
  appId: "1:468253373342:web:824776798ea27487e49c8f",
  measurementId: "G-MPPY2TGZCZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
