import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBsryYVMNZpPGJGuw3-6kSH4rW41pBaXaU",
  authDomain: "whipchat-3fd9b.firebaseapp.com",
  projectId: "whipchat-3fd9b",
  storageBucket: "whipchat-3fd9b.firebasestorage.app",
  messagingSenderId: "883098043964",
  appId: "1:883098043964:web:03e7b0500f96b43d236539"
};


const app = initializeApp(firebaseConfig);

export default firebaseConfig