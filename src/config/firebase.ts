import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCzMV14V8froch_KZI47C1Ox2wlexvxPzE",
    authDomain: "bluepets.firebaseapp.com",
    projectId: "bluepets",
    storageBucket: "bluepets.appspot.com",
    messagingSenderId: "643497662161",
    appId: "1:643497662161:web:3a9f30055daba3d1c517f0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const authFirebase = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);