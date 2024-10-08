import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDpiPdEHyBo3S6-ncRHpipVV--V57GsaYQ",
  authDomain: "test-dce9e.firebaseapp.com",
  projectId: "test-dce9e",
  storageBucket: "test-dce9e.appspot.com",
  messagingSenderId: "1076196998959",
  appId: "1:1076196998959:web:d25b013aa0f7e4812bebda",
  measurementId: "G-LEB4G2JEMS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage  = getStorage(app);
export const db = getFirestore(app);