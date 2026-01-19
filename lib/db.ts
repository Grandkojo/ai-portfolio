import { db } from "./firebase";
import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    increment,
    setDoc,
    getDoc,
    onSnapshot
} from "firebase/firestore";

// --- Types ---
export interface Project {
    id?: string;
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
    githubUrl: string;
    tech: string[];
    order: number;
}

export interface Experience {
    id?: string;
    role: string;
    company: string;
    period: string;
    location: string;
    description: string[];
    order: number;
}

// --- VISITS ---
export const subscribeToVisits = (callback: (visits: number) => void) => {
    // If no API key, return specific mock
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        callback(12345);
        return () => { };
    }

    const docRef = doc(db, "analytics", "site_stats");
    return onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data().visits || 0);
        } else {
            callback(0);
        }
    });
};

export const incrementVisits = async () => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return;

    const docRef = doc(db, "analytics", "site_stats");
    try {
        await updateDoc(docRef, {
            visits: increment(1)
        });
    } catch (e) {
        // Doc might not exist yet, create it
        // Note: In real app, cleaner to use setDoc with merge or check first
        // But for simple counter, this is often fine or handle "not-found" specifically
        try {
            await setDoc(docRef, { visits: 1 }, { merge: true });
        } catch (innerError) {
            console.error("Error setting initial visits", innerError);
        }
    }
};

// --- GENERIC HELPERS (Can be expanded) ---
// For now, these are placeholders that would call Firestore. 
// Since we are waiting for keys, I will add simple "Mock" console logs if keys are missing.

export const addProject = async (data: Project) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        console.log("MOCK: Adding project", data);
        return { id: "mock-id" };
    }
    return addDoc(collection(db, "projects"), data);
};

export const addExperience = async (data: Experience) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        console.log("MOCK: Adding experience", data);
        return { id: "mock-id" };
    }
    return addDoc(collection(db, "experience"), data);
};
