import { unstable_cache } from "next/cache";
import { getProjects, getSkills, getExperience, getPosts } from "@/lib/db-server";


export const getCachedProjects = unstable_cache(
    async () => getProjects(),
    ['projects'],
    { tags: ['projects'], revalidate: 300 }
);

export const getCachedSkills = unstable_cache(
    async () => getSkills(),
    ['skills'],
    { tags: ['skills'], revalidate: 300 }
);

export const getCachedExperience = unstable_cache(
    async () => getExperience(),
    ['experience'],
    { tags: ['experience'], revalidate: 300 }
);

export const getCachedPosts = unstable_cache(
    async () => getPosts(),
    ['posts'],
    { tags: ['posts'], revalidate: 300 }
);
