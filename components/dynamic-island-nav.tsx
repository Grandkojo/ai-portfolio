"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, User, Mail, Sparkles, Menu, X, Cpu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
    { name: "Home", href: "/", id: "home", icon: <Home size={20} /> },
    { name: "Projects", href: "/#projects", id: "projects", icon: <Briefcase size={20} /> },
    { name: "Services", href: "/services", id: "services", icon: <Cpu size={20} /> },
    { name: "About", href: "/#about", id: "about", icon: <User size={20} /> },
    { name: "Contact", href: "/#contact", id: "contact", icon: <Mail size={20} /> },
];

export function DynamicIslandNav() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (pathname !== "/") {
            setActiveSection("");
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const sectionIds = ["home", "projects", "about", "contact"];
        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        // Set initial active section
        const currentHash = window.location.hash.replace("#", "");
        if (currentHash && sectionIds.includes(currentHash)) {
            setActiveSection(currentHash);
        } else if (window.scrollY < 100) {
            setActiveSection("home");
        }

        return () => observer.disconnect();
    }, [pathname]);

    return (
        <>
            <div className="md:hidden">
                <MobileNav activeSection={activeSection} pathname={pathname} />
            </div>
            <div className="hidden md:block">
                <DesktopNav scrolled={scrolled} pathname={pathname} activeSection={activeSection} />
            </div>
        </>
    );
}

function DesktopNav({ scrolled, pathname, activeSection }: { scrolled: boolean; pathname: string; activeSection: string }) {
    return (
        <motion.div
            className={`fixed top-6 left-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300 ${scrolled
                ? "bg-black/80 border-white/20 backdrop-blur-md shadow-lg shadow-primary/10"
                : "bg-white/5 border-white/10 backdrop-blur-sm"
                }`}
            style={{ x: "-50%" }}
        >
            {navItems.map((item) => {
                const isActive = item.href === "/services"
                    ? pathname === "/services"
                    : pathname === "/" && (activeSection === item.id || (!activeSection && item.id === "home"));

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="relative px-4 py-2 rounded-full flex items-center gap-2 group transition-colors"
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white/10 rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className={`relative z-10 flex items-center gap-2 ${isActive ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                            {item.icon}
                            <span className="text-sm font-medium">{item.name}</span>
                        </span>
                    </Link>
                );
            })}
        </motion.div>
    );
}

function MobileNav({ activeSection, pathname }: { activeSection: string; pathname: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] flex justify-center">
            <motion.div
                initial={false}
                animate={{
                    width: isOpen ? "100%" : "auto",
                    height: isOpen ? "auto" : "50px",
                    borderRadius: "25px"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`flex flex-col overflow-hidden bg-black/90 border border-white/20 backdrop-blur-xl shadow-2xl ${isOpen ? "p-4" : "px-2 py-1"}`}
            >
                {/* Header Row (Always Visible) */}
                <div className="flex items-center justify-between gap-4 w-full">
                    {!isOpen && (
                        <div className="flex items-center gap-2 px-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-white/80 text-sm font-medium">Menu</span>
                        </div>
                    )}

                    {isOpen && (
                        <span className="text-white font-bold ml-2">Navigation</span>
                    )}

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-95 transition-transform"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-2 mt-4"
                        >
                            {navItems.map((item) => {
                                const isActive = item.href === "/services"
                                    ? pathname === "/services"
                                    : pathname === "/" && (activeSection === item.id || (!activeSection && item.id === "home"));

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${isActive ? "bg-white/10" : "hover:bg-white/5 active:bg-white/10"}`}
                                    >
                                        <div className={`p-2 rounded-lg ${isActive ? "bg-primary text-white" : "bg-primary/20 text-primary"}`}>
                                            {item.icon}
                                        </div>
                                        <span className={`font-medium text-lg ${isActive ? "text-white" : "text-white/60"}`}>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
