import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtJixkqIB1MBlS0ErspB7rOS3Vb6G8TvI",
  authDomain: "dietplan-fa495.firebaseapp.com",
  databaseURL: "https://dietplan-fa495-default-rtdb.firebaseio.com",
  projectId: "dietplan-fa495",
  storageBucket: "dietplan-fa495.firebasestorage.app",
  messagingSenderId: "420692953799",
  appId: "1:420692953799:web:3b667c49320f55610b4ce2"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
