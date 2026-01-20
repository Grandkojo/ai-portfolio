"use client";

import { useEffect, useState } from "react";
import { addSkill, updateSkill, Skill } from "@/lib/db";
import { Loader2, Plus, X } from "lucide-react";

interface SkillFormProps {
    initialData?: Skill | null;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function SkillForm({ initialData, onSuccess, onCancel }: SkillFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Form States
    const [name, setName] = useState("");
    const [category, setCategory] = useState<Skill["category"]>("Frontend");
    const [level, setLevel] = useState(5);
    const [experience, setExperience] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setCategory(initialData.category);
            setLevel(initialData.level);
            setExperience(initialData.experience);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (initialData?.id) {
                await updateSkill(initialData.id, {
                    name,
                    category,
                    level,
                    experience
                });
                alert("Skill updated successfully!");
            } else {
                await addSkill({
                    name,
                    category,
                    level,
                    experience
                });
                alert("Skill added successfully!");
            }

            if (onSuccess) onSuccess();

            if (!initialData) {
                setName("");
                setCategory("Frontend");
                setLevel(5);
                setExperience("");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to save skill. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/20 relative">
            {onCancel && (
                <button type="button" onClick={onCancel} className="absolute top-4 right-4 text-white/40 hover:text-white">
                    <X size={20} />
                </button>
            )}
            <h3 className="text-xl font-bold text-white mb-4">
                {initialData ? "Edit Skill" : "Add New Skill"}
            </h3>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Name */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Skill Name</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. React, Python"
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>

            {/* Category */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Tools">Tools</option>
                    <option value="Database">Database</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {/* Level Slider */}
            <div className="space-y-2">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-white/60">Proficiency Level</label>
                    <span className="text-primary font-bold">{level}/10</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-white/30 px-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                </div>
            </div>

            {/* Experience */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Years of Experience</label>
                <input
                    type="text"
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 3 years, 6 months"
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
                Add Skill
            </button>
        </form>
    );
}
