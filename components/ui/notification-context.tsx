"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
    id: string;
    message: string;
    type: NotificationType;
}

interface ConfirmOptions {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'info';
}

interface NotificationContextType {
    showNotification: (message: string, type?: NotificationType) => void;
    confirmAction: (options: ConfirmOptions) => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [confirmModal, setConfirmModal] = useState<(ConfirmOptions & { resolve: (value: boolean) => void }) | null>(null);

    const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        setNotifications((prev) => [...prev, { id, message, type }]);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 5000);
    }, []);

    const confirmAction = useCallback((options: ConfirmOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            setConfirmModal({ ...options, resolve });
        });
    }, []);

    const handleConfirm = (value: boolean) => {
        if (confirmModal) {
            confirmModal.resolve(value);
            setConfirmModal(null);
        }
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification, confirmAction }}>
            {children}

            {/* Toasts */}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {notifications.map((n) => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }}
                            className={cn(
                                "pointer-events-auto flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl min-w-[320px] max-w-[450px]",
                                n.type === 'success' && "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
                                n.type === 'error' && "bg-rose-500/10 border-rose-500/20 text-rose-400",
                                n.type === 'info' && "bg-blue-500/10 border-blue-500/20 text-blue-400"
                            )}
                        >
                            <div className="shrink-0">
                                {n.type === 'success' && <CheckCircle2 size={20} />}
                                {n.type === 'error' && <AlertCircle size={20} />}
                                {n.type === 'info' && <Info size={20} />}
                            </div>
                            <p className="text-sm font-medium flex-1 pr-2">{n.message}</p>
                            <button
                                onClick={() => removeNotification(n.id)}
                                className="text-white/20 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {confirmModal && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => handleConfirm(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md overflow-hidden bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl"
                        >
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                                        confirmModal.type === 'danger' ? "bg-rose-500/20 text-rose-500" : "bg-primary/20 text-primary"
                                    )}>
                                        {confirmModal.type === 'danger' ? <AlertCircle size={24} /> : <HelpCircle size={24} />}
                                    </div>
                                    <h3 className="text-xl font-bold text-white">
                                        {confirmModal.title || 'Are you sure?'}
                                    </h3>
                                </div>
                                <p className="text-white/60 mb-8 leading-relaxed">
                                    {confirmModal.message}
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleConfirm(false)}
                                        className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors font-medium"
                                    >
                                        {confirmModal.cancelText || 'Cancel'}
                                    </button>
                                    <button
                                        onClick={() => handleConfirm(true)}
                                        className={cn(
                                            "flex-1 py-3 px-4 rounded-xl font-bold transition-all shadow-lg",
                                            confirmModal.type === 'danger'
                                                ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20"
                                                : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                                        )}
                                    >
                                        {confirmModal.confirmText || 'Confirm'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </NotificationContext.Provider>
    );
};
