// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFireStore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzqtTWJ_WwskqY9ulgdy6ZxNFC04cFekY",
  authDomain: "interactive-comments-64ecc.firebaseapp.com",
  projectId: "interactive-comments-64ecc",
  storageBucket: "interactive-comments-64ecc.appspot.com",
  messagingSenderId: "53732170241",
  appId: "1:53732170241:web:afbb80c4e69b5c5041fe00",
  measurementId: "G-DYXZV1P4FB",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFireStore();
// const storage = getStorage();
// const analytics = getAnalytics(app);

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage };
export default app;
