"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Code, Cpu, Database, Globe, LineChart, MessageSquare, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent -z-10" />

            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-sm text-primary-foreground/80 shadow-[0_0_15px_rgba(138,43,226,0.1)] mb-6">
                        <Zap size={14} />
                        <span className="font-mono">Services & Solutions</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 tracking-tight">
                        Transforming Businesses with <br className="hidden md:block" />
                        <span className="text-primary drop-shadow-[0_0_30px_rgba(157,78,221,0.5)]">AI & Code</span>
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed">
                        I specialize in creating intelligent, automated systems tailored for growth.
                        Whether you need to streamline operations with AI or build a scalable digital product, I deliver modern solutions efficiently.
                    </p>
                </motion.div>

                {/* AI Automation Section */}
                <section className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10" />

                        <div className="flex flex-col lg:flex-row gap-12 items-start">
                            <div className="lg:w-1/3">
                                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                                    <BrainCircuit size={32} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Automation for SMEs</h2>
                                <p className="text-muted-foreground mb-8 text-lg">
                                    Streamline your business operations with intelligent automation.
                                    I build systems that reduce manual work, improve efficiency, and drive growth.
                                </p>
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold hover:scale-105 transition-transform"
                                >
                                    Start Automating <Zap size={18} />
                                </Link>
                            </div>

                            <div className="lg:w-2/3 grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <ServiceCard
                                    icon={<ShieldCheck className="text-emerald-400" />}
                                    title="Healthcare"
                                    items={["Patient management systems", "Appointment scheduling automation", "Medical record digitization", "Diagnostic assistance tools"]}
                                    delay={0.1}
                                />
                                <ServiceCard
                                    icon={<ScaleIcon className="text-amber-400" />}
                                    title="Legal"
                                    items={["Document automation", "Case management systems", "Contract analysis", "Client communication workflows"]}
                                    delay={0.2}
                                />
                                <ServiceCard
                                    icon={<HomeIcon className="text-blue-400" />}
                                    title="Real Estate"
                                    items={["Property management automation", "Lead generation systems", "Virtual tour integrations", "CRM solutions"]}
                                    delay={0.3}
                                />
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Custom Development Section */}
                <section className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden"
                    >
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10" />

                        <div className="flex flex-col lg:flex-row-reverse gap-12 items-start">
                            <div className="lg:w-1/3">
                                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-accent mb-6">
                                    <Code size={32} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Custom Web & App Development</h2>
                                <p className="text-muted-foreground mb-8 text-lg">
                                    Build powerful, scalable web applications tailored to your specific needs.
                                    From concept to deployment, I deliver robust code that stands the test of time.
                                </p>
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
                                >
                                    Build Your Project <Cpu size={18} />
                                </Link>
                            </div>

                            <div className="lg:w-2/3 grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <ServiceCard
                                    icon={<Globe className="text-cyan-400" />}
                                    title="Web Applications"
                                    items={["Full-stack development (React, Next.js)", "Backend API systems (Node, Django)", "Responsive & fast UI/UX", "Secure authentication systems"]}
                                    delay={0.1}
                                />
                                <ServiceCard
                                    icon={<LineChart className="text-green-400" />}
                                    title="E-commerce Platforms"
                                    items={["Custom online stores", "Payment gateway integration", "Inventory management dashboards", "Order tracking systems"]}
                                    delay={0.2}
                                />
                            </div>
                        </div>
                    </motion.div>
                </section>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <h3 className="text-2xl font-bold mb-6">Ready to transform your business?</h3>
                    <Link
                        href="/#contact"
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(157,78,221,0.5)] transition-all"
                    >
                        Let's Talk
                    </Link>
                </motion.div>

            </div>
        </main>
    );
}

function ServiceCard({ icon, title, items, delay }: { icon: React.ReactNode, title: string, items: string[], delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-primary/30 transition-colors group"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/5 text-white group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <ul className="space-y-2">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

// Icons specific to this page
function ScaleIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /></svg>
    )
}

function HomeIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
    )
}
