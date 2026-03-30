import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccountJson = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON;
const portfolioDbId = process.env.FIREBASE_PORTFOLIO_DB_ID || "ai-portfolio";

function getAdminApp() {
    if (getApps().length > 0) {
        return getApps()[0];
    }

    if (!serviceAccountJson) {
        throw new Error("FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON is missing");
    }

    return initializeApp({
        credential: cert(JSON.parse(serviceAccountJson)),
    });
}

export function getPortfolioAdminDb() {
    return getFirestore(getAdminApp(), portfolioDbId);
}
