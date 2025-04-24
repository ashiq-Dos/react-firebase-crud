// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCeMCKpMHRr93arpDF-qAKtMhrgFzH_k1A",
  authDomain: "fir-course-e7c08.firebaseapp.com",
  projectId: "fir-course-e7c08",
  storageBucket: "fir-course-e7c08.firebasestorage.app",
  messagingSenderId: "711263108122",
  appId: "1:711263108122:web:14632352f7d373c7fb25a3",
  measurementId: "G-VTV9DJY2YW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const googleAuth=new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)

