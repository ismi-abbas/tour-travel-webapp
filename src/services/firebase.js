import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// this is your key, can use back after the limit reset next day
// still require for login

// const firebaseConfig = {
//   apiKey: "AIzaSyCt79IMWaBfOWwBHNVxf2oVHKcI3RdSnHw",
//   authDomain: "travel-tour-webapp.firebaseapp.com",
//   projectId: "travel-tour-webapp",
//   storageBucket: "travel-tour-webapp.appspot.com",
//   messagingSenderId: "843238771243",
//   appId: "1:843238771243:web:47574c006b64734b4df86e",
// };

const altFirebaseConfig = {
  apiKey: "AIzaSyCQLbRFsTFMJgnr2jX4EjeOAVrTXc9R2SI",
  authDomain: "student-app-f2682.firebaseapp.com",
  projectId: "student-app-f2682",
  storageBucket: "student-app-f2682.appspot.com",
  messagingSenderId: "705990561387",
  appId: "1:705990561387:web:5c8ee1e5642a8e5c0bab2e",
  measurementId: "G-E85DMS3SJE",
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(altFirebaseConfig);

//Auth Exports
export const auth = getAuth(firebaseApp);

//Firestore Exports
export const db = getFirestore(firebaseApp);

//Storage Exports
export const storage = getStorage(firebaseApp);
