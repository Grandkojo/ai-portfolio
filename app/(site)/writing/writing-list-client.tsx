"use client";

import { BlogPost } from "@/lib/blog-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

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

export function WritingListClient({ posts }: { posts: BlogPost[] }) {
    const router = useRouter();

    return (
        <main className="min-h-screen pt-24 pb-32">
            <div className="max-w-5xl mx-auto px-5 md:px-6">
                <ScrollReveal>
                    <Link
                        href="/#writing"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-all mb-8 group text-sm"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back home
                    </Link>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="mb-12">
                        <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-4">
                            Writing & Articles
                        </h1>
                        <p className="text-muted-foreground max-w-lg leading-relaxed">
                            Articles on AI engineering, backend architecture, community tools, and memory systems published on Medium, DEV.to, and my blog.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="space-y-4">
                    {posts.map((post, i) => {
                        const config = PLATFORM_CONFIG[post.platform] || PLATFORM_CONFIG.personal;
                        const isExternal = post.platform !== "personal" && Boolean(post.externalUrl);

                        const handleClick = () => {
                            if (isExternal && post.externalUrl) {
                                window.open(post.externalUrl, "_blank", "noopener,noreferrer");
                            } else {
                                router.push(`/writing/${post.slug}`);
                            }
                        };

                        return (
                            <ScrollReveal key={post.slug} delay={i * 0.06}>
                                <article
                                    onClick={handleClick}
                                    className="group rounded-xl border border-border bg-card p-5 md:p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_-12px] hover:shadow-accent/10 cursor-pointer"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${config.color}`}>
                                                    {config.label}
                                                </span>
                                                <span className="text-xs text-muted-foreground">{post.readTime}</span>
                                            </div>

                                            <h2 className="text-base md:text-lg font-medium text-card-foreground group-hover:text-accent transition-colors duration-200 leading-snug mb-2">
                                                {post.title}
                                            </h2>

                                            <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {post.tags.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex md:flex-col items-center md:items-end justify-between shrink-0 gap-2 border-t md:border-t-0 border-border pt-3 md:pt-0">
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                            </span>

                                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:underline md:mt-2">
                                                {config.cta}
                                                {isExternal ? <ExternalLink size={13} /> : <ArrowRight size={13} />}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
