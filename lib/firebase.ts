import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, initializeFirestore, setLogLevel } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Enable verbose logging to see why it hangs
// setLogLevel('debug'); // Commented out for production

// console.log("Firebase Config Check:", {
//     apiKey: firebaseConfig.apiKey ? "Present" : "MISSING",
//     projectId: firebaseConfig.projectId,
//     authDomain: firebaseConfig.authDomain
// });

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Force long polling to avoid WebSocket issues (common cause of hangs)
// Connecting to named database 'ai-portfolio' as created by user
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
}, "ai-portfolio");

const auth = getAuth(app);

export { db, auth };
