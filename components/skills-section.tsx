import { Skill } from "@/lib/db";
import { motion } from "framer-motion";
import { Code2, Database, Layout, Server, Wrench } from "lucide-react";
import { useState } from "react";

interface SkillsSectionProps {
    skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const categories = ["All", "Frontend", "Backend", "Database", "Tools", "AI/ML", "Other"];

    const filteredSkills = activeCategory === "All"
        ? skills
        : skills.filter(skill => skill.category === activeCategory);

    const getIcon = (category: string) => {
        switch (category) {
            case "Frontend": return <Layout size={20} />;
            case "Backend": return <Server size={20} />;
            case "Database": return <Database size={20} />;
            case "AI/ML": return <Code2 size={20} />;
            case "Tools": return <Wrench size={20} />;
            default: return <Code2 size={20} />;
        }
    };

    return (
        <section className="py-24 container mx-auto px-4 relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent">
                    Technical Arsenal
                </h2>
                <div className="h-1 w-24 bg-primary mx-auto rounded-full mb-8" />

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                ? "bg-primary text-white shadow-[0_0_15px_rgba(138,43,226,0.5)]"
                                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {filteredSkills.map((skill, index) => (
                    <motion.div
                        key={skill.id || index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group p-6 rounded-2xl bg-white/5 border border-white/20 hover:border-primary/30 transition-all hover:-translate-y-1"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    {getIcon(skill.category)}
                                </div>
                                <h3 className="font-bold text-white text-lg">{skill.name}</h3>
                            </div>
                            <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded">
                                {skill.experience}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Proficiency</span>
                                <span className="text-white font-mono">{skill.level * 10}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level * 10}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}
