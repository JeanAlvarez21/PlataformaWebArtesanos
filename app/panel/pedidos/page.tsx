'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { Package, Home, Bell, Search, Eye, CheckCircle, Clock, Truck, XCircle, Filter } from 'lucide-react';

interface Order {
    id: string;
    customer: string;
    email: string;
    date: string;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: number;
}

const mockOrders: Order[] = [
    { id: 'ORD-001', customer: 'Carlos Mendoza', email: 'carlos@email.com', date: '2026-01-31', total: 85.50, status: 'pending', items: 2 },
    { id: 'ORD-002', customer: 'María López', email: 'maria@email.com', date: '2026-01-30', total: 125.00, status: 'processing', items: 3 },
    { id: 'ORD-003', customer: 'Juan Pérez', email: 'juan@email.com', date: '2026-01-29', total: 45.00, status: 'shipped', items: 1 },
    { id: 'ORD-004', customer: 'Ana García', email: 'ana@email.com', date: '2026-01-28', total: 200.00, status: 'delivered', items: 4 },
    { id: 'ORD-005', customer: 'Pedro Ruiz', email: 'pedro@email.com', date: '2026-01-27', total: 65.00, status: 'cancelled', items: 1 },
];

const statusConfig = {
    pending: { label: 'Pendiente', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
    processing: { label: 'Procesando', icon: Package, color: 'bg-blue-100 text-blue-700' },
    shipped: { label: 'Enviado', icon: Truck, color: 'bg-purple-100 text-purple-700' },
    delivered: { label: 'Entregado', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Cancelado', icon: XCircle, color: 'bg-red-100 text-red-700' },
};

export default function PedidosPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    React.useEffect(() => {
        if (!isAuthenticated) router.push('/login');
        else if (user?.type !== 'artisan') router.push('/');
    }, [isAuthenticated, user, router]);

    if (!user || user.type !== 'artisan') return null;

    const filteredOrders = mockOrders.filter(order => {
        const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || order.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        pending: mockOrders.filter(o => o.status === 'pending').length,
        processing: mockOrders.filter(o => o.status === 'processing').length,
        shipped: mockOrders.filter(o => o.status === 'shipped').length,
        delivered: mockOrders.filter(o => o.status === 'delivered').length,
    };

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
                                <h1 className="font-bold text-gray-900">Pedidos</h1>
                                <p className="text-xs text-gray-500">Portal Artesano</p>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-1">
                            <Link href="/panel" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Dashboard</Link>
                            <Link href="/panel/productos" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Productos</Link>
                            <Link href="/panel/pedidos" className="px-4 py-2 bg-loja-terracotta/10 text-loja-terracotta rounded-xl font-medium text-sm">Pedidos</Link>
                            <Link href="/panel/clientes" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Clientes</Link>
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
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gestión de Pedidos</h1>
                    <p className="text-gray-500 mt-1">Administra y da seguimiento a tus pedidos</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Pendientes', value: stats.pending, color: 'bg-yellow-500', icon: Clock },
                        { label: 'Procesando', value: stats.processing, color: 'bg-blue-500', icon: Package },
                        { label: 'Enviados', value: stats.shipped, color: 'bg-purple-500', icon: Truck },
                        { label: 'Entregados', value: stats.delivered, color: 'bg-green-500', icon: CheckCircle },
                    ].map((stat, i) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 ${stat.color}/10 rounded-xl flex items-center justify-center`}>
                                    <stat.icon size={24} className={stat.color.replace('bg-', 'text-').replace('-500', '-600')} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Buscar por cliente o ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none" />
                        </div>
                        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-loja-terracotta outline-none cursor-pointer">
                            <option value="all">Todos los estados</option>
                            <option value="pending">Pendientes</option>
                            <option value="processing">Procesando</option>
                            <option value="shipped">Enviados</option>
                            <option value="delivered">Entregados</option>
                            <option value="cancelled">Cancelados</option>
                        </select>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Pedido</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Cliente</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Fecha</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm">Estado</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-600 text-sm">Total</th>
                                    <th className="text-center py-4 px-6 font-semibold text-gray-600 text-sm">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order, i) => {
                                    const StatusIcon = statusConfig[order.status].icon;
                                    return (
                                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                                            <td className="py-4 px-6">
                                                <p className="font-bold text-gray-900">{order.id}</p>
                                                <p className="text-xs text-gray-500">{order.items} producto{order.items > 1 ? 's' : ''}</p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <p className="font-medium text-gray-900">{order.customer}</p>
                                                <p className="text-xs text-gray-500">{order.email}</p>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">{order.date}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig[order.status].color}`}>
                                                    <StatusIcon size={14} />
                                                    {statusConfig[order.status].label}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right font-bold text-gray-900">${order.total.toFixed(2)}</td>
                                            <td className="py-4 px-6 text-center">
                                                <button className="p-2 text-loja-blue hover:bg-loja-blue/10 rounded-lg transition-colors"><Eye size={18} /></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {filteredOrders.length === 0 && (
                        <div className="text-center py-16">
                            <Package size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No se encontraron pedidos</h3>
                            <p className="text-gray-500">Intenta con otros filtros</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
