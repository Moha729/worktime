// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirStore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhF5PlIvoOeMwxxZ0vzxgsZXuL_8mKqRY",
  authDomain: "worktime-16178.firebaseapp.com",
  projectId: "worktime-16178",
  storageBucket: "worktime-16178.appspot.com",
  messagingSenderId: "953433212347",
  appId: "1:953433212347:web:390b9d0dc775447b9fb09e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirStore(app)

export {app, database}