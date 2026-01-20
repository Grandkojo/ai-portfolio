"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Bot, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { MouseEvent, useRef, useState } from "react";

interface ProjectProps {
    title: string;
    subtitle: string;
    description: string;
    tech: string[];
    links: { demo?: string; github?: string };
    imageUrl?: string;
}

export function ProjectCard({ project, onAskAI, index = 0 }: { project: ProjectProps; onAskAI: (project: string) => void; index?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(0, { stiffness: 100, damping: 30 });
    const rotateY = useSpring(0, { stiffness: 100, damping: 30 });

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        if (!containerRef.current) return;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        // Calculate rotation based on mouse position
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const rotateXValue = ((clientY - centerY) / height) * 20; // Max 20deg rotation
        const rotateYValue = ((clientX - centerX) / width) * -20;

        rotateX.set(rotateXValue);
        rotateY.set(rotateYValue);

        // Spotlight calculation
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                rotateX.set(0);
                rotateY.set(0);
            }}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            }}
            className="group relative rounded-[2rem] bg-[#050505] border border-white/5 overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(138,43,226,0.15)] transition-shadow duration-500"
        >
            {/* Obsidian Reflection (Glass Glare) */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

            {/* Inner Glow Border */}
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/20 group-hover:ring-primary/40 transition-all duration-500 z-20 pointer-events-none" />

            {/* Cover Image */}
            {project.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden border-b border-white/5">
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                </div>
            )}

            <div className="relative h-full p-8 flex flex-col z-30">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white border border-blue-400/30 mb-2 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                        >
                            {t}
                        </span>
                    ))}
                </div>
                        
                    </div>

                    <div className="flex gap-3">
                        {project.links.github && (
                            <a
                                href={project.links.github}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all hover:scale-110"
                                title="View Code"
                            >
                                <Github size={18} />
                            </a>
                        )}
                        {project.links.demo && (
                            <a
                                href={project.links.demo}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all hover:scale-110"
                                title="Live Demo"
                            >
                                <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-8 leading-relaxed line-clamp-4">
                    {project.description}
                </p>

                {/* Tech Stack - Bento Style Pills */}
                

                {/* Action Button */}
                <button
                    onClick={() => onAskAI(project.title)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-white/20 hover:border-primary/50 text-white font-medium flex items-center justify-center gap-2 transition-all group-hover:shadow-[0_0_20px_rgba(123,44,191,0.2)]"
                >
                    <Bot size={18} className="text-primary" />
                    <span>Ask AI about this project</span>
                </button>
            </div>
        </motion.div>
    );
}
