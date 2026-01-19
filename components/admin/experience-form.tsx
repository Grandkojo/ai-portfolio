"use client";

import { useState } from "react";
import { Experience, addExperience } from "@/lib/db";
import { Loader2 } from "lucide-react";

export function ExperienceForm() {
    const [isLoading, setIsLoading] = useState(false);

    // Initial State
    const [formData, setFormData] = useState<Experience>({
        role: "",
        company: "",
        period: "",
        location: "",
        description: [], // Will handle as string in textarea and split
        order: 1
    });

    const [descText, setDescText] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            await addExperience(formData);
            alert("Experience added successfully!");
            // Reset form
            setFormData({
                role: "",
                company: "",
                period: "",
                location: "",
                description: [],
                order: formData.order + 1
            });
            setDescText("");
        } catch (error) {
            console.error("Error adding experience:", error);
            alert("Failed to add experience");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white/5 p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Add New Experience</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Role / Job Title</label>
                    <input name="role" value={formData.role} onChange={handleChange} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Company</label>
                    <input name="company" value={formData.company} onChange={handleChange} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Period</label>
                    <input name="period" value={formData.period} onChange={handleChange} placeholder="Jan 2024 - Present" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Location</label>
                    <input name="location" value={formData.location} onChange={handleChange} placeholder="Remote" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Order Check</label>
                    <input type="number" name="order" value={formData.order} onChange={handleChange} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Description</label>
                <p className="text-xs text-white/40 mb-2">Separate paragraphs with double newlines.</p>
                <textarea
                    value={descText}
                    onChange={handleDescChange}
                    rows={6}
                    placeholder="Describe your role..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 resize-none"
                    required
                />
            </div>

            <button disabled={isLoading} type="submit" className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="animate-spin" /> : "Save Experience"}
            </button>
        </form>
    );
}
