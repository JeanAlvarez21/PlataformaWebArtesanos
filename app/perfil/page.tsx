'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';
import { User, Mail, ShoppingBag, Heart, Settings, LogOut, CreditCard, Bell, Shield, ChevronRight, Package, Edit3, Coffee, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PerfilPage() {
    const router = useRouter();
    const { user, logout, isAuthenticated } = useAuth();

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const menuItems = [
        { icon: ShoppingBag, label: 'Mis Pedidos', href: '#', count: 3 },
        { icon: Heart, label: 'Lista de Deseos', href: '/#marketplace', count: 5 },
        { icon: Package, label: 'Seguimiento', href: '#' },
        { icon: CreditCard, label: 'Métodos de Pago', href: '#' },
        { icon: Bell, label: 'Notificaciones', href: '#' },
        { icon: Shield, label: 'Seguridad', href: '#' },
        { icon: Settings, label: 'Configuración', href: '#' },
    ];

    const recentOrders = [
        { id: 'LN-001', producto: 'Manta Saraguro', fecha: '15 Ene', estado: 'Entregado', total: '$85.00' },
        { id: 'LN-002', producto: 'Café Vilcabamba', fecha: '20 Ene', estado: 'En camino', total: '$24.50' },
    ];

    const getStatusColor = (estado: string) => {
        switch (estado) {
            case 'Entregado': return 'bg-green-100 text-green-700';
            case 'En camino': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="pt-24 pb-12 flex-1">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Profile Header - Fix contrast and visibility */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                        {/* Banner de color café */}
                        <div className="h-28 bg-gradient-to-r from-[#5D2E17] to-[#8B4513] relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <svg width="100%" height="100%"><defs><pattern id="p" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#fff" /></pattern></defs><rect width="100%" height="100%" fill="url(#p)" /></svg>
                            </div>
                        </div>

                        <div className="px-8 pb-8 -mt-12 relative z-10">
                            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                                {/* Avatar */}
                                <div className="w-28 h-28 rounded-2xl bg-white shadow-xl flex items-center justify-center text-3xl font-bold text-loja-terracotta border-4 border-white">
                                    {user.avatar}
                                </div>

                                {/* User Info - Clearly on white background with high contrast */}
                                <div className="flex-1 text-center md:text-left mb-2 md:mb-0">
                                    <h1 className="text-3xl font-black text-gray-900 leading-tight tracking-tight">{user.name}</h1>
                                    <p className="text-gray-600 font-bold flex items-center justify-center md:justify-start gap-2">
                                        <Mail size={14} className="text-loja-terracotta" />
                                        {user.email}
                                    </p>
                                    <div className="mt-3 text-[10px] font-black text-loja-terracotta bg-loja-terracotta/5 px-4 py-1.5 rounded-full inline-flex items-center gap-2 border border-loja-terracotta/10 tracking-[0.2em] uppercase">
                                        <Sparkles size={12} />
                                        CLIENTE PREMIUM
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button className="px-5 py-2.5 text-sm bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center gap-2">
                                        <Edit3 size={16} />
                                        Editar
                                    </button>
                                    {user.type === 'artisan' && (
                                        <Link
                                            href="/panel"
                                            className="px-5 py-2.5 bg-loja-terracotta text-white text-sm rounded-xl font-bold hover:bg-loja-dark transition-all shadow-lg shadow-loja-terracotta/20"
                                        >
                                            Panel Artesano
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-100">
                                <div className="text-center group cursor-default">
                                    <div className="text-2xl font-bold text-gray-900 group-hover:text-loja-terracotta transition-colors">12</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Compras</div>
                                </div>
                                <div className="text-center group cursor-default">
                                    <div className="text-2xl font-bold text-gray-900 group-hover:text-loja-terracotta transition-colors">5</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Favoritos</div>
                                </div>
                                <div className="text-center group cursor-default">
                                    <div className="text-2xl font-bold text-gray-900 group-hover:text-loja-terracotta transition-colors">8</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Reseñas</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-5 gap-8">
                        {/* Navigation Menu */}
                        <div className="md:col-span-2 space-y-4">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-50">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Ajustes de cuenta</h3>
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {menuItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-loja-terracotta/10 group-hover:text-loja-terracotta transition-colors">
                                                    <item.icon size={20} />
                                                </div>
                                                <span className="text-sm font-bold text-gray-700">{item.label}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {item.count && (
                                                    <span className="px-2.5 py-0.5 bg-loja-terracotta text-white text-[10px] font-black rounded-full">
                                                        {item.count}
                                                    </span>
                                                )}
                                                <ChevronRight size={18} className="text-gray-300 group-hover:text-loja-terracotta group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full py-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold hover:bg-red-100 transition-all flex items-center justify-center gap-2 border border-red-100"
                            >
                                <LogOut size={18} />
                                Cerrar Sesión
                            </button>
                        </div>

                        {/* Recent Orders Progress */}
                        <div className="md:col-span-3">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900">Actividad Reciente</h3>
                                    <Link href="#" className="text-loja-terracotta text-xs font-bold hover:underline uppercase tracking-widest">
                                        Ver historial
                                    </Link>
                                </div>

                                <div className="divide-y divide-gray-50">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-loja-terracotta/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-loja-terracotta/10 transition-colors">
                                                    <Coffee size={24} className="text-loja-terracotta" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="font-bold text-gray-900 text-sm truncate">{order.producto}</span>
                                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusColor(order.estado)}`}>
                                                            {order.estado}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs font-medium text-gray-400">Order #{order.id} · {order.fecha}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900">{order.total}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 bg-gray-50/50 border-t border-gray-50">
                                    <Link
                                        href="/#marketplace"
                                        className="flex items-center justify-center gap-3 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-600 font-bold hover:border-loja-terracotta hover:text-loja-terracotta transition-all shadow-sm group"
                                    >
                                        <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                                        Volver a la tienda
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
