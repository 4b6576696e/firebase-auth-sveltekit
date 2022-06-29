import { initializeApp, getApps, getApp } from 'firebase/app'

import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA_fjJGtc1kAG1Ouae82VRd716W4YUbCj4",
    authDomain: "sveltekit-authentication-37534.firebaseapp.com",
    databaseURL: "https://sveltekit-authentication-37534-default-rtdb.firebaseio.com",
    projectId: "sveltekit-authentication-37534",
    storageBucket: "sveltekit-authentication-37534.appspot.com",
    messagingSenderId: "826655804460",
    appId: "1:826655804460:web:0745a0ac882852c494d589",
    measurementId: "G-DWNQKZQRL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'CLIENT');
// const app = !getApps().length ? initializeApp(firebaseConfig, 'CLIENT') : getApp()


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

setPersistence(auth, inMemoryPersistence)

export default auth