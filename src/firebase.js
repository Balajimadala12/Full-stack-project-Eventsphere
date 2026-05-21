import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyACUoe02CpQgAMUmGrGSQ4516XzPDbEQds",
    authDomain: "eventsphere-a4042.firebaseapp.com",
    projectId: "eventsphere-a4042",
    storageBucket: "eventsphere-a4042.appspot.com",
    messagingSenderId: "89827687786",
    appId: "1:89827687786:web:88d4cfcd116f6855467913",
    measurementId: "G-L3RNNDXPX6Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);