'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';
import { CreditCard, MapPin, User, Mail, Phone, Lock, ArrowLeft, ArrowRight, Check, Loader2, Package, Shield, Sparkles, Coffee, Truck, Star } from 'lucide-react';

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, total, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');

    const envio = total > 50 ? 0 : 5.99;
    const totalFinal = total + envio;

    const handleSubmit = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStep('success');
        clearCart();
    };

    if (cart.length === 0 && step !== 'success') {
        router.push('/carrito');
        return null;
    }

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 relative overflow-hidden">
                <Navbar />

                {/* Decorative Background */}
                <svg className="absolute top-0 left-0 w-full h-64 pointer-events-none opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
                    <path fill="#22C55E" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L0,0Z" opacity="0.2" />
                </svg>
                <div className="absolute top-40 right-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

                <div className="pt-32 pb-20 px-4 relative z-10">
                    <div className="max-w-lg mx-auto text-center">
                        {/* Success Animation */}
                        <div className="relative mb-10 animate-scale-in">
                            <div className="w-36 h-36 bg-gradient-to-br from-green-500 to-emerald-600 rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl">
                                <Check size={72} className="text-white" strokeWidth={3} />
                            </div>
                            <div className="absolute inset-0 w-36 h-36 mx-auto bg-green-500/30 rounded-[3rem] animate-ping" />
                            <div className="absolute -top-2 -right-2 w-10 h-10 bg-loja-gold rounded-xl flex items-center justify-center shadow-lg">
                                <Sparkles size={20} className="text-loja-dark" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-black text-loja-dark mb-4 animate-slide-in-up">¡Pedido Confirmado!</h1>
                        <p className="text-gray-500 mb-2 animate-fade-in font-medium">Tu pedido ha sido procesado exitosamente.</p>
                        <p className="text-xl font-black text-loja-terracotta mb-10 animate-fade-in">Orden #LN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>

                        {/* Order Details Card */}
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 mb-8 text-left animate-fade-in">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                                    <Package size={24} />
                                </div>
                                <h3 className="font-black text-loja-dark text-lg">Detalles del Envío</h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: 'Dirección', value: 'Av. Universitaria y París, Loja' },
                                    { label: 'Tiempo estimado', value: '3-5 días hábiles' },
                                    { label: 'Método de pago', value: 'Tarjeta terminada en ****4242' }
                                ].map((item) => (
                                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                                        <span className="font-bold text-loja-dark">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/" className="flex-1 py-4 px-6 bg-loja-dark text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-loja-terracotta transition-all shadow-xl text-xs uppercase tracking-widest">
                                Volver al Inicio
                            </Link>
                            <Link href="/#marketplace" className="flex-1 py-4 px-6 bg-white text-loja-terracotta border-2 border-loja-terracotta rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-loja-terracotta hover:text-white transition-all text-xs uppercase tracking-widest">
                                Seguir Comprando
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

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
                <div className="max-w-5xl mx-auto">
                    {/* Back Link */}
                    <Link href="/carrito" className="inline-flex items-center gap-2 text-gray-400 hover:text-loja-terracotta mb-6 transition-colors font-bold text-xs uppercase tracking-widest">
                        <ArrowLeft size={16} />Volver al carrito
                    </Link>

                    {/* Header */}
                    <div className="mb-10 animate-slide-in-up">
                        <h1 className="text-3xl md:text-4xl font-black text-loja-dark">Checkout</h1>
                        <p className="text-gray-500 mt-2 font-medium">Completa tu información para finalizar</p>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center gap-4 mb-10 bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
                        <div className={`flex items-center gap-3 ${step === 'info' ? 'text-loja-terracotta' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${step === 'info' ? 'bg-loja-terracotta text-white shadow-lg' : 'bg-gray-100'}`}>1</div>
                            <span className="font-bold hidden sm:block text-sm">Información</span>
                        </div>
                        <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full bg-loja-terracotta transition-all duration-500 ${step === 'payment' ? 'w-full' : 'w-0'}`} />
                        </div>
                        <div className={`flex items-center gap-3 ${step === 'payment' ? 'text-loja-terracotta' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${step === 'payment' ? 'bg-loja-terracotta text-white shadow-lg' : 'bg-gray-100'}`}>2</div>
                            <span className="font-bold hidden sm:block text-sm">Pago</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {step === 'info' && (
                                <div className="space-y-6 animate-fade-in">
                                    {/* Contact Info */}
                                    <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-loja-terracotta/10 rounded-2xl flex items-center justify-center text-loja-terracotta">
                                                <User size={24} />
                                            </div>
                                            <h2 className="text-xl font-black text-loja-dark">Información de Contacto</h2>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre</label>
                                                <input type="text" defaultValue="Carlos" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-bold transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Apellido</label>
                                                <input type="text" defaultValue="Mendoza" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-bold transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</label>
                                                <div className="relative">
                                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input type="email" defaultValue="carlos.mendoza@gmail.com" className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-bold transition-all" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Teléfono</label>
                                                <div className="relative">
                                                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input type="tel" defaultValue="+593 99 123 4567" className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-bold transition-all" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-loja-terracotta/10 rounded-2xl flex items-center justify-center text-loja-terracotta">
                                                <MapPin size={24} />
                                            </div>
                                            <h2 className="text-xl font-black text-loja-dark">Dirección de Envío</h2>
                                        </div>
                                        <div className="space-y-5">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dirección</label>
                                                <input type="text" defaultValue="Av. Universitaria y París" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-bold transition-all" />
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ciudad</label>
                                                    <input type="text" defaultValue="Loja" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none font-bold transition-all" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Provincia</label>
                                                    <input type="text" defaultValue="Loja" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none font-bold transition-all" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">C.P.</label>
                                                    <input type="text" defaultValue="110150" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none font-bold transition-all" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={() => setStep('payment')} className="w-full py-4 bg-loja-dark text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-loja-terracotta transition-all shadow-xl text-xs uppercase tracking-widest">
                                        Continuar al Pago <ArrowRight size={18} />
                                    </button>
                                </div>
                            )}

                            {step === 'payment' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-loja-terracotta/10 rounded-2xl flex items-center justify-center text-loja-terracotta">
                                                <CreditCard size={24} />
                                            </div>
                                            <h2 className="text-xl font-black text-loja-dark">Método de Pago</h2>
                                        </div>

                                        {/* Payment Methods */}
                                        <div className="grid grid-cols-3 gap-3 mb-8">
                                            {[
                                                { name: 'Tarjeta', active: true },
                                                { name: 'PayPal', active: false },
                                                { name: 'Depósito', active: false }
                                            ].map((method) => (
                                                <button key={method.name} className={`p-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${method.active ? 'border-2 border-loja-terracotta bg-loja-terracotta/5 text-loja-terracotta' : 'border border-gray-200 text-gray-400 hover:border-gray-300'}`}>
                                                    {method.name}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-5">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Número de Tarjeta</label>
                                                <div className="relative">
                                                    <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input type="text" defaultValue="4242 4242 4242 4242" className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-bold transition-all" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expiración</label>
                                                    <input type="text" defaultValue="12/28" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CVV</label>
                                                    <div className="relative">
                                                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input type="text" defaultValue="123" className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none font-bold" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre en la Tarjeta</label>
                                                <input type="text" defaultValue="CARLOS MENDOZA" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none font-bold uppercase" />
                                            </div>
                                        </div>

                                        {/* Security Badge */}
                                        <div className="flex items-center gap-3 mt-6 p-4 bg-green-50 rounded-2xl">
                                            <Shield size={20} className="text-green-600" />
                                            <p className="text-xs font-bold text-green-700">Tu información está protegida con cifrado SSL de 256 bits</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={() => setStep('info')} className="flex-1 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 text-xs uppercase tracking-widest">
                                            <ArrowLeft size={16} />Atrás
                                        </button>
                                        <button onClick={handleSubmit} disabled={isProcessing} className="flex-1 py-4 bg-loja-terracotta text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-loja-dark transition-all shadow-xl disabled:opacity-70 text-xs uppercase tracking-widest">
                                            {isProcessing ? (<><Loader2 size={18} className="animate-spin" />Procesando...</>) : (<>Confirmar Pedido<ArrowRight size={18} /></>)}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 sticky top-28">
                                <h2 className="text-xl font-black text-loja-dark mb-6">Tu Pedido</h2>

                                <div className="space-y-4 max-h-64 overflow-y-auto mb-6 pr-2">
                                    {cart.map((item) => (
                                        <div key={`${item.id}-${item.selectedVariation}`} className="flex gap-4">
                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-loja-beige flex-shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-loja-terracotta text-white text-[10px] font-black rounded-full flex items-center justify-center">{item.quantity}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-loja-dark text-sm line-clamp-1">{item.name}</p>
                                                {item.selectedVariation && <p className="text-[10px] text-gray-400 font-medium">{item.selectedVariation}</p>}
                                                <p className="text-sm font-black text-loja-terracotta">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between text-gray-500 font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-loja-dark font-bold">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 font-medium">
                                        <span>Envío</span>
                                        <span className={envio === 0 ? 'text-green-600 font-bold' : 'text-loja-dark font-bold'}>{envio === 0 ? '¡Gratis!' : `$${envio.toFixed(2)}`}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-6 mt-4 border-t border-gray-100">
                                    <span className="text-lg font-black text-loja-dark">Total</span>
                                    <span className="text-3xl font-black text-loja-terracotta">${totalFinal.toFixed(2)}</span>
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
