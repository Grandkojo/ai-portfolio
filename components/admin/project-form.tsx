"use client";

import { useState } from "react";
import { Project, addProject } from "@/lib/db";
import { Loader2, Plus } from "lucide-react";

export function ProjectForm() {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "order" ? parseInt(value) || 0 : value
        }));
    };

    const handleTechAdd = () => {
        if (!techInput.trim()) return;
        setFormData(prev => ({
            ...prev,
            tech: [...prev.tech, techInput.trim()]
        }));
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
            await addProject(formData);
            alert("Project added successfully!");
            // Reset form
            setFormData({
                title: "",
                description: "",
                imageUrl: "",
                projectUrl: "",
                githubUrl: "",
                tech: [],
                order: formData.order + 1 // Auto increment order
            });
        } catch (error) {
            console.error("Error adding project:", error);
            alert("Failed to add project");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white/5 p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Add New Project</h2>

            {/* Title & Order */}
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-white/70">Project Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Order Check</label>
                    <input type="number" name="order" value={formData.order} onChange={handleChange} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
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
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50"
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
                    <input name="projectUrl" value={formData.projectUrl} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">GitHub URL</label>
                    <input name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" required />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Image URL</label>
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" required />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 resize-none" required />
            </div>

            <button disabled={isLoading} type="submit" className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="animate-spin" /> : "Save Project"}
            </button>
        </form>
    );
}
