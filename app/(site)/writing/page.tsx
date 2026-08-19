import { getAllPosts } from "@/lib/blog-data";
import { WritingListClient } from "./writing-list-client";

export const metadata = {
    title: "Writing — Ernest Essien",
    description: "Blog posts and articles on software engineering, AI, backend systems, and more.",
};

export default function WritingPage() {
    const posts = getAllPosts();

    return <WritingListClient posts={posts} />;
}
