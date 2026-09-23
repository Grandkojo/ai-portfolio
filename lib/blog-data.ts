// Posts are stored in the Firestore "posts" collection (document ID = slug) and managed from the admin site
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
