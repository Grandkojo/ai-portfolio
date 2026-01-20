"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    History,
    MessageSquare,
    Settings,
    LogOut,
    Sparkles,
    Menu,
    X
} from "lucide-react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Experience", href: "/admin/experience", icon: History },
    { name: "Skills", href: "/admin/skills", icon: Sparkles },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-50
                w-64 h-screen border-r border-white/20 bg-black/95 md:bg-black/80
                flex flex-col
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                <div className="p-6 border-b border-white/20 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                        <Sparkles size={16} className="text-primary" />
                    </div>
                    <span className="font-bold text-lg tracking-light">Admin<span className="text-white/40">Portal</span></span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4 px-2 mt-2">
                        Menu
                    </div>
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                    ? "bg-white/10 text-white border border-white/20"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon
                                    size={18}
                                    className={isActive ? "text-primary" : "text-white/40 group-hover:text-white/80 transition-colors"}
                                />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/20">
                    <button
                        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                        className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-white/50 hover:bg-white/5 hover:text-red-400 transition-colors text-sm font-medium"
                    >
                        <LogOut size={18} />
                        Disconnect
                    </button>
                </div>
            </aside>
        </>
    );
}
