'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';
import { User, Mail, ShoppingBag, Heart, Settings, LogOut, CreditCard, Bell, Shield, ChevronRight, Package, Edit3, Coffee, Sparkles, MapPin, Star, Award, Calendar, Truck } from 'lucide-react';
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
        { id: 'LN-001', producto: 'Poncho Saraguro Tradicional', fecha: '31 Ene', estado: 'Entregado', total: '$85.00', image: '/products/poncho.jpg' },
        { id: 'LN-002', producto: 'Café Vilcabamba Premium', fecha: '28 Ene', estado: 'En camino', total: '$24.50', image: '/products/cafe.jpg' },
        { id: 'LN-003', producto: 'Cerámica Artesanal', fecha: '20 Ene', estado: 'Entregado', total: '$45.00', image: '/products/ceramica.jpg' },
    ];

    const getStatusConfig = (estado: string) => {
        switch (estado) {
            case 'Entregado': return { color: 'bg-green-500', textColor: 'text-green-600', bgLight: 'bg-green-50', icon: Package };
            case 'En camino': return { color: 'bg-blue-500', textColor: 'text-blue-600', bgLight: 'bg-blue-50', icon: Truck };
            default: return { color: 'bg-gray-500', textColor: 'text-gray-600', bgLight: 'bg-gray-50', icon: Package };
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 flex flex-col relative overflow-hidden">
            <Navbar />

            {/* Decorative Background */}
            <svg className="absolute top-0 left-0 w-full h-64 pointer-events-none opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
                <path fill="#C45C3C" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L0,0Z" opacity="0.15" />
            </svg>
            <div className="absolute top-40 right-10 w-64 h-64 bg-loja-terracotta/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-40 left-10 w-48 h-48 bg-loja-gold/10 rounded-full blur-2xl pointer-events-none" />

            <div className="pt-28 pb-16 flex-1 relative z-10">
                <div className="max-w-5xl mx-auto px-4">

                    {/* Profile Header */}
                    <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden mb-10 animate-slide-in-up">
                        {/* Banner */}
                        <div className="h-36 bg-gradient-to-r from-loja-dark via-loja-terracotta to-loja-dark relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 flex">
                                <div className="flex-1 bg-yellow-400" />
                                <div className="flex-1 bg-blue-600" />
                                <div className="flex-1 bg-red-600" />
                            </div>
                            <div className="absolute inset-0 opacity-10">
                                <svg width="100%" height="100%"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff" /></pattern></defs><rect width="100%" height="100%" fill="url(#dots)" /></svg>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                        </div>

                        <div className="px-10 pb-10 -mt-14 relative z-10">
                            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-loja-terracotta to-loja-dark shadow-2xl flex items-center justify-center text-4xl font-black text-white border-4 border-white">
                                        {user.avatar}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                                        <Sparkles size={14} />
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 text-center md:text-left mb-2 md:mb-0">
                                    <h1 className="text-3xl font-black text-loja-dark leading-tight tracking-tight">{user.name}</h1>
                                    <p className="text-gray-500 font-bold flex items-center justify-center md:justify-start gap-2 mt-1">
                                        <Mail size={14} className="text-loja-terracotta" />
                                        {user.email}
                                    </p>
                                    <div className="mt-3 flex items-center justify-center md:justify-start gap-2 flex-wrap">
                                        <span className="text-[9px] font-black text-loja-gold bg-loja-dark px-4 py-1.5 rounded-full inline-flex items-center gap-2 tracking-widest uppercase">
                                            <Award size={12} />
                                            Cliente Premium
                                        </span>
                                        <span className="text-[9px] font-black text-gray-400 bg-gray-100 px-4 py-1.5 rounded-full inline-flex items-center gap-2 tracking-widest uppercase">
                                            <Calendar size={12} />
                                            Desde 2024
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="px-5 py-2.5 text-sm bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center gap-2">
                                        <Edit3 size={16} />
                                        Editar
                                    </button>
                                    {user.type === 'artisan' && (
                                        <Link
                                            href="/panel"
                                            className="px-5 py-2.5 bg-loja-terracotta text-white text-sm rounded-xl font-bold hover:bg-loja-dark transition-all shadow-lg flex items-center gap-2"
                                        >
                                            <Coffee size={16} />
                                            Panel Artesano
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-100">
                                {[
                                    { value: '12', label: 'Compras', icon: ShoppingBag },
                                    { value: '5', label: 'Favoritos', icon: Heart },
                                    { value: '8', label: 'Reseñas', icon: Star },
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center group cursor-default">
                                        <div className="w-12 h-12 bg-loja-terracotta/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-loja-terracotta group-hover:text-white transition-all text-loja-terracotta">
                                            <stat.icon size={20} />
                                        </div>
                                        <div className="text-2xl font-black text-loja-dark">{stat.value}</div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-5 gap-8">
                        {/* Navigation Menu */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white rounded-[2.5rem] shadow-lg border border-gray-100 overflow-hidden">
                                <div className="px-8 py-5 border-b border-gray-50">
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ajustes de cuenta</h3>
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {menuItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="flex items-center justify-between px-8 py-4 hover:bg-gray-50 transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-loja-terracotta/10 group-hover:text-loja-terracotta transition-colors">
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

                        {/* Recent Orders */}
                        <div className="md:col-span-3">
                            <div className="bg-white rounded-[2.5rem] shadow-lg border border-gray-100 overflow-hidden">
                                <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                                    <h3 className="font-black text-loja-dark text-lg">Actividad Reciente</h3>
                                    <Link href="#" className="text-loja-terracotta text-[10px] font-black hover:underline uppercase tracking-widest">
                                        Ver todo
                                    </Link>
                                </div>

                                <div className="divide-y divide-gray-50">
                                    {recentOrders.map((order) => {
                                        const statusConfig = getStatusConfig(order.estado);
                                        return (
                                            <div key={order.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-16 h-16 bg-loja-beige rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                                                        <Coffee size={28} className="text-loja-terracotta" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <span className="font-black text-loja-dark truncate">{order.producto}</span>
                                                        </div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pedido #{order.id} · {order.fecha}</p>
                                                    </div>
                                                    <div className="text-right flex flex-col items-end gap-2">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusConfig.bgLight} ${statusConfig.textColor}`}>
                                                            {order.estado}
                                                        </span>
                                                        <div className="font-black text-loja-dark text-lg">{order.total}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="p-6 bg-gray-50/50 border-t border-gray-50">
                                    <Link
                                        href="/#marketplace"
                                        className="flex items-center justify-center gap-3 py-4 bg-loja-dark text-white rounded-2xl text-sm font-bold hover:bg-loja-terracotta transition-all shadow-lg group"
                                    >
                                        <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                                        Seguir Comprando
                                    </Link>
                                </div>
                            </div>

                            {/* CTA Card */}
                            <div className="bg-gradient-to-br from-loja-dark to-loja-terracotta rounded-[2.5rem] p-8 text-white mt-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1 flex">
                                    <div className="flex-1 bg-yellow-400" />
                                    <div className="flex-1 bg-blue-600" />
                                    <div className="flex-1 bg-red-600" />
                                </div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                                <Sparkles size={28} className="text-loja-gold mb-4" />
                                <h3 className="text-xl font-black mb-2">¡Gracias por ser parte de LojaNia!</h3>
                                <p className="text-white/70 text-sm mb-4">Cada compra apoya directamente a los artesanos lojanos y preserva nuestra cultura.</p>
                                <button className="bg-white text-loja-dark px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-loja-gold transition-colors">
                                    Explorar Artesanos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
