"use client";

import { BlogPost } from "@/lib/blog-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useRouter } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
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

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    const router = useRouter();
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
        <ScrollReveal delay={index * 0.08}>
            <article
                onClick={handleClick}
                className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 h-full transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_-12px] hover:shadow-accent/10 cursor-pointer"
            >
                <div>
                    {/* ── Top badge & metadata ── */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${config.color}`}>
                            {config.label}
                        </span>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>

                    {/* ── Title ── */}
                    <h3 className="text-base font-medium text-card-foreground group-hover:text-accent transition-colors duration-200 leading-snug mb-2">
                        {post.title}
                    </h3>

                    {/* ── Excerpt ── */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                    </p>
                </div>

                <div>
                    {/* ── Tags ── */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 4).map((t) => (
                            <span
                                key={t}
                                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* ── Footer CTA & Date ── */}
                    <div className="flex items-center justify-between border-t border-border pt-3 mt-auto">
                        <span className="text-xs text-muted-foreground">
                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:underline">
                            {config.cta}
                            {isExternal ? <ExternalLink size={12} /> : <ArrowRight size={12} />}
                        </span>
                    </div>
                </div>
            </article>
        </ScrollReveal>
    );
}

export function WritingSection({ posts }: { posts: BlogPost[] }) {
    if (!posts.length) return null;

    return (
        <section id="writing" className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-5 md:px-6">
                {/* ── Section Header ── */}
                <ScrollReveal>
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-lg font-medium text-foreground">Writing</h2>
                        <div className="flex-1 h-px bg-border" />
                        <Link
                            href="/writing"
                            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                        >
                            See all articles
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </ScrollReveal>

                {/* ── Grid ──────────── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {posts.map((post, i) => (
                        <BlogCard key={post.slug} post={post} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
