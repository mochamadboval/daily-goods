import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "daily-goods-4869.firebaseapp.com",
  databaseURL:
    "https://daily-goods-4869-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "daily-goods-4869",
  storageBucket: "daily-goods-4869.appspot.com",
  messagingSenderId: "298394093435",
  appId: "1:298394093435:web:c9926e10b571a97beadfde",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app;
