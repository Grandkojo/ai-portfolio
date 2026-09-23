import { getPostBySlug } from "@/lib/db-server";
import { notFound } from "next/navigation";
import { BlogDetailClient } from "./blog-detail-client";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} — Ernest Essien`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return <BlogDetailClient post={post} />;
}
