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

const hasApiKey = Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

// Initialize Firebase (Singleton pattern safely)
const app = hasApiKey
    ? (!getApps().length ? initializeApp(firebaseConfig) : getApp())
    : null;

// Connecting to named database 'ai-portfolio' as created by user
const db = app
    ? initializeFirestore(app, { experimentalForceLongPolling: true }, "ai-portfolio")
    : ({} as any);

const auth = app
    ? getAuth(app)
    : ({} as any);

export { db, auth };

