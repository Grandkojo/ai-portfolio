"use client";

import { useState } from "react";
import { Send, CheckCircle2, Mail, Github, Linkedin, Copy, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function ContactSection() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [copied, setCopied] = useState(false);

    const email = "essienernest.kojoowusu@gmail.com";
    const github = "https://github.com/Grandkojo";
    const linkedin = "https://www.linkedin.com/in/ernest-essien-kojo";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const formData = new FormData(e.currentTarget);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: json,
            });

            const result = await response.json();

            if (response.status === 200) {
                setStatus("success");
            } else {
                console.error(result);
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-20 lg:py-32 container mx-auto px-4 relative flex items-center justify-center min-h-[600px] lg:min-h-[800px]">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-[-100px] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-primary/20 rounded-full blur-[80px] lg:blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 right-[-100px] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-accent/10 rounded-full blur-[80px] lg:blur-[120px] -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-6xl">
                {/* Left Column: Info & Socials */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60 leading-tight">
                            Let&apos;s Build <br />
                            <span className="text-primary">Something Amazing</span>
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                            Have a project in mind, a question about AI, or just want to connect?
                            I&apos;m always open to discussing new opportunities and innovative ideas.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 group cursor-pointer" onClick={copyEmail}>
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                                <Mail size={20} className="text-white group-hover:text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email me at</p>
                                <p className="text-lg font-medium text-white flex items-center gap-2">
                                    {email}
                                    {copied ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <SocialButton icon={<Github size={20} />} href={github} label="GitHub" />
                            <SocialButton icon={<Linkedin size={20} />} href={linkedin} label="LinkedIn" />
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Interactive Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="obsidian-card p-8 md:p-12 shadow-2xl relative group"
                >
                    {/* Obsidian Effects */}
                    <div className="obsidian-highlight group-hover:opacity-100" />
                    <div className="obsidian-border group-hover:ring-primary/30" />

                    {/* Decorative gradient inside card */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />

                    {status === "success" ? (
                        <div className="text-center py-20 flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(74,222,128,0.2)]"
                            >
                                <CheckCircle2 size={40} />
                            </motion.div>
                            <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-white/60 mb-8 max-w-xs mx-auto">
                                Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                            </p>
                            <button
                                onClick={() => setStatus("idle")}
                                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/5"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            {/* Web3Forms Hidden Fields */}
                            <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY} />
                            <input type="hidden" name="subject" value="New Portfolio Submission" />
                            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-white/70 ml-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-white/20"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-white/70 ml-1">Phone</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-white/20"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-white/70 ml-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-white/20"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-white/70 ml-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-white/20 resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            {status === "error" && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center">
                                    Something went wrong. Please try again later.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(123,44,191,0.4)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === "submitting" ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        Send Message <Send size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

function SocialButton({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1 group"
        >
            <span className="text-white/70 group-hover:text-white transition-colors">{icon}</span>
            <span className="font-medium text-white">{label}</span>
            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-white/50" />
        </a>
    );
}
