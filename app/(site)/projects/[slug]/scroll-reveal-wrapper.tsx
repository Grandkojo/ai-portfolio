"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ProjectScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

const directionOffset = {
    up: { x: 0, y: 24 },
    down: { x: 0, y: -24 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
};

export function ProjectScrollReveal({
    children,
    className,
    delay = 0,
    direction = "up",
}: ProjectScrollRevealProps) {
    const offset = directionOffset[direction];

    return (
        <motion.div
            initial={{ opacity: 0, x: offset.x, y: offset.y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
