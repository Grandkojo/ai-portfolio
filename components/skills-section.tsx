"use client";

import { Skill } from "@/lib/db";
import { ScrollReveal } from "@/components/scroll-reveal";

const CATEGORY_ORDER = ["Frontend", "Backend", "AI/ML", "Database", "Tools", "Other"] as const;

export function SkillsSection({ skills }: { skills: Skill[] }) {
    if (!skills.length) return null;

    // Group skills by category
    const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
        const cat = skill.category || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    // Sort categories by defined order
    const sortedCategories = CATEGORY_ORDER.filter((c) => grouped[c]);

    return (
        <section className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-5 md:px-6">
                <ScrollReveal>
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-lg font-medium text-foreground">Skills</h2>
                        <div className="flex-1 h-px bg-border" />
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedCategories.map((category, i) => (
                        <ScrollReveal key={category} delay={i * 0.08}>
                            <div>
                                <h3 className="text-sm font-medium text-accent mb-3">{category}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {grouped[category].map((skill) => (
                                        <span
                                            key={skill.id || skill.name}
                                            className="text-sm px-3 py-1 rounded-full border border-border text-muted-foreground
                                                       hover:text-foreground hover:border-accent/30 transition-colors duration-200 cursor-default"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
