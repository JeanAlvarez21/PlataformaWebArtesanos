'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { Home, Package, ShoppingBag, Users, Settings, Bell, LogOut, Coffee, Sparkles } from 'lucide-react';

const navItems = [
    { href: '/panel', label: 'Dashboard', icon: Home },
    { href: '/panel/productos', label: 'Productos', icon: Package },
    { href: '/panel/pedidos', label: 'Pedidos', icon: ShoppingBag },
    { href: '/panel/clientes', label: 'Clientes', icon: Users },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 relative overflow-hidden">
            {/* Decorative Background */}
            <svg className="fixed top-0 left-0 w-full h-64 pointer-events-none opacity-10 z-0" preserveAspectRatio="none" viewBox="0 0 1440 320">
                <path fill="#8B4513" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L0,0Z" />
            </svg>
            <div className="fixed top-40 right-10 w-64 h-64 bg-loja-terracotta/5 rounded-full blur-3xl pointer-events-none z-0" />
            <div className="fixed bottom-40 left-10 w-48 h-48 bg-loja-gold/10 rounded-full blur-2xl pointer-events-none z-0" />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                                    <Coffee size={20} />
                                </div>
                            </Link>
                            <div className="hidden sm:block">
                                <div className="flex items-center gap-2">
                                    <h1 className="font-black text-loja-dark tracking-tight">LojaNia</h1>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-loja-terracotta bg-loja-terracotta/10 px-2 py-0.5 rounded-full">Panel</span>
                                </div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Portal Artesano</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all ${isActive
                                            ? 'bg-white text-loja-terracotta shadow-lg'
                                            : 'text-gray-500 hover:text-loja-dark'
                                            }`}
                                    >
                                        <item.icon size={16} />
                                        <span className="hidden lg:inline">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            <button className="relative w-10 h-10 flex items-center justify-center bg-gray-100/50 text-gray-400 rounded-xl hover:bg-white hover:text-loja-terracotta transition-all">
                                <Bell size={18} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
                            </button>

                            <Link href="/" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/50 text-gray-500 rounded-xl font-bold text-xs hover:bg-loja-terracotta hover:text-white transition-all border border-gray-100">
                                <Home size={14} />
                                Tienda
                            </Link>

                            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                                {user && (
                                    <div className="hidden sm:block text-right">
                                        <p className="text-xs font-bold text-loja-dark">{user.name}</p>
                                        <p className="text-[10px] font-medium text-gray-400">Artesano</p>
                                    </div>
                                )}
                                <div className="relative group">
                                    <button className="w-10 h-10 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                                        {user?.avatar || '👤'}
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                        <div className="py-2">
                                            <Link href="/panel/configuracion" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm">
                                                <Settings size={16} />
                                                Configuración
                                            </Link>
                                            <hr className="my-2 border-gray-100" />
                                            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full font-medium text-sm">
                                                <LogOut size={16} />
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
