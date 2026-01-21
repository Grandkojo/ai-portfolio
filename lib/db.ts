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
    onSnapshot,
    writeBatch,
    serverTimestamp
} from "firebase/firestore";

// --- HELPERS ---

export const clearCollection = async (collectionName: string) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        console.log(`MOCK: Clearing collection ${collectionName}`);
        return;
    }

    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log(`Cleared collection: ${collectionName}`);
    } catch (e) {
        console.error(`Error clearing collection ${collectionName}:`, e);
        throw e;
    }
};

// --- Types ---
export interface Project {
    id?: string;
    title: string;
    subtitle?: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
    githubUrl: string;
    tech: string[];
    order: number;
}

export interface Experience {
    id?: string;
    type: "Experience" | "Education" | "Certification";
    role: string; // Title / Degree
    company: string; // Organization / Institution
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

// --- PROJECTS ---

export const addProject = async (data: Project) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        console.log("MOCK: Adding project", data);
        return { id: "mock-id" };
    }
    try {
        const docRef = await addDoc(collection(db, "projects"), data);
        console.log("Firestore: Project added with ID:", docRef.id);
        return docRef;
    } catch (e) {
        console.error("Firestore Error adding project:", e);
        throw e;
    }
};

export const updateProject = async (id: string, data: Partial<Project>) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return;
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, data);
};

export const deleteProject = async (id: string) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return;
    await deleteDoc(doc(db, "projects", id));
};

export const subscribeToProjects = (callback: (projects: Project[]) => void) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        callback([]);
        return () => { };
    }

    // Order by 'order' field ascending
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    return onSnapshot(q, (snapshot) => {
        const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        callback(projects);
    });
};

// --- EXPERIENCE ---

export const addExperience = async (data: Experience) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        console.log("MOCK: Adding experience", data);
        return { id: "mock-id" };
    }
    try {
        const docRef = await addDoc(collection(db, "experience"), data);
        console.log("Firestore: Experience added with ID:", docRef.id);
        return docRef;
    } catch (e) {
        console.error("Error adding experience:", e);
        throw e;
    }
};

export const updateExperience = async (id: string, data: Partial<Experience>) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return;
    const docRef = doc(db, "experience", id);
    await updateDoc(docRef, data);
};

export const deleteExperience = async (id: string) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return;
    await deleteDoc(doc(db, "experience", id));
};

export const subscribeToExperience = (callback: (experience: Experience[]) => void) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        callback([]);
        return () => { };
    }

    const q = query(collection(db, "experience"), orderBy("order", "asc"));
    return onSnapshot(q, (snapshot) => {
        const experience = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experience));
        callback(experience);
    });
};


// --- SKILLS ---

export interface Skill {
    id?: string;
    name: string;
    category: "Frontend" | "Backend" | "Tools" | "AI/ML" | "Database" | "Other";
    level: number; // 1-10
    experience: string; // e.g. "3 years"
}

export const addSkill = async (data: Skill) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return;
    return addDoc(collection(db, "skills"), data);
};

export const updateSkill = async (id: string, data: Partial<Skill>) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return;
    const docRef = doc(db, "skills", id);
    await updateDoc(docRef, data);
};

export const deleteSkill = async (id: string) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return;
    await deleteDoc(doc(db, "skills", id));
};



export const subscribeToSkills = (callback: (skills: Skill[]) => void) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        callback([]);
        return () => { };
    }
    // Order by level descending (highest skill first)
    const q = query(collection(db, "skills"), orderBy("level", "desc"));
    return onSnapshot(q, (snapshot) => {
        const skills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Skill));
        callback(skills);
    });
};

// --- MESSAGES ---

export interface Message {
    id?: string;
    name: string;
    email: string;
    message: string;
    phone?: string;
    createdAt: any;
}

export const addMessage = async (data: Omit<Message, "createdAt">) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        console.log("MOCK: Adding message", data);
        return;
    }
    try {
        await addDoc(collection(db, "messages"), {
            ...data,
            createdAt: serverTimestamp()
        });
    } catch (e) {
        console.error("Error adding message:", e);
        throw e;
    }
};

export const deleteMessage = async (id: string) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return;
    await deleteDoc(doc(db, "messages", id));
};

export const subscribeToMessages = (callback: (messages: Message[]) => void) => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        callback([]);
        return () => { };
    }

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
        callback(messages);
    });
};


// --- FETCH (Server-Side) ---

export const getProjects = async (): Promise<Project[]> => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return [];
    try {
        const q = query(collection(db, "projects"), orderBy("order", "asc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    } catch (e) {
        console.error("Error fetching projects:", e);
        return [];
    }
};

export const getSkills = async (): Promise<Skill[]> => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return [];
    try {
        const q = query(collection(db, "skills"), orderBy("level", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Skill));
    } catch (e) {
        console.error("Error fetching skills:", e);
        return [];
    }
};

export const getExperience = async (): Promise<Experience[]> => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return [];
    try {
        const q = query(collection(db, "experience"), orderBy("order", "asc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experience));
        return data;
    } catch (e) {
        console.error("Error fetching experience:", e);
        return [];
    }
};
