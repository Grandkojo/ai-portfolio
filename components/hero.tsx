"use client";

import { useState, useEffect } from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import Image from "next/image";

export function Hero({ onOpenChat }: { onOpenChat: () => void }) {
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const h = new Date().getHours();
        setGreeting(h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening");
    }, []);

    const scrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            className="relative min-h-0 md:min-h-[100dvh] flex items-start md:items-center pt-44 pb-16 md:pt-0 md:pb-0"
        >
            <div className="w-full max-w-5xl mx-auto px-5 md:px-6">
                <div className="flex flex-row items-start md:items-center justify-between gap-6 md:gap-16">
                    {/* ── Text ──────────────────────── */}
                    <div className="flex-1 text-left">
                        <p className="text-sm text-muted-foreground mb-4 animate-fade-in">
                            {greeting || "Hello"}, I&apos;m
                        </p>

                        <h1
                            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 animate-slide-up"
                            style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
                        >
                            Ernest Essien
                        </h1>

                        <p
                            className="text-sm md:text-lg text-muted-foreground max-w-lg leading-relaxed text-balance animate-slide-up"
                            style={{ animationDelay: "0.25s", animationFillMode: "backwards" }}
                        >
                            Software Engineer specializing in{" "}
                            <span className="text-foreground font-medium">Backend Systems</span> &{" "}
                            <span className="text-foreground font-medium">AI</span>.
                            Building intelligent solutions where code meets creativity.
                        </p>
                    </div>

                    {/* ── Portrait ──────────────────── */}
                    <div
                        className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden
                                    ring-1 ring-border animate-fade-in flex-shrink-0"
                        style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
                    >
                        <Image
                            src="/images/hero-3.png"
                            alt="Ernest Essien"
                            fill
                            className="object-cover object-[center_30%]"
                            priority
                            sizes="(max-width: 768px) 80px, 256px"
                        />
                    </div>
                </div>

                {/* ── CTA Buttons ──────────────────── */}
                <div
                    className="flex flex-col sm:flex-row gap-3 mt-8 animate-slide-up md:justify-start"
                    style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
                >
                    <button
                        onClick={onOpenChat}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full
                                   bg-accent text-accent-foreground text-sm font-medium
                                   hover:opacity-90 transition-opacity duration-200"
                    >
                        <MessageSquare size={15} />
                        Chat with Essy AI
                    </button>
                    <button
                        onClick={scrollToProjects}
                        className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full
                                   border border-border text-sm font-medium text-foreground
                                   hover:bg-muted transition-colors duration-200"
                    >
                        View Work
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
