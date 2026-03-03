"use client";

import { revalidateExperience } from "@/app/actions";
import { ExperienceForm } from "@/components/admin/experience-form";
import { deleteExperience, Experience, subscribeToExperience } from "@/lib/db";
import { Briefcase, Building2, Calendar, Edit2, MapPin, Plus, Trash2 } from "lucide-react";
import { useNotification } from "@/components/ui/notification-context";
import { useEffect, useState } from "react";

export default function AdminExperience() {
    const { showNotification, confirmAction } = useNotification();
    const [experience, setExperience] = useState<Experience[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState<Experience | null>(null);

    useEffect(() => {
        const unsubscribe = subscribeToExperience(setExperience);
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string, role: string) => {
        const confirmed = await confirmAction({
            title: 'Delete Experience',
            message: `Are you sure you want to delete "${role}"? This will remove it from your timeline.`,
            confirmText: 'Delete',
            type: 'danger'
        });

        if (confirmed) {
            try {
                await deleteExperience(id);
                await revalidateExperience();
                showNotification(`Deleted experience: ${role}`, "success");
            } catch (error) {
                showNotification("Failed to delete experience", "error");
            }
        }
    };

    const handleEdit = (item: Experience) => {
        setEditingItem(item);
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
                    ← Back to Experience
                </button>
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl">
                        <ExperienceForm
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
                    <h1 className="text-3xl font-bold text-white mb-2">Experience</h1>
                    <p className="text-white/60">Manage your professional journey.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Experience
                </button>
            </div>

            <div className="space-y-4">
                {experience.map((item) => (
                    <div key={item.id} className="group p-6 rounded-2xl bg-white/5 border border-white/20 hover:border-primary/30 transition-all">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                                    <span className={`text-xs font-bold px-2 py-1 rounded border ${item.type === 'Education' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        item.type === 'Certification' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                            'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                        }`}>
                                        {item.type || 'Experience'}
                                    </span>
                                    <span className="text-xs font-mono text-white/30 bg-white/5 px-2 py-1 rounded">
                                        #{item.order}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-white/50">
                                    <div className="flex items-center gap-1.5">
                                        <Building2 size={14} className="text-primary" />
                                        {item.company}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-primary" />
                                        {item.period}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={14} className="text-primary" />
                                        {item.location}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-2 text-white/50 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => item.id && handleDelete(item.id, item.role)}
                                    className="p-2 text-white/50 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2 pl-4 border-l border-white/20">
                            {item.description.map((desc, i) => (
                                <p key={i} className="text-white/60 text-sm">{desc}</p>
                            ))}
                        </div>
                    </div>
                ))}

                {experience.length === 0 && (
                    <div className="py-12 text-center text-white/30 border border-white/5 border-dashed rounded-xl">
                        No experience entries found. Add your first one!
                    </div>
                )}
            </div>
        </div>
    );
}
