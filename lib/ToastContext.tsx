'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X, ShoppingCart, Heart, Sparkles } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'cart' | 'wishlist';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
    title?: string;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'success', title?: string) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: Toast = { id, message, type, title };

        setToasts((prev) => [...prev, newToast]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const getConfig = (type: ToastType) => {
        switch (type) {
            case 'success':
                return {
                    icon: <CheckCircle size={22} />,
                    gradient: 'from-green-500 to-emerald-600',
                    iconBg: 'bg-green-500',
                    border: 'border-green-200',
                    bg: 'bg-gradient-to-r from-green-50 to-emerald-50'
                };
            case 'error':
                return {
                    icon: <XCircle size={22} />,
                    gradient: 'from-red-500 to-rose-600',
                    iconBg: 'bg-red-500',
                    border: 'border-red-200',
                    bg: 'bg-gradient-to-r from-red-50 to-rose-50'
                };
            case 'warning':
                return {
                    icon: <AlertCircle size={22} />,
                    gradient: 'from-yellow-500 to-orange-500',
                    iconBg: 'bg-yellow-500',
                    border: 'border-yellow-200',
                    bg: 'bg-gradient-to-r from-yellow-50 to-orange-50'
                };
            case 'info':
                return {
                    icon: <Info size={22} />,
                    gradient: 'from-blue-500 to-indigo-600',
                    iconBg: 'bg-blue-500',
                    border: 'border-blue-200',
                    bg: 'bg-gradient-to-r from-blue-50 to-indigo-50'
                };
            case 'cart':
                return {
                    icon: <ShoppingCart size={22} />,
                    gradient: 'from-loja-terracotta to-loja-dark',
                    iconBg: 'bg-loja-terracotta',
                    border: 'border-loja-terracotta/20',
                    bg: 'bg-gradient-to-r from-loja-beige to-white'
                };
            case 'wishlist':
                return {
                    icon: <Heart size={22} fill="currentColor" />,
                    gradient: 'from-pink-500 to-red-500',
                    iconBg: 'bg-pink-500',
                    border: 'border-pink-200',
                    bg: 'bg-gradient-to-r from-pink-50 to-red-50'
                };
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed bottom-6 right-6 z-[100] space-y-3 pointer-events-none">
                {toasts.map((toast, index) => {
                    const config = getConfig(toast.type);
                    return (
                        <div
                            key={toast.id}
                            className={`
                                pointer-events-auto
                                flex items-start gap-4 p-4 rounded-2xl shadow-2xl border
                                ${config.bg} ${config.border}
                                min-w-[320px] max-w-[420px]
                                animate-slide-in-right
                                backdrop-blur-xl
                            `}
                            style={{
                                animationDelay: `${index * 50}ms`,
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                            }}
                        >
                            {/* Icon */}
                            <div className={`w-11 h-11 rounded-xl ${config.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                {config.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 py-0.5">
                                {toast.title && (
                                    <p className="font-black text-gray-900 text-sm mb-0.5">{toast.title}</p>
                                )}
                                <p className="text-gray-600 font-medium text-sm leading-relaxed">{toast.message}</p>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600 flex-shrink-0"
                            >
                                <X size={16} />
                            </button>

                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${config.gradient} animate-shrink-width`}
                                    style={{ animationDuration: '4s' }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
