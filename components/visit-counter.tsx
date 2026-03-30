"use client";

import { useEffect, useState } from "react";
import { subscribeToVisits } from "@/lib/db";
import { Eye } from "lucide-react";

export function VisitCounter() {
    const [visits, setVisits] = useState<number | null>(null);

    useEffect(() => {
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
