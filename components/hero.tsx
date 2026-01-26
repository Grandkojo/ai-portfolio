"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal, MessageSquare, Bot, Code2, Sparkles } from "lucide-react";
import { Typewriter } from "./typewriter";
import Image from "next/image";
import { getUserLocation } from "@/app/actions";

const heroImages = [
    '/images/hero_portrait.jpg',
    '/images/hero-1.jpg',
    '/images/hero-2.jpg',
    '/images/hero-3.png',
    '/images/hero-4.jpg'
];

export function Hero({ onOpenChat }: { onOpenChat: () => void }) {
    const [greeting, setGreeting] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const updateGreeting = async () => {
            const hours = new Date().getHours();
            const timeGreeting = hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";

            try {
                // Default to time-based first
                setGreeting(timeGreeting);

                // Try to get location from server action
                const country = await getUserLocation();

                const greetings: Record<string, string> = {
                    GH: "Akwaaba", // Ghana
                    FR: "Bonjour", // France
                    ES: "Hola",    // Spain
                    DE: "Guten Tag", // Germany
                    JP: "Konnichiwa", // Japan
                    CN: "Ni Hao",  // China
                    KR: "Annyeonghaseyo", // Korea
                    IN: "Namaste", // India
                    SA: "As-salamu alaykum", // Saudi Arabia
                    AE: "As-salamu alaykum", // UAE
                    IT: "Ciao",    // Italy
                    PT: "Olá",     // Portugal
                    BR: "Olá",     // Brazil
                    RU: "Privet",  // Russia
                    NL: "Hallo",   // Netherlands
                    SE: "Hej",     // Sweden
                    NO: "Hei",     // Norway
                    DK: "Hej",     // Denmark
                };

                if (country && greetings[country]) {
                    setGreeting(greetings[country]);
                }
            } catch (error) {
                // Fallback to time-based greeting is already set
                console.log("Using time-based greeting");
            }
        };

        updateGreeting();
    }, []);

    const scrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-32 pt-20">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-float z-0" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen animate-float [animation-delay:2s] z-0" />

            <div className="container relative z-10 px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Column: Text Content */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
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
                            <span className="block mb-3 text-xl md:text-3xl text-muted-foreground font-light">{greeting || "Hello"}, I&apos;m</span>
                            <span className="block text-4xl sm:text-5xl md:text-7xl h-auto min-h-[1.2em] font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 break-words px-2 lg:px-0">
                                <Typewriter words={["Ernest", "Kojo", "Owusu", "Essien", "Ernest Kojo Owusu Essien"]} />
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-base md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed mx-5 lg:mx-0"
                        >
                            Software Engineer specializing in <span className="text-white font-medium">Backend Systems</span> & <span className="text-white font-medium">AI</span>.
                            <br className="hidden md:block" />
                            <span className="inline-block mt-2">Crafting intelligent solutions where code meets creativity.</span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 w-[85%]"
                        >
                            <motion.button
                                onClick={onOpenChat}
                                animate={{
                                    boxShadow: [
                                        "0 0 0px rgba(157,78,221,0)",
                                        "0 0 20px rgba(157,78,221,0.4)",
                                        "0 0 0px rgba(157,78,221,0)"
                                    ]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(157,78,221,0.6)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-2 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <Bot size={20} className="animate-bounce" />
                                Chat with my AI
                            </motion.button>
                            <button
                                onClick={scrollToProjects}
                                className="group px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2 hover:border-primary/50"
                            >
                                <Code2 size={20} />
                                View Projects
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Column: The Void Walker Portrait */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="flex-1 relative w-full max-w-md lg:max-w-lg aspect-[3/4] lg:h-[600px] flex items-end justify-center mt-8 lg:mt-12"
                    >
                        {/* Rim Light Effect behind the subject */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-60 blur-3xl z-0" />

                        {/* Image Container with Gradient Masks */}
                        <div className="relative w-full h-full z-10 rounded-3xl overflow-hidden lg:overflow-visible">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={currentImageIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-0 z-10"
                                    style={{
                                        maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                                        WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
                                    }}
                                >
                                    <Image
                                        src={heroImages[currentImageIndex]}
                                        alt="Hero Portrait"
                                        fill
                                        className={`object-cover ${currentImageIndex === 3 ? 'object-center' : 'object-top'}`}
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Overlay to darken and tint the image slightly to fit the void */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />
                            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-20" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
