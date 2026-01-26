"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, User, Mail, Sparkles, Menu, X, Cpu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Projects", href: "/#projects", icon: <Briefcase size={20} /> },
    { name: "Services", href: "/services", icon: <Cpu size={20} /> },
    { name: "About", href: "/#about", icon: <User size={20} /> },
    { name: "Contact", href: "/#contact", icon: <Mail size={20} /> },
];

export function DynamicIslandNav() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className="md:hidden">
                <MobileNav />
            </div>
            <div className="hidden md:block">
                <DesktopNav scrolled={scrolled} pathname={pathname} />
            </div>
        </>
    );
}

function DesktopNav({ scrolled, pathname }: { scrolled: boolean; pathname: string }) {
    return (
        <motion.div
            className={`fixed top-6 left-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300 ${scrolled
                ? "bg-black/80 border-white/20 backdrop-blur-md shadow-lg shadow-primary/10"
                : "bg-white/5 border-white/10 backdrop-blur-sm"
                }`}
            style={{ x: "-50%" }}
        >
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
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

function MobileNav() {
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
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors"
                                >
                                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                                        {item.icon}
                                    </div>
                                    <span className="text-white font-medium text-lg">{item.name}</span>
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
