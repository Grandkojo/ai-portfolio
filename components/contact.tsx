"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { addMessage } from "@/lib/db";
import { ScrollReveal } from "@/components/scroll-reveal";

export function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;

        setStatus("sending");
        try {
            await addMessage({
                name: form.name,
                email: form.email,
                message: form.message,
            });
            setStatus("sent");
            setForm({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 4000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <section id="contact" className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-5 md:px-6">
                <ScrollReveal>
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-lg font-medium text-foreground">Get in Touch</h2>
                        <div className="flex-1 h-px bg-border" />
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <div className="max-w-lg">
                        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                            Have a project in mind or just want to connect?
                            Drop a message and I&apos;ll get back to you.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-2.5 text-sm rounded-lg bg-muted border border-border
                                               text-foreground placeholder:text-muted-foreground
                                               focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50
                                               transition-all duration-200"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full px-4 py-2.5 text-sm rounded-lg bg-muted border border-border
                                               text-foreground placeholder:text-muted-foreground
                                               focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50
                                               transition-all duration-200"
                                    required
                                />
                            </div>
                            <textarea
                                placeholder="Your message..."
                                rows={4}
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                className="w-full px-4 py-2.5 text-sm rounded-lg bg-muted border border-border
                                           text-foreground placeholder:text-muted-foreground resize-none
                                           focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50
                                           transition-all duration-200"
                                required
                            />

                            {status === "error" && (
                                <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                            )}

                            <button
                                type="submit"
                                disabled={status === "sending" || status === "sent"}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                                           bg-accent text-accent-foreground text-sm font-medium
                                           hover:opacity-90 disabled:opacity-60 transition-all duration-200"
                            >
                                {status === "sent" ? (
                                    <>
                                        <CheckCircle size={15} />
                                        Sent!
                                    </>
                                ) : (
                                    <>
                                        <Send size={15} />
                                        {status === "sending" ? "Sending..." : "Send Message"}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
