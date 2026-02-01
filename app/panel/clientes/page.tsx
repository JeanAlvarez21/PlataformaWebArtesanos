'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import PanelLayout from '@/components/panel/PanelLayout';
import { Users, Search, Mail, Phone, ShoppingBag, DollarSign, Calendar, Star, MessageCircle, ArrowRight } from 'lucide-react';

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    orders: number;
    totalSpent: number;
    lastOrder: string;
    avatar: string;
}

const mockCustomers: Customer[] = [
    { id: 'c1', name: 'Carlos Mendoza', email: 'carlos.mendoza@gmail.com', phone: '+593 99 123 4567', orders: 5, totalSpent: 450.00, lastOrder: '2026-01-31', avatar: 'CM' },
    { id: 'c2', name: 'María López', email: 'maria.lopez@email.com', phone: '+593 98 765 4321', orders: 3, totalSpent: 280.00, lastOrder: '2026-01-28', avatar: 'ML' },
    { id: 'c3', name: 'Juan Pérez', email: 'juan.perez@email.com', phone: '+593 97 111 2222', orders: 8, totalSpent: 720.00, lastOrder: '2026-01-25', avatar: 'JP' },
    { id: 'c4', name: 'Ana García', email: 'ana.garcia@email.com', phone: '+593 96 333 4444', orders: 2, totalSpent: 150.00, lastOrder: '2026-01-20', avatar: 'AG' },
    { id: 'c5', name: 'Pedro Ruiz', email: 'pedro.ruiz@email.com', phone: '+593 95 555 6666', orders: 12, totalSpent: 1200.00, lastOrder: '2026-01-30', avatar: 'PR' },
];

export default function ClientesPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');

    React.useEffect(() => {
        if (!isAuthenticated) router.push('/login');
        else if (user?.type !== 'artisan') router.push('/');
    }, [isAuthenticated, user, router]);

    if (!user || user.type !== 'artisan') return null;

    const filteredCustomers = mockCustomers.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalCustomers = mockCustomers.length;
    const totalOrders = mockCustomers.reduce((sum, c) => sum + c.orders, 0);
    const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgOrderValue = totalRevenue / totalOrders;

    const stats = [
        { label: 'Total Clientes', value: totalCustomers, icon: Users, color: 'bg-loja-terracotta' },
        { label: 'Total Pedidos', value: totalOrders, icon: ShoppingBag, color: 'bg-blue-500' },
        { label: 'Ingresos Totales', value: `$${totalRevenue.toFixed(0)}`, icon: DollarSign, color: 'bg-green-500' },
        { label: 'Ticket Promedio', value: `$${avgOrderValue.toFixed(2)}`, icon: Star, color: 'bg-yellow-500' },
    ];

    return (
        <PanelLayout>
            {/* Page Header */}
            <div className="mb-10 animate-slide-in-up">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <Users size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-loja-dark">Mis Clientes</h1>
                        <p className="text-gray-500 font-medium">Conoce a quienes apoyan tu trabajo artesanal</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-[2rem] p-5 shadow-lg border border-gray-100 animate-fade-in hover:shadow-xl transition-shadow"
                        style={{ animationDelay: `${i * 50}ms` }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-loja-dark">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                <stat.icon size={22} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="bg-white rounded-[2rem] p-5 shadow-lg border border-gray-100 mb-8">
                <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar clientes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-medium transition-all"
                    />
                </div>
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCustomers.map((customer, i) => (
                    <div
                        key={customer.id}
                        className="bg-white rounded-[2.5rem] p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all animate-fade-in"
                        style={{ animationDelay: `${i * 50}ms` }}
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                                    {customer.avatar}
                                </div>
                                <div>
                                    <h3 className="font-black text-loja-dark">{customer.name}</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{customer.orders} pedidos</p>
                                </div>
                            </div>
                            <button className="w-10 h-10 bg-loja-terracotta/10 hover:bg-loja-terracotta hover:text-white rounded-xl flex items-center justify-center text-loja-terracotta transition-all">
                                <MessageCircle size={18} />
                            </button>
                        </div>

                        <div className="space-y-3 mb-5">
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <Mail size={14} className="text-gray-400" />
                                <span className="truncate font-medium">{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <Phone size={14} className="text-gray-400" />
                                <span className="font-medium">{customer.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <Calendar size={14} className="text-gray-400" />
                                <span className="font-medium">Último: {customer.lastOrder}</span>
                            </div>
                        </div>

                        <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total gastado</p>
                                <p className="text-2xl font-black text-loja-terracotta">${customer.totalSpent.toFixed(2)}</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-loja-dark hover:text-white rounded-xl font-bold text-xs uppercase tracking-widest text-gray-400 transition-all">
                                Ver <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCustomers.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[3rem] shadow-lg border border-gray-100">
                    <Users size={56} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-black text-loja-dark mb-2">No se encontraron clientes</h3>
                    <p className="text-gray-500">Intenta con otros términos de búsqueda</p>
                </div>
            )}
        </PanelLayout>
    );
}
