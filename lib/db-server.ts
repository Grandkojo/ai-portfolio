import { getPortfolioAdminDb } from "./firebase-admin";
import { Project, Skill, Experience } from "./db";

// --- FETCH (Server-Side using Firebase Admin SDK) ---

export const getProjects = async (): Promise<Project[]> => {
    try {
        const adminDb = getPortfolioAdminDb();
        const snapshot = await adminDb.collection("projects").orderBy("order", "asc").get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    } catch (e) {
        console.error("Error fetching projects via Admin SDK:", e);
        return [];
    }
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
    try {
        const adminDb = getPortfolioAdminDb();
        const docSnap = await adminDb.collection("projects").doc(slug).get();
        if (!docSnap.exists) return null;
        return { id: docSnap.id, ...docSnap.data() } as Project;
    } catch (e) {
        console.error(`Error fetching project by slug ${slug} via Admin SDK:`, e);
        return null;
    }
};

export const getSkills = async (): Promise<Skill[]> => {
    try {
        const adminDb = getPortfolioAdminDb();
        const snapshot = await adminDb.collection("skills").orderBy("level", "desc").get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Skill));
    } catch (e) {
        console.error("Error fetching skills via Admin SDK:", e);
        return [];
    }
};

export const getExperience = async (): Promise<Experience[]> => {
    try {
        const adminDb = getPortfolioAdminDb();
        const snapshot = await adminDb.collection("experience").orderBy("order", "asc").get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experience));
    } catch (e) {
        console.error("Error fetching experience via Admin SDK:", e);
        return [];
    }
};

export const checkRateLimit = async (ip: string): Promise<{ blocked: boolean; message?: string }> => {
    try {
        const adminDb = getPortfolioAdminDb();
        const docRef = adminDb.collection("rate_limits").doc(ip);
        const docSnap = await docRef.get();
        const now = Date.now();
        const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
        const LIMIT = 10;

        if (!docSnap.exists) {
            await docRef.set({
                count: 1,
                windowStart: now,
                lastSeen: now
            });
            return { blocked: false };
        }

        const data = docSnap.data() || {};
        const windowStart = data.windowStart || now;

        if (now - windowStart > TWENTY_FOUR_HOURS) {
            await docRef.set({
                count: 1,
                windowStart: now,
                lastSeen: now
            });
            return { blocked: false };
        }

        if (data.count >= LIMIT) {
            return {
                blocked: true,
                message: "Daily message limit (10) exceeded. Please try again in 24 hours."
            };
        }

        const { FieldValue } = require("firebase-admin/firestore");
        await docRef.update({
            count: FieldValue.increment(1),
            lastSeen: now
        });
        return { blocked: false };

    } catch (e) {
        console.error("Rate limit check error:", e);
        return { blocked: false };
    }
};
