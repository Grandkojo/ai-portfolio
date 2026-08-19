"use client";

import { Experience } from "@/lib/db";
import { ScrollReveal } from "@/components/scroll-reveal";

export function ExperienceTimeline({ experience }: { experience: Experience[] }) {
    const workExperience = experience.filter((e) => e.type === "Experience");
    const education = experience.filter((e) => e.type === "Education" || e.type === "Certification");

    return (
        <section id="experience" className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-5 md:px-6">
                {/* ── Experience ────────────── */}
                {workExperience.length > 0 && (
                    <>
                        <ScrollReveal>
                            <div className="flex items-center gap-4 mb-10">
                                <h2 className="text-lg font-medium text-foreground">Experience</h2>
                                <div className="flex-1 h-px bg-border" />
                            </div>
                        </ScrollReveal>

                        <div className="space-y-8 mb-20">
                            {workExperience.map((exp, i) => (
                                <ScrollReveal key={exp.id || exp.role} delay={i * 0.08}>
                                    <div className="group">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
                                            <h3 className="text-base font-medium text-foreground">
                                                {exp.role}
                                            </h3>
                                            <span className="text-sm text-accent">{exp.company}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                            <span>{exp.period}</span>
                                            {exp.location && (
                                                <>
                                                    <span className="w-1 h-1 rounded-full bg-border" />
                                                    <span>{exp.location}</span>
                                                </>
                                            )}
                                        </div>
                                        {exp.description.length > 0 && (
                                            <ul className="space-y-1.5">
                                                {exp.description.map((d, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-border"
                                                    >
                                                        {d}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </>
                )}

                {/* ── Education ─────────────── */}
                {education.length > 0 && (
                    <>
                        <ScrollReveal>
                            <div className="flex items-center gap-4 mb-10">
                                <h2 className="text-lg font-medium text-foreground">Education</h2>
                                <div className="flex-1 h-px bg-border" />
                            </div>
                        </ScrollReveal>

                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <ScrollReveal key={edu.id || edu.role} delay={i * 0.08}>
                                    <div>
                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                                            <h3 className="text-base font-medium text-foreground">
                                                {edu.role}
                                            </h3>
                                            <span className="text-sm text-accent">{edu.company}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span>{edu.period}</span>
                                            {edu.location && (
                                                <>
                                                    <span className="w-1 h-1 rounded-full bg-border" />
                                                    <span>{edu.location}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
