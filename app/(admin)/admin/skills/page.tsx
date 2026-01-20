"use client";

import { SkillForm } from "@/components/admin/skill-form";
import { deleteSkill, Skill, subscribeToSkills } from "@/lib/db";
import { Edit2, Plus, Trash2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminSkills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState<Skill | null>(null);

    useEffect(() => {
        const unsubscribe = subscribeToSkills(setSkills);
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            await deleteSkill(id);
        }
    };

    const handleEdit = (skill: Skill) => {
        setEditingItem(skill);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setEditingItem(null);
        setIsEditing(true);
    };

    const handleSuccess = () => {
        setIsEditing(false);
        setEditingItem(null);
    };

    if (isEditing) {
        return (
            <div className="space-y-6">
                <button
                    onClick={() => setIsEditing(false)}
                    className="text-sm text-white/50 hover:text-white flex items-center gap-2 mb-4"
                >
                    ← Back to Skills
                </button>
                <div className="flex justify-center">
                    <div className="w-full max-w-lg">
                        <SkillForm
                            initialData={editingItem}
                            onSuccess={handleSuccess}
                            onCancel={() => setIsEditing(false)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Skills</h1>
                    <p className="text-white/60">Manage your technical expertise.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Skill
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                    <div key={skill.id} className="p-4 rounded-xl bg-white/5 border border-white/20 flex items-center justify-between group hover:border-primary/30 transition-colors">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-white">{skill.name}</h3>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-white/60 uppercase tracking-wide">
                                    {skill.category}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-white/50">
                                <div className="flex items-center gap-1">
                                    <TrendingUp size={14} className="text-primary" />
                                    <span>Lvl {skill.level}</span>
                                </div>
                                <span>•</span>
                                <span>{skill.experience}</span>
                            </div>
                        </div>

                        <div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleEdit(skill)}
                                className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => skill.id && handleDelete(skill.id, skill.name)}
                                className="p-2 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {skills.length === 0 && (
                    <div className="col-span-full py-12 text-center text-white/30 border border-white/5 border-dashed rounded-xl">
                        No skills added yet. start building your stack!
                    </div>
                )}
            </div>
        </div>
    );
}
