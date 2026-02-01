'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import PanelLayout from '@/components/panel/PanelLayout';
import { ShoppingBag, Search, Eye, CheckCircle, Clock, Truck, XCircle, Package, DollarSign, ArrowRight } from 'lucide-react';

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
    pending: { label: 'Pendiente', icon: Clock, color: 'bg-yellow-500', textColor: 'text-yellow-600', bgLight: 'bg-yellow-50' },
    processing: { label: 'Procesando', icon: Package, color: 'bg-blue-500', textColor: 'text-blue-600', bgLight: 'bg-blue-50' },
    shipped: { label: 'Enviado', icon: Truck, color: 'bg-purple-500', textColor: 'text-purple-600', bgLight: 'bg-purple-50' },
    delivered: { label: 'Entregado', icon: CheckCircle, color: 'bg-green-500', textColor: 'text-green-600', bgLight: 'bg-green-50' },
    cancelled: { label: 'Cancelado', icon: XCircle, color: 'bg-red-500', textColor: 'text-red-600', bgLight: 'bg-red-50' },
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

    const stats = [
        { label: 'Pendientes', value: mockOrders.filter(o => o.status === 'pending').length, icon: Clock, color: 'bg-yellow-500' },
        { label: 'Procesando', value: mockOrders.filter(o => o.status === 'processing').length, icon: Package, color: 'bg-blue-500' },
        { label: 'Enviados', value: mockOrders.filter(o => o.status === 'shipped').length, icon: Truck, color: 'bg-purple-500' },
        { label: 'Entregados', value: mockOrders.filter(o => o.status === 'delivered').length, icon: CheckCircle, color: 'bg-green-500' },
    ];

    return (
        <PanelLayout>
            {/* Page Header */}
            <div className="mb-10 animate-slide-in-up">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <ShoppingBag size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-loja-dark">Gestión de Pedidos</h1>
                        <p className="text-gray-500 font-medium">Administra y da seguimiento a tus pedidos</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
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
                                <p className="text-3xl font-black text-loja-dark">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                <stat.icon size={22} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-[2rem] p-5 shadow-lg border border-gray-100 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por cliente o ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-medium transition-all"
                        />
                    </div>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none cursor-pointer font-bold text-sm"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="pending">Pendientes</option>
                        <option value="processing">Procesando</option>
                        <option value="shipped">Enviados</option>
                        <option value="delivered">Entregados</option>
                        <option value="cancelled">Cancelados</option>
                    </select>
                </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-[2.5rem] shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="text-left py-4 px-6 font-black text-[10px] text-gray-400 uppercase tracking-widest">Pedido</th>
                                <th className="text-left py-4 px-6 font-black text-[10px] text-gray-400 uppercase tracking-widest">Cliente</th>
                                <th className="text-left py-4 px-6 font-black text-[10px] text-gray-400 uppercase tracking-widest hidden md:table-cell">Fecha</th>
                                <th className="text-left py-4 px-6 font-black text-[10px] text-gray-400 uppercase tracking-widest">Estado</th>
                                <th className="text-right py-4 px-6 font-black text-[10px] text-gray-400 uppercase tracking-widest">Total</th>
                                <th className="text-center py-4 px-6 font-black text-[10px] text-gray-400 uppercase tracking-widest">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, i) => {
                                const StatusIcon = statusConfig[order.status].icon;
                                const config = statusConfig[order.status];
                                return (
                                    <tr
                                        key={order.id}
                                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors animate-fade-in"
                                        style={{ animationDelay: `${i * 30}ms` }}
                                    >
                                        <td className="py-5 px-6">
                                            <p className="font-black text-loja-dark">{order.id}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.items} producto{order.items > 1 ? 's' : ''}</p>
                                        </td>
                                        <td className="py-5 px-6">
                                            <p className="font-bold text-loja-dark">{order.customer}</p>
                                            <p className="text-xs text-gray-400">{order.email}</p>
                                        </td>
                                        <td className="py-5 px-6 text-gray-500 font-medium hidden md:table-cell">{order.date}</td>
                                        <td className="py-5 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${config.bgLight} ${config.textColor}`}>
                                                <StatusIcon size={12} />
                                                {config.label}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 text-right font-black text-loja-dark text-lg">${order.total.toFixed(2)}</td>
                                        <td className="py-5 px-6 text-center">
                                            <button className="w-10 h-10 bg-gray-50 hover:bg-loja-terracotta hover:text-white rounded-xl flex items-center justify-center text-gray-400 transition-all mx-auto">
                                                <ArrowRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-16">
                        <Package size={56} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-black text-loja-dark mb-2">No se encontraron pedidos</h3>
                        <p className="text-gray-500">Intenta con otros filtros</p>
                    </div>
                )}
            </div>
        </PanelLayout>
    );
}
