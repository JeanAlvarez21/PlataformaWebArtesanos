'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import Dashboard from '@/components/artisan/Dashboard';
import Inventory from '@/components/artisan/Inventory';
import Orders from '@/components/artisan/Orders';
import Link from 'next/link';
import { Home, Package, ShoppingCart, BarChart3, Settings, User, LogOut, Bell, ChevronDown } from 'lucide-react';

export default function PanelPage() {
    const router = useRouter();
    const { user, logout, isAuthenticated } = useAuth();

    // Redirect if not authenticated or not an artisan
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

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Artisan Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        {/* Logo & Title */}
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                                    OL
                                </div>
                            </Link>
                            <div className="hidden sm:block">
                                <h1 className="font-bold text-gray-900">Panel de Control</h1>
                                <p className="text-xs text-gray-500">Portal Artesano</p>
                            </div>
                        </div>

                        {/* Center Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            <Link href="/panel" className="px-4 py-2 bg-loja-terracotta/10 text-loja-terracotta rounded-xl font-medium text-sm">
                                Dashboard
                            </Link>
                            <Link href="/panel/productos" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">
                                Productos
                            </Link>
                            <Link href="/panel/pedidos" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">
                                Pedidos
                            </Link>
                            <Link href="/panel/clientes" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">
                                Clientes
                            </Link>
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* Notifications */}
                            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Back to Store */}
                            <Link
                                href="/"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors"
                            >
                                <Home size={16} />
                                Ver Tienda
                            </Link>

                            {/* User Menu */}
                            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                                <div className="hidden sm:block text-right">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500">Artesano Verificado</p>
                                </div>
                                <div className="relative group">
                                    <button className="w-10 h-10 bg-loja-terracotta/20 rounded-xl flex items-center justify-center text-loja-terracotta font-bold">
                                        {user.avatar}
                                    </button>

                                    {/* Dropdown */}
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                        <div className="py-2">
                                            <Link href="/perfil" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                                                <User size={16} />
                                                Mi Perfil
                                            </Link>
                                            <Link href="/panel/configuracion" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                                                <Settings size={16} />
                                                Configuración
                                            </Link>
                                            <hr className="my-2 border-gray-100" />
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full"
                                            >
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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8 animate-slide-in-up">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">¡Bienvenida, {user.name.split(' ')[0]}!</h1>
                    <p className="text-gray-500 mt-1">Aquí tienes el resumen de tu actividad comercial</p>
                </div>

                {/* Dashboard Stats */}
                <Dashboard />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Orders />
                    </div>
                    <div>
                        <Inventory />
                    </div>
                </div>
            </main>
        </div>
    );
}
