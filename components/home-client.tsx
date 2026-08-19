"use client";

import { Hero } from "@/components/hero";
import { ProjectsGrid } from "@/components/projects-grid";
import { SkillsSection } from "@/components/skills-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { WritingSection } from "@/components/writing-section";
import { ContactSection } from "@/components/contact";
import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { Project, Skill, Experience } from "@/lib/db";
import { BlogPost } from "@/lib/blog-data";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy load the chatbot — only when opened
const Chatbot = dynamic(() => import("@/components/chatbot").then((m) => m.Chatbot), {
    ssr: false,
});

interface HomeClientProps {
    projects: Project[];
    skills: Skill[];
    experience: Experience[];
    featuredPosts: BlogPost[];
}

export function HomeClient({ projects, skills, experience, featuredPosts }: HomeClientProps) {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatContext, setChatContext] = useState("");
    const searchParams = useSearchParams();

    useEffect(() => {
        const chatMsg = searchParams.get("chat");
        if (chatMsg) {
            setChatContext(decodeURIComponent(chatMsg));
            setIsChatOpen(true);
        }
    }, [searchParams]);

    useEffect(() => {
        const key = `visit-tracked-${new Date().toISOString().slice(0, 10)}`;
        if (sessionStorage.getItem(key)) return;

        fetch("/api/analytics/visit", { method: "POST" })
            .then(() => sessionStorage.setItem(key, "1"))
            .catch(() => {
                // Ignore analytics failures.
            });
    }, []);

    const handleAskAI = (context: string) => {
        setChatContext(context);
        setIsChatOpen(true);
    };

    return (
        <main className="min-h-screen">
            <Hero onOpenChat={() => setIsChatOpen(true)} />
            <ProjectsGrid projects={projects} />
            <ExperienceTimeline experience={experience} />
            <SkillsSection skills={skills} />
            <WritingSection posts={featuredPosts} />
            <ContactSection />

            {/* ── Chatbot ─────────────────────────── */}
            {isChatOpen && (
                <Chatbot
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    initialContext={chatContext}
                />
            )}

            {/* ── Chat FAB (desktop only — mobile uses bottom nav space) ── */}
            {!isChatOpen && (
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-8 right-6 z-40 hidden md:flex
                               w-11 h-11 items-center justify-center rounded-full
                               bg-accent text-accent-foreground shadow-lg
                               hover:opacity-90 transition-all duration-200"
                    aria-label="Open AI Chat"
                >
                    <MessageSquare size={18} />
                </button>
            )}

            {/* ── Chat FAB (mobile — above bottom nav) ── */}
            {!isChatOpen && (
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-20 right-4 z-40 md:hidden
                               w-10 h-10 flex items-center justify-center rounded-full
                               bg-accent text-accent-foreground shadow-lg
                               hover:opacity-90 transition-all duration-200"
                    aria-label="Open AI Chat"
                >
                    <MessageSquare size={16} />
                </button>
            )}
        </main>
    );
}
