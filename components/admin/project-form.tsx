"use client";

import { useEffect, useState } from "react";
import { Project, addProject, updateProject } from "@/lib/db";
import { revalidateProjects } from "@/app/actions";
import { Loader2, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotification } from "@/components/ui/notification-context";

interface ProjectFormProps {
    initialData?: Project | null;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function ProjectForm({ initialData, onSuccess, onCancel }: ProjectFormProps) {
    const { showNotification } = useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const [techInput, setTechInput] = useState("");
    const [featureInput, setFeatureInput] = useState({ title: "", description: "" });
    const [techStackInput, setTechStackInput] = useState({ category: "", tech: "" });
    const [workflowInput, setWorkflowInput] = useState("");
    const [roadmapInput, setRoadmapInput] = useState({ task: "", status: "planned" as const });

    // Initial State
    const [formData, setFormData] = useState<Project>({
        title: "",
        description: "",
        imageUrl: "",
        projectUrl: "",
        githubUrl: "",
        tech: [],
        order: 1,
        slug: "",
        details: {
            problem: "",
            fullOverview: "",
            features: [],
            techStack: [],
            workflow: [],
            roadmap: [],
            architecture: "",
            projectStructure: "",
            security: "",
            disclaimer: "",
            videoUrl: ""
        }
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name.startsWith("details.")) {
            const detailField = name.split(".")[1];
            setFormData(prev => ({
                ...prev,
                details: {
                    ...(prev.details || {}),
                    [detailField]: value
                }
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: name === "order" ? parseInt(value) || 0 : value
        }));
    };

    const handleTechAdd = () => {
        if (!techInput.trim()) return;

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

    // --- Detail List Handlers ---

    const addFeature = () => {
        if (!featureInput.title.trim()) return;
        setFormData(prev => ({
            ...prev,
            details: {
                ...(prev.details || {}),
                features: [...(prev.details?.features || []), featureInput]
            }
        }));
        setFeatureInput({ title: "", description: "" });
    };

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            details: {
                ...(prev.details || {}),
                features: prev.details?.features?.filter((_, i) => i !== index)
            }
        }));
    };

    const addTechStack = () => {
        if (!techStackInput.category.trim()) return;
        setFormData(prev => ({
            ...prev,
            details: {
                ...(prev.details || {}),
                techStack: [...(prev.details?.techStack || []), techStackInput]
            }
        }));
        setTechStackInput({ category: "", tech: "" });
    };

    const removeTechStack = (index: number) => {
        setFormData(prev => ({
            ...prev,
            details: {
                ...(prev.details || {}),
                techStack: prev.details?.techStack?.filter((_, i) => i !== index)
            }
        }));
    };

    const addWorkflow = () => {
        if (!workflowInput.trim()) return;
        setFormData(prev => ({
            ...prev,
            details: {
                ...(prev.details || {}),
                workflow: [...(prev.details?.workflow || []), workflowInput]
            }
        }));
        setWorkflowInput("");
    };

    const removeWorkflow = (index: number) => {
        setFormData(prev => ({
            ...prev,
            details: {
                ...(prev.details || {}),
                workflow: prev.details?.workflow?.filter((_, i) => i !== index)
            }
        }));
    };

    const addRoadmap = () => {
        if (!roadmapInput.task.trim()) return;
        setFormData(prev => ({
            ...prev,
            details: {
                ...(prev.details || {}),
                roadmap: [...(prev.details?.roadmap || []), roadmapInput]
            }
        }));
        setRoadmapInput({ task: "", status: "planned" });
    };

    const removeRoadmap = (index: number) => {
        setFormData(prev => ({
            ...prev,
            details: {
                ...(prev.details || {}),
                roadmap: prev.details?.roadmap?.filter((_, i) => i !== index)
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.slug) {
            showNotification("Slug is required", "error");
            return;
        }

        setIsLoading(true);
        try {
            if (initialData?.id) {
                if (initialData.id !== formData.slug) {
                    await addProject(formData);
                    const { deleteProject } = await import("@/lib/db");
                    await deleteProject(initialData.id);
                } else {
                    await updateProject(initialData.id, formData);
                }
            } else {
                await addProject(formData);
            }

            await revalidateProjects();
            showNotification("Project saved successfully!", "success");

            if (onSuccess) {
                onSuccess();
            } else if (!initialData) {
                setFormData({
                    title: "",
                    description: "",
                    imageUrl: "",
                    projectUrl: "",
                    githubUrl: "",
                    tech: [],
                    order: formData.order + 1,
                    slug: "",
                    details: {
                        problem: "",
                        fullOverview: "",
                        features: [],
                        techStack: [],
                        workflow: [],
                        roadmap: [],
                        architecture: "",
                        projectStructure: "",
                        security: "",
                        disclaimer: "",
                        videoUrl: ""
                    }
                });
            }
        } catch (error) {
            console.error("Error saving project:", error);
            showNotification("Failed to save project", "error");
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Live URL</label>
                    <input name="projectUrl" value={formData.projectUrl} onChange={handleChange} className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">GitHub URL</label>
                    <input name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Image URL</label>
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" required />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Doc Slug</label>
                <input name="slug" value={formData.slug || ""} onChange={handleChange} placeholder="e.g. episcope, hubmapgh" className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Description (Short)</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={2} className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 resize-none" required />
            </div>

            <div className="pt-6 border-t border-white/10 space-y-6">
                <h3 className="text-lg font-bold text-primary">Detailed Documentation</h3>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Problem Statement</label>
                        <textarea name="details.problem" value={formData.details?.problem} onChange={handleChange} rows={3} placeholder="What problem does this solve?" className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 resize-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Full Overview</label>
                        <textarea name="details.fullOverview" value={formData.details?.fullOverview} onChange={handleChange} rows={5} placeholder="Detailed project breakdown..." className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 resize-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Video URL (Demo)</label>
                        <input name="details.videoUrl" value={formData.details?.videoUrl} onChange={handleChange} placeholder="YouTube/Vimeo link" className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">System Architecture</label>
                        <textarea name="details.architecture" value={formData.details?.architecture} onChange={handleChange} rows={3} placeholder="Describe the system design..." className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 resize-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Project Structure</label>
                        <textarea name="details.projectStructure" value={formData.details?.projectStructure} onChange={handleChange} rows={4} placeholder="e.g. ├── src/..." className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white font-mono text-xs focus:ring-2 focus:ring-primary/50 resize-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Security & Privacy</label>
                        <textarea name="details.security" value={formData.details?.security} onChange={handleChange} rows={3} placeholder="Security measures implemented..." className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 resize-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Disclaimer</label>
                        <textarea name="details.disclaimer" value={formData.details?.disclaimer} onChange={handleChange} rows={2} placeholder="Legal or clinical disclaimer..." className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 resize-none" />
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <label className="text-sm font-medium text-primary">Key Features</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input value={featureInput.title} onChange={e => setFeatureInput({ ...featureInput, title: e.target.value })} placeholder="Feature Title" className="bg-black/40 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary/50" />
                        <div className="flex gap-2">
                            <input value={featureInput.description} onChange={e => setFeatureInput({ ...featureInput, description: e.target.value })} placeholder="Feature Description" className="flex-1 bg-black/40 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary/50" />
                            <button type="button" onClick={addFeature} className="bg-primary/20 hover:bg-primary/30 text-primary p-2 rounded-xl transition-colors">
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {formData.details?.features?.map((f, i) => (
                            <div key={i} className="flex justify-between items-start p-3 rounded-xl bg-white/5 border border-white/10 group">
                                <div>
                                    <div className="text-sm font-bold text-white">{f.title}</div>
                                    <div className="text-xs text-white/50">{f.description}</div>
                                </div>
                                <button type="button" onClick={() => removeFeature(i)} className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <label className="text-sm font-medium text-primary">Categorized Tech Stack</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input value={techStackInput.category} onChange={e => setTechStackInput({ ...techStackInput, category: e.target.value })} placeholder="Category (e.g. Backend)" className="bg-black/40 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary/50" />
                        <div className="flex gap-2">
                            <input value={techStackInput.tech} onChange={e => setTechStackInput({ ...techStackInput, tech: e.target.value })} placeholder="Tech (e.g. Django, Python)" className="flex-1 bg-black/40 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary/50" />
                            <button type="button" onClick={addTechStack} className="bg-primary/20 hover:bg-primary/30 text-primary p-2 rounded-xl transition-colors">
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {formData.details?.techStack?.map((t, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10 group">
                                <div className="text-sm">
                                    <span className="font-bold text-white mr-2">{t.category}:</span>
                                    <span className="text-white/70">{t.tech}</span>
                                </div>
                                <button type="button" onClick={() => removeTechStack(i)} className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <label className="text-sm font-medium text-primary">Workflow Steps</label>
                    <div className="flex gap-2">
                        <input value={workflowInput} onChange={e => setWorkflowInput(e.target.value)} placeholder="Step description..." className="flex-1 bg-black/40 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary/50" />
                        <button type="button" onClick={addWorkflow} className="bg-primary/20 hover:bg-primary/30 text-primary p-2 rounded-xl transition-colors">
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {formData.details?.workflow?.map((w, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10 group">
                                <span className="text-sm text-white/70">Step {i + 1}: {w}</span>
                                <button type="button" onClick={() => removeWorkflow(i)} className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <label className="text-sm font-medium text-primary">Roadmap</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input value={roadmapInput.task} onChange={e => setRoadmapInput({ ...roadmapInput, task: e.target.value })} placeholder="Task description..." className="bg-black/40 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary/50" />
                        <div className="flex gap-2">
                            <select value={roadmapInput.status} onChange={e => setRoadmapInput({ ...roadmapInput, status: e.target.value as any })} className="bg-black/40 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary/50">
                                <option value="planned">Planned</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button type="button" onClick={addRoadmap} className="bg-primary/20 hover:bg-primary/30 text-primary p-2 rounded-xl transition-colors">
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {formData.details?.roadmap?.map((r, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10 group">
                                <span className="text-sm text-white/70">{r.task}</span>
                                <span className={cn(
                                    "text-[10px] px-2 py-0.5 rounded-full border",
                                    r.status === "completed" ? "bg-green-500/10 border-green-500/30 text-green-400" :
                                        r.status === "in-progress" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" :
                                            "bg-white/5 border-white/20 text-white/40"
                                )}>
                                    {r.status}
                                </span>
                                <button type="button" onClick={() => removeRoadmap(i)} className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button disabled={isLoading} type="submit" className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="animate-spin" /> : "Save Project"}
            </button>
        </form>
    );
}
