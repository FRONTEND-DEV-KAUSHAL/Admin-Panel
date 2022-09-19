// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH5KQtVQPn4AuvRujMx_bdtlLIdFgfdjk",
  authDomain: "admin-panel-4b7cd.firebaseapp.com",
  projectId: "admin-panel-4b7cd",
  storageBucket: "admin-panel-4b7cd.appspot.com",
  messagingSenderId: "483206901257",
  appId: "1:483206901257:web:1b96efbba70a6efc0c12d8",
  measurementId: "G-EKP31JPL2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const storageRef = ref(storage);