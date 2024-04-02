// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANfCXHiFX0eAPv4Q06LQSg4ocLz-bNtq0",
    authDomain: "aidshackathon.firebaseapp.com",
    databaseURL: "https://aidshackathon-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "aidshackathon",
    storageBucket: "aidshackathon.appspot.com",
    messagingSenderId: "9323550276",
    appId: "1:9323550276:web:c5532a144747a966ba0e11"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;