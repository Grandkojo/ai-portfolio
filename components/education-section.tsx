"use client";

import { Experience, subscribeToExperience } from "@/lib/db";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function EducationSection() {
    const [items, setItems] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToExperience((data) => {
            // Filter for Education and Certifications
            const eduAndCerts = data.filter(item =>
                item.type === 'Education' || item.type === 'Certification'
            );
            setItems(eduAndCerts);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Split into two columns: Education and Certifications
    const education = items.filter(i => i.type === 'Education');
    const certifications = items.filter(i => i.type === 'Certification');

    return (
        <section className="py-24 container mx-auto px-4 relative bg-black/20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Qualifications
                </h2>
                <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
            </motion.div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-primary w-12 h-12" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Education Column */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 mb-8">
                            <GraduationCap className="text-accent w-8 h-8" />
                            <h3 className="text-2xl font-bold text-white">Education</h3>
                        </div>
                        {education.map((edu, index) => (
                            <motion.div
                                key={edu.id || index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="obsidian-card p-6 rounded-2xl border border-white/20 group hover:border-accent/40 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{edu.role}</h4>
                                        <p className="text-white/70 font-medium">{edu.company}</p>
                                    </div>
                                    <span className="text-xs font-mono text-accent/80 bg-accent/10 px-2 py-1 rounded border border-accent/20">
                                        {edu.period}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-white/40 mb-4">
                                    <MapPin size={14} />
                                    {edu.location}
                                </div>
                                <div className="text-white/60 text-sm leading-relaxed">
                                    {edu.description.map((desc, i) => <p key={i}>{desc}</p>)}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Certifications Column */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 mb-8">
                            <Award className="text-primary w-8 h-8" />
                            <h3 className="text-2xl font-bold text-white">Certifications</h3>
                        </div>
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.id || index}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="obsidian-card p-6 rounded-2xl border border-white/20 group hover:border-primary/40 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{cert.role}</h4>
                                        <p className="text-white/70 font-medium">{cert.company}</p>
                                    </div>
                                    <span className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded border border-primary/20">
                                        {cert.period}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-white/40 mb-4">
                                    <MapPin size={14} />
                                    {cert.location}
                                </div>
                                <div className="text-white/60 text-sm leading-relaxed">
                                    {cert.description.map((desc, i) => <p key={i}>{desc}</p>)}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
