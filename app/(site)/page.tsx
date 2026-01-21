import { HomeClient } from "@/components/home-client";
import { getCachedProjects, getCachedSkills, getCachedExperience } from "@/lib/cached-data";
import { Project, Skill, Experience } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function Home() {

  let projects: Project[] = [];
  let skills: Skill[] = [];
  let experience: Experience[] = [];

  try {
    const [p, s, e] = await Promise.all([
      getCachedProjects(),
      getCachedSkills(),
      getCachedExperience()
    ]);
    projects = p || [];
    skills = s || [];
    experience = e || [];
  } catch (err) {
    console.error("Error fetching homepage data:", err);
  }



  return (
    <HomeClient
      projects={projects}
      skills={skills}
      experience={experience}
    />
  );
}
