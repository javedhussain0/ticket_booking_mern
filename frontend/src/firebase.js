
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAyDQXX0Kzy-edDGvUJPd2fVz5lpBVFwpk",
  authDomain: "authentication-b6b46.firebaseapp.com",
  projectId: "authentication-b6b46",
  storageBucket: "authentication-b6b46.firebasestorage.app",
  messagingSenderId: "419949667378",
  appId: "1:419949667378:web:1d2309af78dca8b923882b",
  measurementId: "G-WF8MEN4X53"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();