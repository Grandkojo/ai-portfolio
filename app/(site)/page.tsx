import { HomeClient } from "@/components/home-client";
import { getCachedProjects, getCachedSkills, getCachedExperience, getCachedPosts } from "@/lib/cached-data";
import { Project, Skill, Experience } from "@/lib/db";
import { BlogPost } from "@/lib/blog-data";

export const dynamic = 'force-dynamic';

export default async function Home() {

  let projects: Project[] = [];
  let skills: Skill[] = [];
  let experience: Experience[] = [];
  let featuredPosts: BlogPost[] = [];

  try {
    const [p, s, e, posts] = await Promise.all([
      getCachedProjects(),
      getCachedSkills(),
      getCachedExperience(),
      getCachedPosts()
    ]);
    projects = p || [];
    skills = s || [];
    experience = e || [];
    featuredPosts = (posts || []).filter((post) => post.featured);
  } catch (err) {
    console.error("Error fetching homepage data:", err);
  }

  return (
    <HomeClient
      projects={projects}
      skills={skills}
      experience={experience}
      featuredPosts={featuredPosts}
    />
  );
}
