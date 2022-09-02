// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5BZArHlm3MmN4Q_9tvU1edVgu9zM4nYM",
  authDomain: "admin-panel-b1117.firebaseapp.com",
  projectId: "admin-panel-b1117",
  storageBucket: "admin-panel-b1117.appspot.com",
  messagingSenderId: "1024562471233",
  appId: "1:1024562471233:web:dd13013c16ebf3971bc1c0",
  measurementId: "G-Y4S92PQ05D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);