'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package, Truck, Shield, Tag } from 'lucide-react';

export default function CarritoPage() {
    const { cart, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="pt-32 pb-20 px-4">
                    <div className="max-w-2xl mx-auto text-center animate-fade-in">
                        <div className="w-32 h-32 bg-gradient-to-br from-loja-terracotta/20 to-loja-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
                            <ShoppingBag size={48} className="text-loja-terracotta" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Descubre productos únicos hechos a mano por artesanos lojanos.
                        </p>
                        <Link
                            href="/#marketplace"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-loja-terracotta text-white rounded-2xl font-bold hover:bg-loja-dark transition-all shadow-lg btn-press"
                        >
                            Explorar Productos
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const envio = total > 50 ? 0 : 5.99;
    const totalFinal = total + envio;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-28 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8 animate-slide-in-up">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Tu Carrito <span className="text-loja-terracotta">({itemCount})</span>
                        </h1>
                        <p className="text-gray-500 mt-2">Revisa tus productos antes de continuar</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item, index) => (
                                <div key={`${item.id}-${item.selectedVariation}`} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm animate-fade-in card-hover" style={{ animationDelay: `${index * 100}ms` }}>
                                    <div className="flex gap-4 md:gap-6">
                                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-xs font-medium text-loja-terracotta uppercase tracking-wider">{item.category}</span>
                                                    <h3 className="font-bold text-gray-900 mt-1 line-clamp-2">{item.name}</h3>
                                                    {item.selectedVariation && (
                                                        <p className="text-sm text-gray-500 mt-1">Variante: {item.selectedVariation}</p>
                                                    )}
                                                </div>
                                                <button onClick={() => removeFromCart(item.id, item.selectedVariation)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedVariation)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors">
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedVariation)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors">
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-loja-terracotta">${(item.price * item.quantity).toFixed(2)}</p>
                                                    <p className="text-xs text-gray-400">${item.price.toFixed(2)} c/u</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button onClick={clearCart} className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2">
                                <Trash2 size={16} />Vaciar carrito
                            </button>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-28 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
                                <div className="flex gap-2 mb-6">
                                    <div className="relative flex-1">
                                        <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="text" placeholder="Código promocional" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-loja-terracotta/20 focus:border-loja-terracotta text-sm" />
                                    </div>
                                    <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm">Aplicar</button>
                                </div>
                                <div className="space-y-3 pb-6 border-b border-gray-100">
                                    <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Envío</span>
                                        <span className={envio === 0 ? 'text-loja-green font-medium' : ''}>{envio === 0 ? '¡Gratis!' : `$${envio.toFixed(2)}`}</span>
                                    </div>
                                    {total < 50 && (
                                        <p className="text-xs text-loja-terracotta bg-loja-terracotta/10 p-3 rounded-xl">💡 Agrega ${(50 - total).toFixed(2)} más para envío gratis</p>
                                    )}
                                </div>
                                <div className="flex justify-between items-center py-6 border-b border-gray-100">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-loja-terracotta">${totalFinal.toFixed(2)}</span>
                                </div>
                                <Link href="/checkout" className="w-full mt-6 py-4 bg-loja-terracotta text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-loja-dark transition-all shadow-lg btn-press">
                                    Proceder al Pago<ArrowRight size={20} />
                                </Link>
                                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-600"><Shield size={18} className="text-loja-green" /><span>Pago 100% seguro</span></div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600"><Truck size={18} className="text-loja-blue" /><span>Envío a todo Ecuador</span></div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600"><Package size={18} className="text-loja-terracotta" /><span>Empaque ecológico</span></div>
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
