'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { Users, Home, Bell, Search, Mail, Phone, ShoppingBag, DollarSign, Calendar, Star, MoreVertical } from 'lucide-react';

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

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-xl flex items-center justify-center text-white font-bold shadow-md">LN</div>
                            </Link>
                            <div className="hidden sm:block">
                                <h1 className="font-bold text-gray-900">Clientes</h1>
                                <p className="text-xs text-gray-500">Portal Artesano</p>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-1">
                            <Link href="/panel" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Dashboard</Link>
                            <Link href="/panel/productos" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Productos</Link>
                            <Link href="/panel/pedidos" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Pedidos</Link>
                            <Link href="/panel/clientes" className="px-4 py-2 bg-loja-terracotta/10 text-loja-terracotta rounded-xl font-medium text-sm">Clientes</Link>
                        </nav>
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                                <Bell size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <Link href="/" className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors"><Home size={16} />Ver Tienda</Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 animate-slide-in-up">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Mis Clientes</h1>
                    <p className="text-gray-500 mt-1">Conoce a quienes apoyan tu trabajo artesanal</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Clientes', value: totalCustomers, icon: Users, color: 'loja-terracotta' },
                        { label: 'Total Pedidos', value: totalOrders, icon: ShoppingBag, color: 'loja-blue' },
                        { label: 'Ingresos Totales', value: `$${totalRevenue.toFixed(0)}`, icon: DollarSign, color: 'loja-green' },
                        { label: 'Ticket Promedio', value: `$${avgOrderValue.toFixed(2)}`, icon: Star, color: 'yellow-500' },
                    ].map((stat, i) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 bg-${stat.color}/10 rounded-xl flex items-center justify-center`}>
                                    <stat.icon size={24} className={`text-${stat.color}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search */}
                <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
                    <div className="relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Buscar clientes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none" />
                    </div>
                </div>

                {/* Customers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCustomers.map((customer, i) => (
                        <div key={customer.id} className="bg-white rounded-2xl p-6 shadow-sm card-hover animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                                        {customer.avatar}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{customer.name}</h3>
                                        <p className="text-sm text-gray-500">{customer.orders} pedidos</p>
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail size={16} className="text-gray-400" />
                                    <span className="truncate">{customer.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Phone size={16} className="text-gray-400" />
                                    <span>{customer.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span>Último pedido: {customer.lastOrder}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500">Total gastado</p>
                                    <p className="text-xl font-bold text-loja-terracotta">${customer.totalSpent.toFixed(2)}</p>
                                </div>
                                <button className="px-4 py-2 text-loja-blue hover:bg-loja-blue/10 rounded-xl font-medium text-sm transition-colors">
                                    Ver Perfil
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCustomers.length === 0 && (
                    <div className="text-center py-16">
                        <Users size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No se encontraron clientes</h3>
                        <p className="text-gray-500">Intenta con otros términos de búsqueda</p>
                    </div>
                )}
            </main>
        </div>
    );
}
