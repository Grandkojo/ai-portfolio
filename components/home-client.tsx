"use client";

import { Hero } from "@/components/hero";
import { ProjectsGrid } from "@/components/projects-grid";
import { SkillsSection } from "@/components/skills-section";
import { EducationSection } from "@/components/education-section";
import { Chatbot } from "@/components/chatbot";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ContactSection } from "@/components/contact";
import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { Project, Skill, Experience } from "@/lib/db";
import { ServicesTeaser } from "@/components/services-teaser";
import { useSearchParams } from "next/navigation";

interface HomeClientProps {
    projects: Project[];
    skills: Skill[];
    experience: Experience[];
}

export function HomeClient({ projects, skills, experience }: HomeClientProps) {
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

    const handleAskAI = (context: string) => {
        setChatContext(context);
        setIsChatOpen(true);
    };

    return (
        <main className="min-h-screen text-foreground selection:bg-primary selection:text-white pb-32 overflow-x-hidden relative">
            <Hero onOpenChat={() => setIsChatOpen(true)} />
            <ProjectsGrid projects={projects} onAskAI={handleAskAI} />

            <ServicesTeaser />

            <ExperienceTimeline experience={experience} />
            <EducationSection experience={experience} />
            <SkillsSection skills={skills} />

            <Chatbot
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                initialContext={chatContext}
            />

            <ContactSection />

            {/* Floating Action Button */}
            {!isChatOpen && (
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-6 right-4 md:bottom-8 md:right-8 group z-[100]"
                >
                    {/* The Crystal Orb */}
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-[0_0_30px_rgba(138,43,226,0.6)] animate-pulse-slow overflow-hidden">
                        {/* Inner Rotating Core */}
                        <div className="absolute inset-1 rounded-full bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center">
                            <div className="w-10 h-10 bg-gradient-to-tr from-primary/50 to-transparent rounded-full animate-spin-slow" />
                        </div>
                        {/* Icon */}
                        <MessageSquare size={24} className="relative z-20 text-white group-hover:scale-110 transition-transform duration-300" />

                        {/* Orb Glare */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent z-20" />
                    </div>
                </button>
            )}
        </main>
    );
}
