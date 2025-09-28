// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFTwnvjCRp9Q8yuN9AIbW3h6MgCHLSlaY",
  authDomain: "onotime-53d3d.firebaseapp.com",
  projectId: "onotime-53d3d",
  storageBucket: "onotime-53d3d.firebasestorage.app",
  messagingSenderId: "244987798909",
  appId: "1:244987798909:web:e8fb09e81c2177781ad814"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreApp = getFirestore(app);