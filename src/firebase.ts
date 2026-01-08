import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBPUo7xDKmXLQHVhRKQpkxMkLQ5QkBlF3E",
    authDomain: "photography-41b88.firebaseapp.com",
    projectId: "photography-41b88",
    storageBucket: "photography-41b88.firebasestorage.app",
    messagingSenderId: "1007249446826",
    appId: "1:1007249446826:web:f4198faeda791dbd0bfdd3",
    measurementId: "G-TSK33D0M92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exports
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
