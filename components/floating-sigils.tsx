"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const chars = ["⌬", "⎔", "⟁", "✺", "⌘", "⌥", "⏣"];

function Sigil({ x, y, delay, size, rotationDuration, char }: { x: string; y: string; delay: number; size: number; rotationDuration: number; char: string }) {
    return (
        <motion.div
            initial={{ opacity: 0.1, scale: 0.5 }}
            animate={{
                opacity: [0.1, 0.4, 0.1],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360],
                y: [0, -50]
            }}
            transition={{
                duration: 15 + Math.random() * 10, // Slower movement for background feel
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
                rotate: {
                    duration: rotationDuration,
                    repeat: Infinity,
                    ease: "linear"
                }

            }}
            className="absolute text-accent/30 font-mono pointer-events-none select-none" // Reduced opacity and removed strong glow
            style={{ left: x, top: y, fontSize: size }}
        >
            {char}
        </motion.div>
    );
}

export function FloatingSigils() {
    const [sigils, setSigils] = useState<{ id: number; x: string; y: string; delay: number; size: number; rotationDuration: number; char: string }[]>([]);

    useEffect(() => {
        const generatePosition = () => {
            // Avoid the center 40% of the screen (30% to 70%) to keep text clear
            // Also avoid bottom-left corner (Cosmic Facts area)

            let x, y, inCenterX, inCenterY, inBottomLeft;
            let attempts = 0;

            do {
                x = Math.random() * 100;
                y = Math.random() * 100;

                inCenterX = x > 30 && x < 70;
                inCenterY = y > 30 && y < 70;

                // Bottom left exclusion: x < 40% and y > 80%
                inBottomLeft = x < 40 && y > 80;

                attempts++;
            } while (((inCenterX && inCenterY) || inBottomLeft) && attempts < 50);

            return { x: `${x}%`, y: `${y}%` };
        };

        const newSigils = Array.from({ length: 25 }).map((_, i) => {
            const pos = generatePosition();
            return {
                id: i,
                x: pos.x,
                y: pos.y,
                delay: Math.random() * 5,
                size: 20 + Math.random() * 40,
                rotationDuration: 20 + Math.random() * 30,
                char: chars[Math.floor(Math.random() * chars.length)]
            };
        });
        setSigils(newSigils);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Removed internal background to prevent stacking darkness */}

            {sigils.map((s) => (
                <Sigil
                    key={s.id}
                    x={s.x}
                    y={s.y}
                    delay={s.delay}
                    size={s.size}
                    rotationDuration={s.rotationDuration}
                    char={s.char}
                />
            ))}

            {/* Code Lines drifting vertically */}
            <div className="absolute inset-0 opacity-20"> {/* Increased opacity */}
                <div className="absolute top-10 left-10 w-[1px] h-32 bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse" />
                <div className="absolute top-40 right-20 w-[1px] h-48 bg-gradient-to-b from-transparent via-accent to-transparent animate-pulse [animation-delay:2s]" />
                <div className="absolute bottom-20 left-1/3 w-[1px] h-24 bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse [animation-delay:4s]" />
            </div>
        </div>
    );
}
