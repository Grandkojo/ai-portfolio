"use client";

import { BlogPost } from "@/lib/blog-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Clock } from "lucide-react";

const PLATFORM_CONFIG: Record<string, { label: string; cta: string; color: string }> = {
    medium: {
        label: "Medium",
        cta: "Read on Medium",
        color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    devto: {
        label: "DEV.to",
        cta: "Read on DEV.to",
        color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    },
    personal: {
        label: "Blog",
        cta: "Read Article",
        color: "bg-accent/10 text-accent border-accent/20",
    },
};

export function BlogDetailClient({ post }: { post: BlogPost }) {
    const config = PLATFORM_CONFIG[post.platform] || PLATFORM_CONFIG.personal;
    const isExternal = post.platform !== "personal" && Boolean(post.externalUrl);

    return (
        <main className="min-h-screen pt-24 pb-32">
            <div className="max-w-3xl mx-auto px-5 md:px-6">
                {/* Navigation */}
                <ScrollReveal>
                    <Link
                        href="/writing"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-all mb-10 group text-sm"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        All articles
                    </Link>
                </ScrollReveal>

                {/* Header */}
                <ScrollReveal>
                    <header className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${config.color}`}>
                                {config.label}
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-[1.15]">
                            {post.title}
                        </h1>

                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-b border-border py-3">
                            <span className="inline-flex items-center gap-1.5">
                                <Calendar size={14} />
                                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Clock size={14} />
                                {post.readTime}
                            </span>
                        </div>
                    </header>
                </ScrollReveal>

                {/* Content or External Banner */}
                {isExternal && post.externalUrl ? (
                    <ScrollReveal delay={0.1}>
                        <div className="rounded-xl border border-border bg-card p-8 text-center space-y-4 my-8 shadow-sm">
                            <p className="text-muted-foreground leading-relaxed">
                                This article was originally published on <strong className="text-foreground">{config.label}</strong>.
                            </p>
                            <a
                                href={post.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                            >
                                {config.cta}
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    </ScrollReveal>
                ) : (
                    <ScrollReveal delay={0.1}>
                        <article className="prose dark:prose-invert prose-violet max-w-none
                            prose-headings:font-bold prose-headings:tracking-tight
                            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
                            prose-p:text-muted-foreground prose-p:leading-relaxed
                            prose-li:text-muted-foreground
                            prose-strong:text-foreground
                            prose-code:text-accent prose-code:text-sm
                            prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-xl
                            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                            prose-ol:text-muted-foreground
                        ">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {post.content}
                            </ReactMarkdown>
                        </article>
                    </ScrollReveal>
                )}

                {/* Tags */}
                <ScrollReveal delay={0.15}>
                    <div className="mt-12 pt-8 border-t border-border">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="text-sm px-3 py-1 rounded-full border border-border text-muted-foreground"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Back link */}
                <ScrollReveal delay={0.2}>
                    <div className="mt-10">
                        <Link
                            href="/writing"
                            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                            Back to all articles
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </main>
    );
}
