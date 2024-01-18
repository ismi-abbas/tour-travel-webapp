import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCt79IMWaBfOWwBHNVxf2oVHKcI3RdSnHw",
  authDomain: "travel-tour-webapp.firebaseapp.com",
  projectId: "travel-tour-webapp",
  storageBucket: "travel-tour-webapp.appspot.com",
  messagingSenderId: "843238771243",
  appId: "1:843238771243:web:47574c006b64734b4df86e",
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

//Auth Exports
export const auth = getAuth(firebaseApp);

//Firestore Exports
export const db = getFirestore(firebaseApp);

//Storage Exports
export const storage = getStorage(firebaseApp);
