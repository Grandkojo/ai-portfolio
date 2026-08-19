import { getPostBySlug, getAllPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import { BlogDetailClient } from "./blog-detail-client";

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} — Ernest Essien`,
        description: post.excerpt,
    };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return <BlogDetailClient post={post} />;
}
