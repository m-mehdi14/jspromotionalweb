// // Import necessary functions
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   setPersistence,
//   browserSessionPersistence,
// } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCrP5kjUBR9VDrOYBKNhOBRe70pzyYyjO0",
//   authDomain: "jspromotionalapp.firebaseapp.com",
//   projectId: "jspromotionalapp",
//   storageBucket: "jspromotionalapp.firebasestorage.app",
//   messagingSenderId: "383720093577",
//   appId: "1:383720093577:web:fc8dbb1ab3ba43edd8d358",
//   measurementId: "G-L6NNW5L86C",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Auth and set session persistence
// const auth = getAuth(app);
// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//     console.log("Firebase Auth persistence set to browser session.");
//   })
//   .catch((error) => {
//     console.error("Error setting persistence:", error);
//   });

// // Initialize Firestore
// const db = getFirestore(app);

// // Export for use in your app
// export { auth, app, db };

////////////////////////////////////////////////////////////////////////

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrP5kjUBR9VDrOYBKNhOBRe70pzyYyjO0",
  authDomain: "jspromotionalapp.firebaseapp.com",
  projectId: "jspromotionalapp",
  storageBucket: "jspromotionalapp.firebasestorage.app",
  messagingSenderId: "383720093577",
  appId: "1:383720093577:web:fc8dbb1ab3ba43edd8d358",
  measurementId: "G-L6NNW5L86C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// New Step

export { auth, app, db };
