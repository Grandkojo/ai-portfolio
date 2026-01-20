"use client";

import { useEffect, useState } from "react";
import { subscribeToVisits, incrementVisits } from "@/lib/db";
import { Eye } from "lucide-react";

export function VisitCounter() {
    const [visits, setVisits] = useState<number | null>(null);

    useEffect(() => {
        // Increment on mount (once per session ideally, but for now simple mount)
        // Check local storage to prevent double count on refresh if desired, 
        // but user asked for "real", so let's just trigger it safely.

        // Ensure we only increment once per session to avoid spamming on dev HMR
        const hasCounted = sessionStorage.getItem("visit_counted");
        if (!hasCounted) {
            incrementVisits();
            sessionStorage.setItem("visit_counted", "true");
        }

        // Subscribe to real-time updates
        const unsubscribe = subscribeToVisits((count) => {
            setVisits(count);
        });

        return () => unsubscribe();
    }, []);

    if (visits === null) return null; // Loading state

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/20 text-xs font-mono text-white/50">
            <Eye size={12} className="text-primary" />
            <span>{visits.toLocaleString()} Visits</span>
        </div>
    );
}
