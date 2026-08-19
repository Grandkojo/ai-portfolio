import { getProjectDoc } from "@/lib/project-docs";
import { getProjectBySlug } from "@/lib/db-server";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Bot, Terminal, Calendar, CheckCircle2, Shield, AlertTriangle, Layers, PlayCircle, Star, Target, Zap } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProjectScrollReveal } from "./scroll-reveal-wrapper";

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const [project, mdContent] = await Promise.all([
        getProjectBySlug(slug),
        getProjectDoc(slug)
    ]);

    if (!project) {
        notFound();
    }

    const details = project.details;

    return (
        <main className="min-h-screen bg-background text-foreground pt-24 pb-32 selection:bg-accent/30">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--accent)/0.08)_0%,transparent_50%)] pointer-events-none dark:bg-[radial-gradient(circle_at_50%_0%,#1a0b2e_0%,transparent_50%)]" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Navigation */}
                <ProjectScrollReveal>
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-all mb-12 group py-2 px-4 rounded-full bg-muted/50 border border-border hover:border-accent/50"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Projects</span>
                    </Link>
                </ProjectScrollReveal>

                {/* Project Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <ProjectScrollReveal>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest">
                                Technical Deep Dive
                            </div>
                        </ProjectScrollReveal>
                        <ProjectScrollReveal delay={0.1}>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                                {project.title}
                            </h1>
                        </ProjectScrollReveal>
                        <ProjectScrollReveal delay={0.15}>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                {project.description}
                            </p>
                        </ProjectScrollReveal>

                        <ProjectScrollReveal delay={0.2}>
                            <div className="flex flex-wrap gap-4 pt-6">
                                {project.projectUrl && (
                                    <a
                                        href={project.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-xl bg-accent text-accent-foreground font-bold flex items-center gap-2 hover:opacity-90 transition-all hover:scale-105 shadow-lg"
                                    >
                                        <ExternalLink size={18} />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-xl bg-muted border border-border text-foreground font-bold flex items-center gap-2 hover:bg-muted/80 transition-all hover:scale-105"
                                    >
                                        <Github size={18} />
                                        <span>Source Code</span>
                                    </a>
                                )}
                            </div>
                        </ProjectScrollReveal>
                    </div>

                    <ProjectScrollReveal delay={0.1} direction="right" className="lg:col-span-5 relative">
                        <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-border group shadow-2xl bg-muted">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 blur-3xl rounded-full -z-10" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 blur-3xl rounded-full -z-10" />
                    </ProjectScrollReveal>
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-12">
                        {/* Problem Section */}
                        {details?.problem && (
                            <ProjectScrollReveal>
                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                        <Target className="text-accent" size={24} />
                                        The Challenge
                                    </h2>
                                    <div className="rounded-xl border border-border bg-card p-8 text-muted-foreground leading-relaxed text-lg">
                                        &quot;{details.problem}&quot;
                                    </div>
                                </section>
                            </ProjectScrollReveal>
                        )}

                        {/* Overview Section */}
                        {details?.fullOverview ? (
                            <ProjectScrollReveal>
                                <section className="space-y-4">
                                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                        <Layers className="text-accent" size={24} />
                                        Project Overview
                                    </h2>
                                    <div className="prose dark:prose-invert prose-violet max-w-none text-muted-foreground">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {details.fullOverview}
                                        </ReactMarkdown>
                                    </div>
                                </section>
                            </ProjectScrollReveal>
                        ) : mdContent && (
                            <ProjectScrollReveal>
                                <section className="rounded-xl border border-border bg-card p-8 md:p-12">
                                    <div className="prose dark:prose-invert prose-violet max-w-none 
                                        prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-border
                                        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg
                                        prose-li:text-muted-foreground prose-strong:text-foreground prose-code:text-accent
                                        prose-img:rounded-2xl prose-img:border prose-img:border-border">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {mdContent}
                                        </ReactMarkdown>
                                    </div>
                                </section>
                            </ProjectScrollReveal>
                        )}

                        {/* Features Grid */}
                        {details?.features && details.features.length > 0 && (
                            <ProjectScrollReveal>
                                <section className="space-y-6">
                                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                        <Star className="text-accent" size={24} />
                                        Key Features
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {details.features.map((f, i) => (
                                            <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-2 group hover:border-accent/30 transition-colors">
                                                <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">{f.title}</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </ProjectScrollReveal>
                        )}

                        {/* Workflow */}
                        {details?.workflow && details.workflow.length > 0 && (
                            <ProjectScrollReveal>
                                <section className="space-y-6">
                                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                        <PlayCircle className="text-accent" size={24} />
                                        The Workflow
                                    </h2>
                                    <div className="space-y-4">
                                        {details.workflow.map((w, i) => (
                                            <div key={i} className="flex gap-4 items-start">
                                                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0 text-accent font-bold text-sm">
                                                    {i + 1}
                                                </div>
                                                <div className="pt-1 text-muted-foreground leading-relaxed">{w}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </ProjectScrollReveal>
                        )}

                        {/* Tech Stack Tables */}
                        {details?.techStack && details.techStack.length > 0 && (
                            <ProjectScrollReveal>
                                <section className="space-y-6">
                                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                        <Zap className="text-accent" size={24} />
                                        Technical Stack
                                    </h2>
                                    <div className="border border-border rounded-2xl overflow-hidden bg-card">
                                        <table className="w-full text-left">
                                            <thead className="bg-muted border-b border-border">
                                                <tr>
                                                    <th className="px-6 py-4 text-sm font-bold text-foreground">Category</th>
                                                    <th className="px-6 py-4 text-sm font-bold text-foreground">Technologies</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {details.techStack.map((t, i) => (
                                                    <tr key={i} className="hover:bg-muted/50 transition-colors">
                                                        <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{t.category}</td>
                                                        <td className="px-6 py-4 text-sm text-foreground/80">{t.tech}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </ProjectScrollReveal>
                        )}

                        {/* Architecture & Structure */}
                        {(details?.architecture || details?.projectStructure) && (
                            <ProjectScrollReveal>
                                <section className="space-y-10">
                                    {details.architecture && (
                                        <div className="space-y-4">
                                            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                                <Shield className="text-accent" size={24} />
                                                System Architecture
                                            </h2>
                                            <div className="prose dark:prose-invert prose-violet max-w-none text-muted-foreground">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {details.architecture}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    )}

                                    {details.projectStructure && (
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                                                <Terminal className="text-accent" size={20} />
                                                Project Structure
                                            </h3>
                                            <pre className="p-6 rounded-2xl bg-muted border border-border overflow-x-auto text-xs text-muted-foreground font-mono leading-relaxed">
                                                {details.projectStructure}
                                            </pre>
                                        </div>
                                    )}
                                </section>
                            </ProjectScrollReveal>
                        )}

                        {/* Roadmap */}
                        {details?.roadmap && details.roadmap.length > 0 && (
                            <ProjectScrollReveal>
                                <section className="space-y-6">
                                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                        <Calendar className="text-accent" size={24} />
                                        Development Roadmap
                                    </h2>
                                    <div className="space-y-3">
                                        {details.roadmap.map((r, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                                                <span className="text-muted-foreground">{r.task}</span>
                                                <span className={cn(
                                                    "text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border",
                                                    r.status === "completed" ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400" :
                                                        r.status === "in-progress" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400" :
                                                            "bg-muted border-border text-muted-foreground"
                                                )}>
                                                    {r.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </ProjectScrollReveal>
                        )}

                        {/* Security / Disclaimer */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {details?.security && (
                                <ProjectScrollReveal>
                                    <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                                        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                            <Shield size={16} className="text-accent" />
                                            Security & Privacy
                                        </h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {details.security}
                                        </p>
                                    </div>
                                </ProjectScrollReveal>
                            )}
                            {details?.disclaimer && (
                                <ProjectScrollReveal>
                                    <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
                                        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                            <AlertTriangle size={16} className="text-accent" />
                                            Disclaimer
                                        </h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {details.disclaimer}
                                        </p>
                                    </div>
                                </ProjectScrollReveal>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <ProjectScrollReveal delay={0.15}>
                            <div className="rounded-xl border border-border bg-card p-8 space-y-6 sticky top-24">
                                <div className="flex items-center gap-3 text-foreground font-bold border-b border-border pb-4">
                                    <Bot size={20} className="text-accent" />
                                    <h3>AI Assistant</h3>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Want to know more about the architecture or design decisions of this project? Ask my AI agent!
                                </p>
                                <Link
                                    href={`/?chat=${encodeURIComponent(`Tell me about the technical details of the ${project.title} project.`)}`}
                                    className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg"
                                >
                                    <Bot size={18} />
                                    <span>Ask AI Agent</span>
                                </Link>

                                {/* Tech Focus Highlights */}
                                <div className="pt-6 space-y-4 border-t border-border">
                                    {project.tech.slice(0, 4).map(t => (
                                        <div key={t} className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <div className="w-1 h-1 rounded-full bg-accent" />
                                            <span>Focus: {t}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ProjectScrollReveal>
                    </aside>
                </div>
            </div>
        </main>
    );
}
