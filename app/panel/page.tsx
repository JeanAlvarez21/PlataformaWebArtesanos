'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import PanelLayout from '@/components/panel/PanelLayout';
import Dashboard from '@/components/artisan/Dashboard';
import Inventory from '@/components/artisan/Inventory';
import Orders from '@/components/artisan/Orders';
import { Sparkles, TrendingUp, Package, DollarSign, Users } from 'lucide-react';

export default function PanelPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else if (user?.type !== 'artisan') {
            router.push('/');
        }
    }, [isAuthenticated, user, router]);

    if (!user || user.type !== 'artisan') {
        return null;
    }

    const stats = [
        { label: 'Ventas del Mes', value: '$2,450', change: '+12%', icon: DollarSign, color: 'bg-green-500' },
        { label: 'Pedidos Activos', value: '18', change: '+5', icon: Package, color: 'bg-loja-terracotta' },
        { label: 'Clientes Nuevos', value: '24', change: '+8%', icon: Users, color: 'bg-blue-500' },
        { label: 'Productos', value: '42', change: '+2', icon: TrendingUp, color: 'bg-purple-500' },
    ];

    return (
        <PanelLayout>
            {/* Welcome Header */}
            <div className="mb-10 animate-slide-in-up">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-loja-dark">¡Bienvenida, {user.name.split(' ')[0]}!</h1>
                        <p className="text-gray-500 font-medium">Aquí está el resumen de tu actividad comercial</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stats.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-[2rem] p-6 shadow-lg border border-gray-100 animate-fade-in hover:shadow-xl transition-shadow"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                <stat.icon size={22} />
                            </div>
                            <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-2xl font-black text-loja-dark mb-1">{stat.value}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Recent Orders */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-loja-dark">Pedidos Recientes</h2>
                            <span className="text-[10px] font-bold text-loja-terracotta uppercase tracking-widest cursor-pointer hover:underline">Ver Todos</span>
                        </div>
                        <Orders />
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Quick Inventory */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-loja-dark">Inventario</h2>
                            <span className="text-[10px] font-bold text-loja-terracotta uppercase tracking-widest cursor-pointer hover:underline">Gestionar</span>
                        </div>
                        <Inventory />
                    </div>

                    {/* CTA Card */}
                    <div className="bg-gradient-to-br from-loja-dark to-loja-terracotta rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 flex">
                            <div className="flex-1 bg-yellow-400" />
                            <div className="flex-1 bg-blue-600" />
                            <div className="flex-1 bg-red-600" />
                        </div>
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                        <Sparkles size={32} className="text-loja-gold mb-4" />
                        <h3 className="text-xl font-black mb-2">¿Listo para crecer?</h3>
                        <p className="text-white/70 text-sm mb-4">Descubre cómo aumentar tus ventas con nuestras herramientas premium.</p>
                        <button className="bg-white text-loja-dark px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-loja-gold transition-colors">
                            Explorar Opciones
                        </button>
                    </div>
                </div>
            </div>
        </PanelLayout>
    );
}
