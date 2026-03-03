"use client";

import { useNotification } from "@/components/ui/notification-context";
import { ProjectForm } from "@/components/admin/project-form";
import { addProject, deleteProject, Project, subscribeToProjects } from "@/lib/db";
import { Database, Edit2, ExternalLink, Github, Plus, Trash2, Upload } from "lucide-react";
import { revalidateProjects, importProjects } from "@/app/actions";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProjects() {
    const { showNotification, confirmAction } = useNotification();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isMigrating, setIsMigrating] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeToProjects(setProjects);
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string, title: string) => {
        const confirmed = await confirmAction({
            title: 'Delete Project',
            message: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            confirmText: 'Delete',
            type: 'danger'
        });

        if (confirmed) {
            try {
                await deleteProject(id);
                await revalidateProjects();
                showNotification(`Deleted ${title}`, "success");
            } catch (error) {
                showNotification("Failed to delete project", "error");
            }
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setEditingProject(null);
        setIsEditing(true);
    };

    const handleSuccess = () => {
        setIsEditing(false);
        setEditingProject(null);
    };

    const handleBulkImport = async () => {
        const confirmed = await confirmAction({
            title: 'Bulk Import',
            message: 'This will import/overwrite projects from projects_import.json. Continue?',
            confirmText: 'Import Now',
            type: 'info'
        });

        if (!confirmed) return;

        setIsMigrating(true);
        try {
            const result = await importProjects();
            if (result.success && result.projects) {
                let successCount = 0;
                for (const project of result.projects) {
                    try {
                        await addProject(project);
                        successCount++;
                    } catch (err) {
                        console.error(`Failed to import ${project.title}:`, err);
                    }
                }
                await revalidateProjects();
                showNotification(`Successfully imported ${successCount} projects!`, "success");
            } else {
                showNotification(`Import failed: ${result.error}`, "error");
            }
        } catch (error) {
            console.error(error);
            showNotification("An error occurred during import.", "error");
        } finally {
            setIsMigrating(false);
        }
    };

    if (isEditing) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="absolute -top-12 left-0 text-sm text-white/50 hover:text-white flex items-center gap-2"
                    >
                        ← Back to Projects
                    </button>
                    <ProjectForm
                        initialData={editingProject}
                        onSuccess={handleSuccess}
                        onCancel={() => setIsEditing(false)}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
                    <p className="text-white/60">Manage your capabilities and case studies.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleBulkImport}
                        disabled={isMigrating}
                        className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                        title="Import from projects_import.json"
                    >
                        {isMigrating ? (
                            <Database size={18} className="animate-pulse" />
                        ) : (
                            <Upload size={18} />
                        )}
                        Bulk Import
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add Project
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="group bg-white/5 border border-white/20 rounded-2xl overflow-hidden hover:border-primary/50 transition-all flex flex-col">
                        <div className="aspect-video bg-black/50 relative overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={project.imageUrl || "/placeholder.jpg"}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="p-2 bg-black/80 text-white rounded-lg hover:bg-primary hover:text-white transition-colors"
                                    title="Edit"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => project.id && handleDelete(project.id, project.title)}
                                    className="p-2 bg-black/80 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                <span className="text-xs font-mono text-white/30 bg-white/5 px-2 py-1 rounded">
                                    #{project.order}
                                </span>
                            </div>

                            <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-1">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.slice(0, 3).map((t, i) => (
                                    <span key={i} className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
                                        {t}
                                    </span>
                                ))}
                                {project.tech.length > 3 && (
                                    <span className="text-xs text-white/40 px-1">+{project.tech.length - 3}</span>
                                )}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-white/40 pt-4 border-t border-white/5">
                                {project.projectUrl && (
                                    <Link href={project.projectUrl} target="_blank" className="hover:text-white flex items-center gap-1">
                                        <ExternalLink size={14} /> Demo
                                    </Link>
                                )}
                                {project.githubUrl && (
                                    <Link href={project.githubUrl} target="_blank" className="hover:text-white flex items-center gap-1">
                                        <Github size={14} /> Code
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="col-span-full py-12 text-center text-white/30 border border-white/5 border-dashed rounded-xl">
                        No projects found. Add your first one!
                    </div>
                )}
            </div>
        </div>
    );
}
