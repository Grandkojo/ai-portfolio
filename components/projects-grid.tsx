"use client";

import { Project, subscribeToProjects } from "@/lib/db";
import { ProjectCard } from "./project-card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface ProjectsGridProps {
    onAskAI: (context: string) => void;
}

export function ProjectsGrid({ onAskAI }: ProjectsGridProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToProjects((data) => {
            setProjects(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <section id="projects" className="py-20 px-4 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    A selection of my work in AI, Backend Systems, and Full-Stack Development.
                    Ask my AI assistant about the technical details of any project.
                </p>
            </motion.div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-primary w-12 h-12" />
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id || index}
                            project={{
                                title: project.title,
                                subtitle: project.tech[0] || "Project", // Fallback
                                tech: project.tech,
                                description: project.description,
                                links: { demo: project.projectUrl, github: project.githubUrl },
                                imageUrl: project.imageUrl
                            }}
                            onAskAI={(title) => onAskAI(`Tell me about the technical approach for the ${title} project.`)}
                            index={index}
                        />
                    ))}
                </motion.div>
            )}
        </section>
    );
}
