'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { products } from '@/lib/data';
import { Plus, Search, Edit, Trash2, Package, Home, Bell, User, Settings, LogOut, Eye, MoreVertical, Filter } from 'lucide-react';

export default function ProductosPage() {
    const router = useRouter();
    const { user, logout, isAuthenticated } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else if (user?.type !== 'artisan') {
            router.push('/');
        }
    }, [isAuthenticated, user, router]);

    if (!user || user.type !== 'artisan') return null;

    const myProducts = products.filter(p => p.artisanId === 'a1');
    const filteredProducts = myProducts.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['Todos', ...new Set(myProducts.map(p => p.category))];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-xl flex items-center justify-center text-white font-bold shadow-md">LN</div>
                            </Link>
                            <div className="hidden sm:block">
                                <h1 className="font-bold text-gray-900">Mis Productos</h1>
                                <p className="text-xs text-gray-500">Portal Artesano</p>
                            </div>
                        </div>

                        <nav className="hidden md:flex items-center gap-1">
                            <Link href="/panel" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Dashboard</Link>
                            <Link href="/panel/productos" className="px-4 py-2 bg-loja-terracotta/10 text-loja-terracotta rounded-xl font-medium text-sm">Productos</Link>
                            <Link href="/panel/pedidos" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Pedidos</Link>
                            <Link href="/panel/clientes" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Clientes</Link>
                        </nav>

                        <div className="flex items-center gap-3">
                            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <Link href="/" className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">
                                <Home size={16} />Ver Tienda
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Title and Add Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-slide-in-up">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Mis Productos</h1>
                        <p className="text-gray-500 mt-1">{myProducts.length} productos en tu catálogo</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-loja-terracotta text-white rounded-xl font-bold hover:bg-loja-dark transition-all shadow-lg btn-press">
                        <Plus size={20} />
                        Nuevo Producto
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 animate-fade-in">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none"
                            />
                        </div>
                        <div className="flex gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors ${selectedCategory === cat ? 'bg-loja-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden card-hover animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                            <div className="relative h-48">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button className="p-2 bg-white/90 rounded-lg hover:bg-white shadow-sm transition-colors">
                                        <Eye size={16} className="text-gray-600" />
                                    </button>
                                    <button className="p-2 bg-white/90 rounded-lg hover:bg-white shadow-sm transition-colors">
                                        <Edit size={16} className="text-loja-blue" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-loja-terracotta uppercase tracking-wider">{product.category}</span>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.stock > 5 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-xl font-bold text-loja-dark">${product.price.toFixed(2)}</span>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-loja-blue hover:bg-loja-blue/10 rounded-lg transition-colors">
                                            <Edit size={18} />
                                        </button>
                                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <Package size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No se encontraron productos</h3>
                        <p className="text-gray-500">Intenta con otros filtros o crea un nuevo producto</p>
                    </div>
                )}
            </main>
        </div>
    );
}
