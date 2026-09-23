import { getCachedPosts } from "@/lib/cached-data";
import { WritingListClient } from "./writing-list-client";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Writing — Ernest Essien",
    description: "Blog posts and articles on software engineering, AI, backend systems, and more.",
};

export default async function WritingPage() {
    const posts = await getCachedPosts();

    return <WritingListClient posts={posts} />;
}
