"use client";

import { useState, useEffect, useCallback } from "react";
import { Home, Code2, Briefcase, Mail, PenLine } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useRouter, usePathname } from "next/navigation";

const NAV_ITEMS = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Work", icon: Code2 },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "writing", label: "Writing", icon: PenLine },
    { id: "contact", label: "Contact", icon: Mail },
];

export function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );

        NAV_ITEMS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Handle hash scrolling after navigation
    useEffect(() => {
        const handleHashScroll = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash) {
                // Retry scroll to handle dynamic rendering / data loading
                const scrollToTarget = () => {
                    const el = document.getElementById(hash);
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                        return true;
                    }
                    return false;
                };

                if (!scrollToTarget()) {
                    const timer1 = setTimeout(scrollToTarget, 100);
                    const timer2 = setTimeout(scrollToTarget, 300);
                    const timer3 = setTimeout(scrollToTarget, 600);
                    return () => {
                        clearTimeout(timer1);
                        clearTimeout(timer2);
                        clearTimeout(timer3);
                    };
                }
            }
        };

        handleHashScroll();
        window.addEventListener("hashchange", handleHashScroll);
        return () => window.removeEventListener("hashchange", handleHashScroll);
    }, [pathname]);

    const scrollTo = useCallback((id: string) => {
        if (!isHome) {
            router.push(`/#${id}`);
            return;
        }
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    }, [isHome, router]);

    const goHome = useCallback(() => {
        if (!isHome) {
            router.push("/");
        } else {
            const el = document.getElementById("home");
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }
    }, [isHome, router]);

    return (
        <>
            {/* ── Desktop Top Nav ──────────────────────── */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ${
                    scrolled
                        ? "bg-background/80 backdrop-blur-lg border-b border-border"
                        : "bg-transparent"
                }`}
            >
                <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button
                        onClick={goHome}
                        className="text-sm font-medium tracking-tight text-foreground hover:text-accent transition-colors"
                    >
                        Ernest Essien
                    </button>

                    <div className="flex items-center gap-1">
                        {NAV_ITEMS.slice(1).map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
                                    isHome && activeSection === id
                                        ? "text-accent"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                        <div className="w-px h-5 bg-border mx-2" />
                        <ThemeToggle />
                    </div>
                </nav>
            </header>

            {/* ── Mobile Top Bar ───────────────────────── */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
                    scrolled
                        ? "bg-background/80 backdrop-blur-lg border-b border-border"
                        : "bg-transparent"
                }`}
            >
                <nav className="px-5 h-14 flex items-center justify-between">
                    <button
                        onClick={goHome}
                        className="text-sm font-medium tracking-tight text-foreground"
                    >
                        Ernest Essien
                    </button>
                    <ThemeToggle />
                </nav>
            </header>

            {/* ── Mobile Bottom Pill Nav ────────────────── */}
            <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden">
                <div className="flex items-center gap-1 bg-[#1A1A1C] rounded-full px-2.5 py-2 shadow-2xl shadow-black/40 border border-white/[0.08]">
                    {NAV_ITEMS.map(({ id, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => id === "home" ? goHome() : scrollTo(id)}
                            className={`relative p-2.5 rounded-full transition-all duration-200 ${
                                isHome && activeSection === id
                                    ? "bg-white/15 text-white"
                                    : "text-white/50 hover:text-white/80"
                            }`}
                            aria-label={id}
                        >
                            <Icon size={18} strokeWidth={isHome && activeSection === id ? 2 : 1.5} />
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
}
