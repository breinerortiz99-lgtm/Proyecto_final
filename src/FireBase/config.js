// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCok0jwRVrJ11A5OeodTl7YtlXofOTHcHo",
  authDomain: "proyecto-2026-1-c9972.firebaseapp.com",
  projectId: "proyecto-2026-1-c9972",
  storageBucket: "proyecto-2026-1-c9972.firebasestorage.app",
  messagingSenderId: "343397202090",
  appId: "1:343397202090:web:6bfd043d67eaeb2e49f8d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);