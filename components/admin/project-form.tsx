"use client";

import { useEffect, useState } from "react";
import { Project, addProject, updateProject } from "@/lib/db";
import { revalidateProjects } from "@/app/actions";
import { Loader2, Plus, X } from "lucide-react";

interface ProjectFormProps {
    initialData?: Project | null;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function ProjectForm({ initialData, onSuccess, onCancel }: ProjectFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [techInput, setTechInput] = useState("");

    // Initial State
    const [formData, setFormData] = useState<Project>({
        title: "",
        description: "",
        imageUrl: "",
        projectUrl: "",
        githubUrl: "",
        tech: [],
        order: 1
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "order" ? parseInt(value) || 0 : value
        }));
    };

    const handleTechAdd = () => {
        if (!techInput.trim()) return;

        // Split by comma, trim whitespace, and filter empty strings
        const newTechs = techInput
            .split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0 && !formData.tech.includes(t));

        if (newTechs.length > 0) {
            setFormData(prev => ({
                ...prev,
                tech: [...prev.tech, ...newTechs]
            }));
        }
        setTechInput("");
    };

    const removeTech = (index: number) => {
        setFormData(prev => ({
            ...prev,
            tech: prev.tech.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {


            // ... existing code ...

            if (initialData?.id) {
                await updateProject(initialData.id, formData);
                await revalidateProjects();
                alert("Project updated successfully!");
            } else {
                await addProject(formData);
                await revalidateProjects();
                alert("Project added successfully!");
            }

            if (onSuccess) {
                onSuccess();
            } else {
                // Reset form only if not editing (or if staying on page)
                if (!initialData) {
                    setFormData({
                        title: "",
                        description: "",
                        imageUrl: "",
                        projectUrl: "",
                        githubUrl: "",
                        tech: [],
                        order: formData.order + 1
                    });
                }
            }
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Failed to save project");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white/5 p-8 rounded-2xl border border-white/20 relative">
            {onCancel && (
                <button type="button" onClick={onCancel} className="absolute top-4 right-4 text-white/40 hover:text-white">
                    <X size={20} />
                </button>
            )}
            <h2 className="text-xl font-bold text-white mb-6">
                {initialData ? "Edit Project" : "Add New Project"}
            </h2>

            {/* Title & Order */}
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-white/70">Project Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Order Check</label>
                    <input type="number" name="order" value={formData.order} onChange={handleChange} required className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
            </div>

            {/* Helper for Tech Stack */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Tech Stack</label>
                <div className="flex gap-2">
                    <input
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleTechAdd())}
                        placeholder="e.g. Next.js"
                        className="flex-1 bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50"
                    />
                    <button type="button" onClick={handleTechAdd} className="bg-primary/20 hover:bg-primary/30 text-primary p-3 rounded-xl transition-colors">
                        <Plus size={24} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-xs text-white flex items-center gap-2">
                            {t} <button type="button" onClick={() => removeTech(i)} className="hover:text-red-400">×</button>
                        </span>
                    ))}
                </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Live URL</label>
                    <input name="projectUrl" value={formData.projectUrl} onChange={handleChange} className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">GitHub URL</label>
                    <input name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" required />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Image URL</label>
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" required />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 resize-none" required />
            </div>

            <button disabled={isLoading} type="submit" className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="animate-spin" /> : "Save Project"}
            </button>
        </form>
    );
}
