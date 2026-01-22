"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatWithGemini } from "@/app/actions";
import ReactMarkdown from "react-markdown";

interface Message {
    role: "user" | "model";
    parts: string;
}

export function Chatbot({ isOpen, onClose, initialContext }: { isOpen: boolean; onClose: () => void; initialContext?: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initialContext) {
            handleSend(initialContext);
        }
    }, [initialContext]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    async function handleSend(text: string = input) {
        if (!text.trim() || isLoading) return;

        const newMessages = [...messages, { role: "user" as const, parts: text }];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        const response = await chatWithGemini(newMessages);

        if (response.startsWith("RATE_LIMIT_EXCEEDED:")) {
            const errorMsg = response.replace("RATE_LIMIT_EXCEEDED:", "").trim();
            // Show as a system message or alert

            // We will add it as a model message but clearly an error.
            setMessages([...newMessages, { role: "model", parts: `⚠️ **System Alert:** ${errorMsg}` }]);
        } else {
            setMessages([...newMessages, { role: "model", parts: response }]);
        }

        setIsLoading(false);
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="fixed bottom-4 left-0 right-0 mx-auto md:left-auto md:right-8 md:bottom-4 md:mx-0 w-[85vw] md:w-[400px] h-[65vh] md:h-[600px] md:max-h-[80vh] bg-[#050505]/95 backdrop-blur-xl rounded-[1.5rem] flex flex-col shadow-2xl z-50 overflow-hidden border border-white/20 ring-1 ring-white/5"
                >
                    {/* Header */}
                    <div className="p-4 bg-white/5 backdrop-blur-md flex justify-between items-center border-b border-white/20">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                                <Bot size={18} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Ernest&apos;s AI Agent</h3>
                                <p className="text-xs text-white/60">Powered by Gemini Pro</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X size={20} className="text-white/70" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                        {messages.length === 0 && (
                            <div className="text-center mt-12 text-white/50 space-y-2">
                                <Bot size={48} className="mx-auto opacity-50 mb-4" />
                                <p>Hi! I&apos;m an AI trained on Ernest&apos;s professional background.</p>
                                <p className="text-sm">Ask me about his projects, skills, or experience.</p>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "flex gap-3 max-w-[85%]",
                                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    msg.role === "user" ? "bg-white/10" : "bg-primary/20"
                                )}>
                                    {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                                </div>
                                <div className={cn(
                                    "p-3 rounded-2xl text-sm leading-relaxed overflow-hidden",
                                    msg.role === "user"
                                        ? "bg-primary text-white rounded-tr-none"
                                        : "bg-white/10 text-white/90 rounded-tl-none"
                                )}>
                                    {msg.role === "user" ? (
                                        msg.parts
                                    ) : (
                                        <ReactMarkdown
                                            components={{
                                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                                                li: ({ children }) => <li>{children}</li>,
                                                strong: ({ children }) => <span className="font-bold text-white">{children}</span>,
                                                a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary-300 underline hover:text-primary-200">{children}</a>
                                            }}
                                        >
                                            {msg.parts}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex gap-3 mr-auto">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                    <Bot size={14} />
                                </div>
                                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white/5 border-t border-white/5">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="flex gap-2"
                        >
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-white/5 border border-white/20 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-white/30"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                            </button>
                        </form>
                        <p className="text-[10px] text-white/30 text-center mt-2">
                            Notice: No data from this conversation is stored on my app.
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
