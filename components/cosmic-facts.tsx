"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Atom, BrainCircuit, Rocket } from "lucide-react";

const facts = [
    { icon: Atom, text: "I build systems that think." },
    { icon: Rocket, text: "Obsessed with scalable backend architecture." },
    { icon: BrainCircuit, text: "Merging human creativity with AI logic." },
    { icon: Sparkles, text: "Turning coffee into clean code since 2018." },
    { icon: Atom, text: "Exploring the void between data and design." },
];

export function CosmicFacts() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % facts.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const CurrentIcon = facts[index].icon;

    return (
        <div className="fixed bottom-10 left-10 z-40 hidden lg:flex items-center gap-4 pointer-events-none mix-blend-screen opacity-60">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                    transition={{ duration: 1 }}
                    className="flex items-center gap-3"
                >
                    <div className="p-2 rounded-full border border-primary/30 bg-primary/10 animate-pulse-slow">
                        <CurrentIcon size={20} className="text-primary" />
                    </div>
                    <span className="font-mono text-sm text-primary/80 tracking-widest uppercase">
                        {facts[index].text}
                    </span>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
