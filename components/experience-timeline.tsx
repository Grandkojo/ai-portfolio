import { Experience } from "@/lib/db";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useRef } from "react";

interface ExperienceTimelineProps {
    experience: Experience[];
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
    const timelineItems = experience.filter(item => !item.type || item.type === 'Experience');

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section id="about" ref={containerRef} className="relative py-32 container mx-auto px-4 overflow-hidden">
            {/* Background Interactivity - Parallax Blobs */}
            <motion.div
                style={{ y }}
                className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10"
            />
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] -z-10"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-24"
            >
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    My Journey
                </h2>
                <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
            </motion.div>


            <div className="max-w-5xl mx-auto space-y-24">
                {timelineItems.map((exp, index) => (
                    <TimelineCard key={exp.id || index} exp={exp} index={index} total={timelineItems.length} />
                ))}
            </div>
        </section>
    );
}

function TimelineCard({ exp, index, total }: { exp: Experience; index: number; total: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group relative"
        >
            {/* Connecting Line (Visual only) */}
            {index !== total - 1 && (
                <div className="absolute left-8 top-20 bottom-[-6rem] w-0.5 bg-white/10 hidden md:block group-last:hidden" />
            )}

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Visual Anchor */}
                <div className="md:w-64 flex-shrink-0 flex flex-col items-start md:text-right md:items-end pt-2">
                    <span className="text-5xl font-bold text-accent mb-2 font-mono drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">0{index + 1}</span>
                    <div className="text-xl font-bold text-white mb-1">{exp.period}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        {exp.location}
                    </div>
                </div>

                {/* Content Card */}
                <div className="flex-1">
                    <div className="obsidian-card p-6 md:p-10 group-hover:-translate-y-2 transition-transform duration-500">
                        {/* Obsidian Effects */}
                        <div className="obsidian-highlight group-hover:opacity-100" />
                        <div className="obsidian-border group-hover:ring-primary/30" />

                        <div className="relative z-30">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                                    <Briefcase size={24} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                                        {exp.role}
                                    </h3>
                                    <p className="text-xl text-white/90 font-medium">{exp.company}</p>
                                </div>
                            </div>

                            <div className="space-y-4 text-base md:text-lg text-gray-200 leading-relaxed text-justify">
                                {exp.description.map((paragraph, i) => (
                                    <p key={i} className="border-l-2 border-primary/30 pl-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
