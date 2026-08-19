import { unstable_cache } from "next/cache";
import { getProjects, getSkills, getExperience } from "@/lib/db-server";


export const getCachedProjects = unstable_cache(
    async () => getProjects(),
    ['projects'],
    { tags: ['projects'] }
);

export const getCachedSkills = unstable_cache(
    async () => getSkills(),
    ['skills'],
    { tags: ['skills'] }
);

export const getCachedExperience = unstable_cache(
    async () => getExperience(),
    ['experience'],
    { tags: ['experience'] }
);
