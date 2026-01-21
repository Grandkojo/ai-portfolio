"use client";

import { useEffect, useState } from "react";
import { Experience, addExperience, updateExperience } from "@/lib/db";
import { revalidateExperience } from "@/app/actions";
import { Loader2, X } from "lucide-react";

interface ExperienceFormProps {
    initialData?: Experience | null;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function ExperienceForm({ initialData, onSuccess, onCancel }: ExperienceFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    // Initial State
    const [formData, setFormData] = useState<Experience>({
        type: "Experience",
        role: "",
        company: "",
        period: "",
        location: "",
        description: [],
        order: 1
    });

    const [descText, setDescText] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setDescText(initialData.description.join("\n\n"));
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "order" ? parseInt(value) || 0 : value
        }));
    };

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescText(e.target.value);
        // Split by double newline for paragraphs
        const paragraphs = e.target.value.split("\n\n").filter(p => p.trim() !== "");
        setFormData(prev => ({
            ...prev,
            description: paragraphs
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {


            // ... existing code ...

            if (initialData?.id) {
                await updateExperience(initialData.id, formData);
                await revalidateExperience();
                alert("Experience updated successfully!");
            } else {
                await addExperience(formData);
                await revalidateExperience();
                alert("Experience added successfully!");
            }

            if (onSuccess) {
                onSuccess();
            } else {
                if (!initialData) {
                    setFormData(prev => ({
                        type: prev.type,
                        role: "",
                        company: "",
                        period: "",
                        location: "",
                        description: [],
                        order: prev.order + 1
                    }));
                    setDescText("");
                }
            }
        } catch (error) {
            console.error("Error saving experience:", error);
            alert("Failed to save experience");
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
                {initialData ? "Edit Item" : "Add New Item"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50"
                    >
                        <option value="Experience">Experience</option>
                        <option value="Education">Education</option>
                        <option value="Certification">Certification</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Role / Title / Degree</label>
                    <input name="role" value={formData.role} onChange={handleChange} required className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Company / Organization</label>
                    <input name="company" value={formData.company} onChange={handleChange} required className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Period</label>
                    <input name="period" value={formData.period} onChange={handleChange} placeholder="Jan 2024 - Present" required className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Location</label>
                    <input name="location" value={formData.location} onChange={handleChange} placeholder="Remote" required className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Order Check</label>
                    <input type="number" name="order" value={formData.order} onChange={handleChange} required className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Description</label>
                <p className="text-xs text-white/40 mb-2">Separate paragraphs with double newlines.</p>
                <textarea
                    value={descText}
                    onChange={handleDescChange}
                    rows={6}
                    placeholder="Describe roles, achievements, or curriculum..."
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 resize-none"
                    required
                />
            </div>

            <button disabled={isLoading} type="submit" className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="animate-spin" /> : "Save Details"}
            </button>
        </form>
    );
}
