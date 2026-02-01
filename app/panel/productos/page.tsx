'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { products } from '@/lib/data';
import PanelLayout from '@/components/panel/PanelLayout';
import { Plus, Search, Edit, Trash2, Package, Eye, Star, Sparkles } from 'lucide-react';

export default function ProductosPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
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
        <PanelLayout>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 animate-slide-in-up">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <Package size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-loja-dark">Mis Productos</h1>
                        <p className="text-gray-500 font-medium">{myProducts.length} piezas en tu catálogo</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-loja-dark text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-loja-terracotta transition-all shadow-lg">
                    <Plus size={18} />
                    Nuevo Producto
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-[2rem] p-5 shadow-lg border border-gray-100 mb-8 animate-fade-in">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-medium transition-all"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${selectedCategory === cat
                                    ? 'bg-loja-dark text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
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
                    <div
                        key={product.id}
                        className="bg-white rounded-[2.5rem] shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all animate-fade-in group"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="relative h-56">
                            <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white shadow-lg transition-all">
                                    <Eye size={16} className="text-gray-600" />
                                </button>
                                <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-loja-terracotta hover:text-white shadow-lg transition-all">
                                    <Edit size={16} className="text-loja-terracotta" />
                                </button>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${product.stock > 5
                                    ? 'bg-green-500 text-white'
                                    : product.stock > 0
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-red-500 text-white'
                                    }`}>
                                    {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-black uppercase text-loja-terracotta tracking-widest">{product.category}</span>
                                <div className="flex-1 h-px bg-loja-terracotta/20" />
                            </div>
                            <h3 className="font-black text-loja-dark text-lg mb-2 line-clamp-1">{product.name}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className="text-2xl font-black text-loja-dark">${product.price.toFixed(2)}</span>
                                <div className="flex gap-2">
                                    <button className="p-2.5 text-loja-terracotta hover:bg-loja-terracotta/10 rounded-xl transition-colors">
                                        <Edit size={18} />
                                    </button>
                                    <button className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[3rem] shadow-lg border border-gray-100">
                    <Package size={56} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-black text-loja-dark mb-2">No se encontraron productos</h3>
                    <p className="text-gray-500 mb-6">Intenta con otros filtros o crea un nuevo producto</p>
                    <button className="px-8 py-3 bg-loja-terracotta text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-loja-dark transition-all">
                        <Plus size={16} className="inline mr-2" />
                        Crear Producto
                    </button>
                </div>
            )}
        </PanelLayout>
    );
}
