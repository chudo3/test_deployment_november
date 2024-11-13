// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getAnalytics, logEvent} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbJg8kgtyNt0KhD9wH7GT9Pd9DYnWFdzI",
    authDomain: "happy-verse-app.firebaseapp.com",
    projectId: "happy-verse-app",
    storageBucket: "happy-verse-app.appspot.com",
    messagingSenderId: "271760415688",
    appId: "1:271760415688:web:7d55b6eb42bfafebd3fefd",
    measurementId: "G-EMZD3DZVMQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const analytics = getAnalytics(app);

auth.onAuthStateChanged((user) => {
    if (user) {
        // User enters the system
        logEvent(analytics, 'login', {
            user_id: user.uid
        });
    }
})

