"use client";

import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/db";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useRouter } from "next/navigation";

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/projects/${project.slug || project.id}`);
    };

    return (
        <ScrollReveal delay={index * 0.08}>
            <article
                onClick={handleClick}
                className="group relative rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_-12px] hover:shadow-accent/10 cursor-pointer"
            >
                {/* ── Header ─────────── */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-medium text-card-foreground group-hover:text-accent transition-colors duration-200 leading-snug">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={`GitHub: ${project.title}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github size={15} />
                            </a>
                        )}
                        {project.projectUrl && (
                            <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={`Visit: ${project.title}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={15} />
                            </a>
                        )}
                    </div>
                </div>

                {/* ── Description ────── */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {project.subtitle || project.description}
                </p>

                {/* ── Tech Tags ──────── */}
                <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 5).map((t) => (
                        <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </article>
        </ScrollReveal>
    );
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
    if (!projects.length) return null;

    return (
        <section id="projects" className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-5 md:px-6">
                {/* ── Section Header ── */}
                <ScrollReveal>
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-lg font-medium text-foreground">Selected Work</h2>
                        <div className="flex-1 h-px bg-border" />
                    </div>
                </ScrollReveal>

                {/* ── Grid ──────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id || project.title} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
