// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "blog-mern-11c51.firebaseapp.com",
    projectId: "blog-mern-11c51",
    storageBucket: "blog-mern-11c51.appspot.com",
    messagingSenderId: "2016558391",
    appId: "1:2016558391:web:c8f5fa134289463da2aeb2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);