export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
    tags: string[];
    platform: "medium" | "devto" | "personal";
    externalUrl?: string;
    featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "we-gave-an-ai-a-memory",
        title: "We gave an AI a memory. Then we used it to help people who are losing theirs.",
        excerpt:
            "How we built an AI system with long-term persistent memory to assist individuals dealing with memory loss and cognitive decline.",
        content: "",
        date: "2026-08-10",
        readTime: "5 min read",
        tags: ["AI/ML", "Healthcare", "Memory", "LLMs"],
        platform: "medium",
        externalUrl:
            "https://grandkojo.medium.com/we-gave-an-ai-a-memory-then-we-used-it-to-help-people-who-are-losing-theirs-da3df0ec96a9?sharedUserId=grandkojo",
        featured: true,
    },
    {
        slug: "how-we-built-reef-production-incident-agent",
        title: "How We Built Reef: A Production Incident Agent with Coral, Sentry Webhooks, and Slack",
        excerpt:
            "An inside look at building an automated production incident investigation agent using Coral, Sentry webhooks, and Slack.",
        content: "",
        date: "2026-08-15",
        readTime: "7 min read",
        tags: ["AI/ML", "DevOps", "Coral", "Sentry", "Slack"],
        platform: "devto",
        externalUrl:
            "https://dev.to/grandkojo/how-we-built-reef-a-production-incident-agent-with-coral-sentry-webhooks-and-slack-ngg",
        featured: true,
    },
    {
        slug: "hub-map-gh-mapping-ghanas-tech-future",
        title: "Hub Map GH: Mapping Ghana's Tech Future with AI & Community",
        excerpt:
            "Creating a unified platform to map tech hubs, co-working spaces, and incubators across Ghana using AI and community data.",
        content: "",
        date: "2026-08-01",
        readTime: "4 min read",
        tags: ["Community", "Ghana Tech", "Next.js", "AI"],
        platform: "devto",
        externalUrl:
            "https://dev.to/grandkojo/hub-map-gh-mapping-ghanas-tech-future-with-ai-community-11fd",
        featured: true,
    },
];

export function getAllPosts(): BlogPost[] {
    return BLOG_POSTS.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getFeaturedPosts(): BlogPost[] {
    return BLOG_POSTS.filter((p) => p.featured).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
    return BLOG_POSTS.find((p) => p.slug === slug);
}
