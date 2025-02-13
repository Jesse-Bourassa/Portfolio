import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCZxl2sL4X1M8nHtfclkYvOI1AjdQSjxjs",
    authDomain: "portfolio-9e49e.firebaseapp.com",
    projectId: "portfolio-9e49e",
    storageBucket: "portfolio-9e49e.firebasestorage.app",
    messagingSenderId: "666860465129",
    appId: "1:666860465129:web:45cb5e9a26434f6001f978",
    measurementId: "G-BG8SDT2X8M"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
