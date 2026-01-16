"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, MessageSquare, Bot, Code2, Sparkles } from "lucide-react";
import { Typewriter } from "./typewriter";

export function Hero({ onOpenChat }: { onOpenChat: () => void }) {
    const hours = new Date().getHours();
    const greeting = hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";

    const scrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-32"> {/* Added pb-32 to shift content up */}
            {/* Dynamic Background - Moved to Global Layout */}

            {/* Decorative Orbs (Darker & Subtler for Void Theme) */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-float z-0" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen animate-float [animation-delay:2s] z-0" />

            <div className="container relative z-10 px-4">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-sm text-primary-foreground/80 shadow-[0_0_15px_rgba(138,43,226,0.1)]">
                            <Terminal size={14} />
                            <span className="font-mono">AI-Powered Portfolio</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-bold mb-6 tracking-tight leading-tight"
                    >
                        <span className="block mb-3 text-xl md:text-3xl text-muted-foreground font-light">{greeting}, I&apos;m</span>
                        <span className="block text-4xl sm:text-5xl md:text-7xl h-auto min-h-[1.2em] font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 break-words px-2">
                            <Typewriter words={["Ernest", "Kojo", "Owusu", "Essien", "Ernest Kojo Owusu Essien"]} />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed px-4"
                    >
                        Software Engineer specializing in <span className="text-white font-medium">Backend Systems</span> & <span className="text-white font-medium">AI</span>.
                        <br className="hidden md:block" />
                        <span className="inline-block mt-2">Crafting intelligent solutions where code meets creativity.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <button
                            onClick={onOpenChat}
                            className="group relative px-8 py-4 rounded-full bg-primary text-white font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(157,78,221,0.5)] flex items-center justify-center gap-2 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <Bot size={20} />
                            Chat with my AI
                        </button>
                        <button
                            onClick={scrollToProjects}
                            className="group px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2 hover:border-primary/50"
                        >
                            <Code2 size={20} />
                            View Projects
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

