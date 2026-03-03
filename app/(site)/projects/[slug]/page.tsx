import { getProjectDoc } from "@/lib/project-docs";
import { getProjectBySlug } from "@/lib/db";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Bot, Terminal, Calendar, CheckCircle2, Shield, AlertTriangle, Layers, PlayCircle, Star, Target, Zap } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
        <main className="min-h-screen bg-black text-white pt-24 pb-20 selection:bg-primary/30">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a0b2e_0%,transparent_50%)] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Navigation */}
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-all mb-12 group py-2 px-4 rounded-full bg-white/5 border border-white/10 hover:border-primary/50"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Projects</span>
                </Link>

                {/* Project Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                            Technical Deep Dive
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                            {project.title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-6">
                            {project.projectUrl && (
                                <a
                                    href={project.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 rounded-xl bg-primary text-white font-bold flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(138,43,226,0.3)]"
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
                                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold flex items-center gap-2 hover:bg-white/10 transition-all hover:scale-105"
                                >
                                    <Github size={18} />
                                    <span>Source Code</span>
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-white/10 group shadow-2xl bg-white/5">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 blur-3xl rounded-full -z-10" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 blur-3xl rounded-full -z-10" />
                    </div>
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-12">
                        {/* Problem Section */}
                        {details?.problem && (
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Target className="text-primary" size={24} />
                                    The Challenge
                                </h2>
                                <div className="obsidian-card p-8 text-white/70 leading-relaxed text-lg italic border-l-4 border-primary">
                                    &quot;{details.problem}&quot;
                                </div>
                            </section>
                        )}

                        {/* Overview Section */}
                        {details?.fullOverview ? (
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Layers className="text-primary" size={24} />
                                    Project Overview
                                </h2>
                                <div className="prose prose-invert prose-violet max-w-none text-white/70">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {details.fullOverview}
                                    </ReactMarkdown>
                                </div>
                            </section>
                        ) : mdContent && (
                            <section className="obsidian-card p-8 md:p-12">
                                <div className="prose prose-invert prose-violet max-w-none 
                                    prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/10
                                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg
                                    prose-li:text-muted-foreground prose-strong:text-white prose-code:text-primary
                                    prose-img:rounded-2xl prose-img:border prose-img:border-white/10">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {mdContent}
                                    </ReactMarkdown>
                                </div>
                            </section>
                        )}

                        {/* Features Grid */}
                        {details?.features && details.features.length > 0 && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Star className="text-primary" size={24} />
                                    Key Features
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {details.features.map((f, i) => (
                                        <div key={i} className="obsidian-card p-6 space-y-2 group hover:border-primary/30 transition-colors">
                                            <h3 className="font-bold text-white group-hover:text-primary transition-colors">{f.title}</h3>
                                            <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Workflow */}
                        {details?.workflow && details.workflow.length > 0 && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <PlayCircle className="text-primary" size={24} />
                                    The Workflow
                                </h2>
                                <div className="space-y-4">
                                    {details.workflow.map((w, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 text-primary font-bold text-sm">
                                                {i + 1}
                                            </div>
                                            <div className="pt-1 text-white/70 leading-relaxed">{w}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Tech Stack Tables */}
                        {details?.techStack && details.techStack.length > 0 && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Zap className="text-primary" size={24} />
                                    Technical Stack
                                </h2>
                                <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
                                    <table className="w-full text-left">
                                        <thead className="bg-white/5 border-b border-white/10">
                                            <tr>
                                                <th className="px-6 py-4 text-sm font-bold text-white">Category</th>
                                                <th className="px-6 py-4 text-sm font-bold text-white">Technologies</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                            {details.techStack.map((t, i) => (
                                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-medium text-white/50">{t.category}</td>
                                                    <td className="px-6 py-4 text-sm text-white/80">{t.tech}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        )}

                        {/* Architecture & Structure */}
                        {(details?.architecture || details?.projectStructure) && (
                            <section className="space-y-10">
                                {details.architecture && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                            <Shield className="text-primary" size={24} />
                                            System Architecture
                                        </h2>
                                        <div className="prose prose-invert prose-violet max-w-none text-white/70">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {details.architecture}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )}

                                {details.projectStructure && (
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                            <Terminal className="text-primary" size={20} />
                                            Project Structure
                                        </h3>
                                        <pre className="p-6 rounded-2xl bg-white/5 border border-white/10 overflow-x-auto text-xs text-white/60 font-mono leading-relaxed">
                                            {details.projectStructure}
                                        </pre>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Roadmap */}
                        {details?.roadmap && details.roadmap.length > 0 && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Calendar className="text-primary" size={24} />
                                    Development Roadmap
                                </h2>
                                <div className="space-y-3">
                                    {details.roadmap.map((r, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                            <span className="text-white/70">{r.task}</span>
                                            <span className={cn(
                                                "text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border",
                                                r.status === "completed" ? "bg-green-500/10 border-green-500/30 text-green-400" :
                                                    r.status === "in-progress" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" :
                                                        "bg-white/5 border-white/20 text-white/40"
                                            )}>
                                                {r.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Video / Security / Disclaimer */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {details?.security && (
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                        <Shield size={16} className="text-primary" />
                                        Security & Privacy
                                    </h3>
                                    <p className="text-xs text-white/50 leading-relaxed">
                                        {details.security}
                                    </p>
                                </div>
                            )}
                            {details?.disclaimer && (
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                        <AlertTriangle size={16} className="text-primary" />
                                        Disclaimer
                                    </h3>
                                    <p className="text-xs text-white/50 leading-relaxed italic">
                                        {details.disclaimer}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="obsidian-card p-8 space-y-6 sticky top-24">
                            <div className="flex items-center gap-3 text-white font-bold border-b border-white/10 pb-4">
                                <Bot size={20} className="text-primary" />
                                <h3>AI Assistant</h3>
                            </div>
                            <p className="text-sm text-white/50 leading-relaxed">
                                Want to know more about the architecture or design decisions of this project? Ask my AI agent!
                            </p>
                            <Link
                                href={`/?chat=${encodeURIComponent(`Tell me about the technical details of the ${project.title} project.`)}`}
                                className="w-full py-4 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(138,43,226,0.3)]"
                            >
                                <Bot size={18} />
                                <span>Ask AI Agent</span>
                            </Link>

                            {/* Tech Focus Highlights */}
                            <div className="pt-6 space-y-4 border-t border-white/10">
                                {project.tech.slice(0, 4).map(t => (
                                    <div key={t} className="flex items-center gap-3 text-xs text-white/40">
                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                        <span>Focus: {t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
