'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package, Truck, Shield, Tag, Sparkles, Coffee, MapPin, Heart } from 'lucide-react';

export default function CarritoPage() {
    const { cart, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 relative overflow-hidden">
                <Navbar />

                {/* Decorative Background */}
                <svg className="absolute top-0 left-0 w-full h-64 pointer-events-none opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
                    <path fill="#C45C3C" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L0,0Z" opacity="0.15" />
                </svg>
                <div className="absolute top-40 right-10 w-64 h-64 bg-loja-terracotta/5 rounded-full blur-3xl pointer-events-none" />

                <div className="pt-32 pb-20 px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center animate-fade-in">
                        <div className="w-32 h-32 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-[3rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
                            <ShoppingBag size={48} className="text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-loja-dark mb-4">Tu carrito está vacío</h1>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Descubre productos únicos hechos a mano por artesanos lojanos.
                        </p>
                        <Link
                            href="/#marketplace"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-loja-dark text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-loja-terracotta transition-all shadow-xl"
                        >
                            Explorar Productos
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const envio = total > 50 ? 0 : 5.99;
    const totalFinal = total + envio;

    return (
        <div className="min-h-screen bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 relative overflow-hidden">
            <Navbar />

            {/* Decorative Background */}
            <svg className="absolute top-0 left-0 w-full h-64 pointer-events-none opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
                <path fill="#C45C3C" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L0,0Z" opacity="0.15" />
            </svg>
            <div className="absolute top-40 right-10 w-64 h-64 bg-loja-terracotta/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-40 left-10 w-48 h-48 bg-loja-gold/10 rounded-full blur-2xl pointer-events-none" />

            <div className="pt-28 pb-20 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-10 animate-slide-in-up">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <ShoppingBag size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-loja-dark">
                                    Tu Carrito <span className="text-loja-terracotta">({itemCount})</span>
                                </h1>
                                <p className="text-gray-500 font-medium">Revisa tus productos antes de continuar</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item, index) => (
                                <div key={`${item.id}-${item.selectedVariation}`} className="bg-white rounded-[2rem] p-5 md:p-6 shadow-lg border border-gray-100 animate-fade-in hover:shadow-xl transition-shadow" style={{ animationDelay: `${index * 100}ms` }}>
                                    <div className="flex gap-5 md:gap-6">
                                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-loja-beige flex-shrink-0 group">
                                            <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-[10px] font-black text-loja-terracotta uppercase tracking-widest">{item.category}</span>
                                                    <h3 className="font-black text-loja-dark mt-1 line-clamp-2">{item.name}</h3>
                                                    {item.selectedVariation && (
                                                        <p className="text-xs text-gray-400 mt-1 font-medium">Variante: {item.selectedVariation}</p>
                                                    )}
                                                </div>
                                                <button onClick={() => removeFromCart(item.id, item.selectedVariation)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedVariation)} className="w-9 h-9 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-gray-500 hover:text-loja-terracotta">
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-10 text-center font-black text-loja-dark">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedVariation)} className="w-9 h-9 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-gray-500 hover:text-loja-terracotta">
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-black text-loja-terracotta">${(item.price * item.quantity).toFixed(2)}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${item.price.toFixed(2)} c/u</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button onClick={clearCart} className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 uppercase tracking-widest mt-4">
                                <Trash2 size={14} />Vaciar carrito
                            </button>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 sticky top-28 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
                                <h2 className="text-xl font-black text-loja-dark mb-6">Resumen del Pedido</h2>

                                {/* Promo Code */}
                                <div className="flex gap-2 mb-6">
                                    <div className="relative flex-1">
                                        <Tag size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="text" placeholder="Código promocional" className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none text-sm font-medium transition-all" />
                                    </div>
                                    <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-loja-dark hover:text-white transition-colors text-xs uppercase tracking-widest">Aplicar</button>
                                </div>

                                {/* Totals */}
                                <div className="space-y-3 pb-6 border-b border-gray-100">
                                    <div className="flex justify-between text-gray-500 font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-loja-dark font-bold">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 font-medium">
                                        <span>Envío</span>
                                        <span className={envio === 0 ? 'text-green-600 font-bold' : 'text-loja-dark font-bold'}>{envio === 0 ? '¡Gratis!' : `$${envio.toFixed(2)}`}</span>
                                    </div>
                                    {total < 50 && (
                                        <div className="bg-loja-terracotta/10 p-4 rounded-2xl">
                                            <p className="text-xs font-bold text-loja-terracotta flex items-center gap-2">
                                                <Sparkles size={14} />
                                                Agrega ${(50 - total).toFixed(2)} más para envío gratis
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center py-6 border-b border-gray-100">
                                    <span className="text-lg font-black text-loja-dark">Total</span>
                                    <span className="text-3xl font-black text-loja-terracotta">${totalFinal.toFixed(2)}</span>
                                </div>

                                <Link href="/checkout" className="w-full mt-6 py-4 bg-loja-dark text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-loja-terracotta transition-all shadow-xl text-xs uppercase tracking-widest">
                                    Proceder al Pago <ArrowRight size={18} />
                                </Link>

                                {/* Trust Badges */}
                                <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                                    {[
                                        { icon: Shield, text: 'Pago 100% seguro', color: 'text-green-500' },
                                        { icon: Truck, text: 'Envío a todo Ecuador', color: 'text-blue-500' },
                                        { icon: Package, text: 'Empaque ecológico', color: 'text-loja-terracotta' }
                                    ].map((badge, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={`w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center ${badge.color}`}>
                                                <badge.icon size={18} />
                                            </div>
                                            <span className="text-sm font-bold text-gray-600">{badge.text}</span>
                                        </div>
                                    ))}
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
