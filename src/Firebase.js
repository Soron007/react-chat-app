// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFiFg7Lfhm4FMdcvNHPGf3uSsqafiQBZU",
    authDomain: "react-chatup.firebaseapp.com",
    projectId: "react-chatup",
    storageBucket: "react-chatup.appspot.com",
    messagingSenderId: "968439938884",
    appId: "1:968439938884:web:d2745bd21987e6d958e111"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);