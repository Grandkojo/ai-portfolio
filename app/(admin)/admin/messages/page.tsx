"use client";

import { useEffect, useState } from "react";
import { Message, subscribeToMessages, deleteMessage } from "@/lib/db";
import { Trash2, Mail, Phone, Calendar, User, MessageSquare } from "lucide-react";

export default function AdminMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToMessages((data) => {
            setMessages(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Delete this message?")) {
            await deleteMessage(id);
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return "Just now";
        if (timestamp.toDate) return timestamp.toDate().toLocaleDateString() + " " + timestamp.toDate().toLocaleTimeString();
        if (timestamp.seconds) return new Date(timestamp.seconds * 1000).toLocaleDateString();
        return "Unknown date";
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Messages</h1>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm font-medium text-white/60">
                    {messages.length} Total
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center p-20">
                    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
                </div>
            ) : messages.length === 0 ? (
                <div className="p-12 rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center opacity-50">
                    <MessageSquare size={48} className="mb-4 text-white/20" />
                    <p className="text-white/40 mb-2">Inbox is empty</p>
                    <p className="text-sm text-white/30">Messages from your contact form will appear here</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                                        {msg.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{msg.name}</h3>
                                        <div className="flex items-center gap-2 text-xs text-white/40">
                                            <Calendar size={12} />
                                            {formatDate(msg.createdAt)}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => msg.id && handleDelete(msg.id)}
                                    className="p-2 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 rounded-lg transition-all"
                                    title="Delete Message"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <a href={`mailto:${msg.email}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-primary transition-colors">
                                    <Mail size={14} />
                                    {msg.email}
                                </a>
                                {msg.phone && (
                                    <a href={`tel:${msg.phone}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-primary transition-colors">
                                        <Phone size={14} />
                                        {msg.phone}
                                    </a>
                                )}
                            </div>

                            <div className="bg-black/20 rounded-lg p-4 text-white/80 text-sm whitespace-pre-wrap leading-relaxed border border-white/5">
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
