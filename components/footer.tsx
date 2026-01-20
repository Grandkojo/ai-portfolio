"use client";

import { Github, Linkedin, Twitter, Terminal, CheckCircle2, ArrowUp } from "lucide-react";
import { VisitCounter } from "@/components/visit-counter";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative border-t border-white/20 bg-[#050505] z-40 overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

                    {/* Column 1: Identity */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
                            <div className="p-2 rounded-lg bg-white/5 border border-white/20">
                                <Terminal size={20} className="text-primary" />
                            </div>
                            <span>Ernest Kojo Owusu Essien</span>
                        </div>
                        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                            Crafting digital experiences at the edge of chaos and order.
                            Specializing in Backend Systems, AI, and Void Alchemy.
                        </p>
                    </div>

                    {/* Column 2: Connect */}
                    <div className="space-y-4 md:text-center">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest text-white/50">Connect</h4>
                        <div className="flex gap-4 md:justify-center">
                            <SocialLink href="https://github.com/Grandkojo" icon={<Github size={20} />} label="GitHub" />
                            <SocialLink href="https://www.linkedin.com/in/ernest-essien-kojo" icon={<Linkedin size={20} />} label="LinkedIn" />
                            <SocialLink href="https://x.com/grandkojo" icon={<InventoryXIcon />} label="X (Twitter)" />
                        </div>
                    </div>

                    {/* Column 3: Status & Tech */}
                    <div className="space-y-4 md:text-right">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest text-white/50">System Status</h4>
                        <div className="flex items-center md:justify-end gap-2 text-sm font-mono text-green-400">
                            <div className="relative">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute inset-0 opacity-75" />
                                <div className="w-2 h-2 bg-green-500 rounded-full relative" />
                            </div>
                            <span>ALL SYSTEMS NOMINAL</span>
                        </div>
                        <p className="text-xs text-white/30">
                            Built with Next.js 14, Tailwind, & Gemini AI
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p className="text-xs text-white/30 text-center md:text-left">&copy; {new Date().getFullYear()} Ernest Kojo Owusu Essien. All rights reserved.</p>
                        <VisitCounter />
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 hover:border-primary/50 text-white/70 hover:text-white transition-all group text-sm font-medium shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                    >
                        <span>Return to Surface</span>
                        <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform text-primary" />
                    </button>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white hover:border-primary/50 hover:scale-110 transition-all duration-300 group"
            title={label}
        >
            {icon}
        </a>
    );
}

// Custom X Icon since Lucide doesn't have the new logo yet
function InventoryXIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}
