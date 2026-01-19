import { ProjectForm } from "@/components/admin/project-form";

export default function AdminProjects() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Projects Management</h1>
            <ProjectForm />
        </div>
    );
}
