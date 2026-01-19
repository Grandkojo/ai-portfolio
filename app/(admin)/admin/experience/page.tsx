import { ExperienceForm } from "@/components/admin/experience-form";

export default function AdminExperience() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Experience Management</h1>
            <ExperienceForm />
        </div>
    );
}
