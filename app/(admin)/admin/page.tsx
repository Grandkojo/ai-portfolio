"use client";

import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { addProject, addExperience, addSkill, Skill, subscribeToVisits, subscribeToProjects, subscribeToExperience, subscribeToSkills, subscribeToMessages, clearCollection } from "@/lib/db";
import { useEffect, useState } from "react";
import { Database } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [seeding, setSeeding] = useState(false);

    // Stats State
    const [visits, setVisits] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [experienceCount, setExperienceCount] = useState(0);
    const [skillCount, setSkillCount] = useState(0);
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        const unsubVisits = subscribeToVisits(setVisits);
        const unsubProjects = subscribeToProjects(data => setProjectCount(data.length));
        const unsubExperience = subscribeToExperience(data => setExperienceCount(data.length));
        const unsubSkills = subscribeToSkills(data => setSkillCount(data.length));
        const unsubMessages = subscribeToMessages(data => setMessageCount(data.length));

        return () => {
            unsubVisits();
            unsubProjects();
            unsubExperience();
            unsubSkills();
            unsubMessages();
        };
    }, []);

    const handleSeed = async () => {
        if (!confirm("This will DELETE ALL EXISTING DATA and reseeding from code. Continue?")) return;
        setSeeding(true);
        try {
            // Clear existing data
            await clearCollection("projects");
            await clearCollection("experience");
            await clearCollection("skills");

            // Seed Projects
            for (const [index, project] of PORTFOLIO_DATA.projects.entries()) {
                await addProject({
                    title: project.title,
                    subtitle: project.subtitle,
                    description: project.description,
                    tech: project.tech,
                    // @ts-ignore
                    imageUrl: project.imageUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
                    projectUrl: project.links.demo,
                    githubUrl: project.links.github,
                    order: index + 1
                });
            }

            // Seed Experience
            for (const [index, exp] of PORTFOLIO_DATA.experience.entries()) {
                await addExperience({
                    // @ts-ignore
                    type: exp.type || "Experience",
                    role: exp.role,
                    company: exp.company,
                    period: exp.period,
                    location: exp.location,
                    description: exp.description,
                    order: index + 1
                });
            }

            // Seed Skills
            if (PORTFOLIO_DATA.skillsDetail) {
                // @ts-ignore
                for (const skill of PORTFOLIO_DATA.skillsDetail) {
                    await addSkill(skill as unknown as Skill);
                }
            }

            alert("Database seeded successfully!");
        } catch (error) {
            console.error("Seeding Error:", error);
            alert("Error seeding database check console");
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-white/60">Welcome back, Traveler.</p>
                </div>
                <button
                    onClick={handleSeed}
                    disabled={seeding}
                    className="px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors flex items-center gap-2"
                >
                    <Database size={16} />
                    {seeding ? "Seeding..." : "Seed Database"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Visits (No link for now, maybe analytics page later) */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/20 hover:border-primary/50 transition-colors">
                    <h3 className="text-sm font-medium text-white/50 mb-2">Total Visits</h3>
                    <p className="text-4xl font-bold text-white">{visits.toLocaleString()}</p>
                </div>

                {/* Projects */}
                <Link href="/admin/projects" className="p-6 rounded-2xl bg-white/5 border border-white/20 hover:border-primary/50 transition-colors block group">
                    <h3 className="text-sm font-medium text-white/50 mb-2 group-hover:text-primary transition-colors">Projects</h3>
                    <p className="text-4xl font-bold text-accent">{projectCount}</p>
                </Link>

                {/* Experience */}
                <Link href="/admin/experience" className="p-6 rounded-2xl bg-white/5 border border-white/20 hover:border-primary/50 transition-colors block group">
                    <h3 className="text-sm font-medium text-white/50 mb-2 group-hover:text-primary transition-colors">Experience</h3>
                    <p className="text-4xl font-bold text-blue-400">{experienceCount}</p>
                </Link>

                {/* Skills */}
                <Link href="/admin/skills" className="p-6 rounded-2xl bg-white/5 border border-white/20 hover:border-primary/50 transition-colors block group">
                    <h3 className="text-sm font-medium text-white/50 mb-2 group-hover:text-primary transition-colors">Skills</h3>
                    <p className="text-4xl font-bold text-green-400">{skillCount}</p>
                </Link>

                {/* Messages */}
                <Link href="/admin/messages" className="p-6 rounded-2xl bg-white/5 border border-white/20 hover:border-primary/50 transition-colors block group">
                    <h3 className="text-sm font-medium text-white/50 mb-2 group-hover:text-primary transition-colors">Messages</h3>
                    <p className="text-4xl font-bold text-primary">{messageCount}</p>
                </Link>
            </div>
        </div>
    );
}
