'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';
import { CreditCard, MapPin, User, Mail, Phone, Lock, ArrowLeft, ArrowRight, Check, Loader2, Package } from 'lucide-react';

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
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="pt-32 pb-20 px-4">
                    <div className="max-w-lg mx-auto text-center">
                        <div className="relative mb-8 animate-scale-in">
                            <div className="w-32 h-32 bg-gradient-to-br from-loja-green to-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                                <Check size={64} className="text-white" strokeWidth={3} />
                            </div>
                            <div className="absolute inset-0 w-32 h-32 mx-auto bg-loja-green/30 rounded-full animate-ping" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-slide-in-up">¡Pedido Confirmado!</h1>
                        <p className="text-gray-500 mb-2 animate-fade-in">Tu pedido ha sido procesado exitosamente.</p>
                        <p className="text-lg font-bold text-loja-terracotta mb-8 animate-fade-in">Orden #OL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                        <div className="bg-white rounded-3xl p-6 shadow-sm mb-8 text-left animate-fade-in">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Package size={20} className="text-loja-terracotta" />Detalles del Envío</h3>
                            <div className="space-y-2 text-gray-600">
                                <p><span className="font-medium">Dirección:</span> Av. Universitaria y París, Loja</p>
                                <p><span className="font-medium">Tiempo estimado:</span> 3-5 días hábiles</p>
                                <p><span className="font-medium">Método de pago:</span> Tarjeta terminada en ****4242</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/" className="flex-1 py-4 px-6 bg-loja-dark text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-loja-terracotta transition-all btn-press">Volver al Inicio</Link>
                            <Link href="/#marketplace" className="flex-1 py-4 px-6 border-2 border-loja-terracotta text-loja-terracotta rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-loja-terracotta hover:text-white transition-all btn-press">Seguir Comprando</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-28 pb-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <Link href="/carrito" className="inline-flex items-center gap-2 text-gray-500 hover:text-loja-terracotta mb-6 transition-colors"><ArrowLeft size={18} />Volver al carrito</Link>
                    <div className="mb-8 animate-slide-in-up">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Checkout</h1>
                        <p className="text-gray-500 mt-2">Completa tu información para finalizar</p>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`flex items-center gap-2 ${step === 'info' ? 'text-loja-terracotta' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 'info' ? 'bg-loja-terracotta text-white' : 'bg-gray-200'}`}>1</div>
                            <span className="font-medium hidden sm:block">Información</span>
                        </div>
                        <div className="flex-1 h-px bg-gray-200" />
                        <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-loja-terracotta' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 'payment' ? 'bg-loja-terracotta text-white' : 'bg-gray-200'}`}>2</div>
                            <span className="font-medium hidden sm:block">Pago</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {step === 'info' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><User size={20} className="text-loja-terracotta" />Información de Contacto</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label><input type="text" defaultValue="Carlos" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-loja-terracotta/20 focus:border-loja-terracotta" /></div>
                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label><input type="text" defaultValue="Mendoza" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-loja-terracotta/20 focus:border-loja-terracotta" /></div>
                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">Email</label><div className="relative"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input type="email" defaultValue="carlos.mendoza@gmail.com" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-loja-terracotta/20 focus:border-loja-terracotta" /></div></div>
                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label><div className="relative"><Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input type="tel" defaultValue="+593 99 123 4567" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-loja-terracotta/20 focus:border-loja-terracotta" /></div></div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><MapPin size={20} className="text-loja-terracotta" />Dirección de Envío</h2>
                                        <div className="space-y-4">
                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label><input type="text" defaultValue="Av. Universitaria y París" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-loja-terracotta/20 focus:border-loja-terracotta" /></div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label><input type="text" defaultValue="Loja" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-loja-terracotta/20 focus:border-loja-terracotta" /></div>
                                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Provincia</label><input type="text" defaultValue="Loja" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-loja-terracotta/20 focus:border-loja-terracotta" /></div>
                                                <div><label className="block text-sm font-medium text-gray-700 mb-2">C.P.</label><input type="text" defaultValue="110150" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-loja-terracotta/20 focus:border-loja-terracotta" /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setStep('payment')} className="w-full py-4 bg-loja-terracotta text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-loja-dark transition-all shadow-lg btn-press">Continuar al Pago<ArrowRight size={20} /></button>
                                </div>
                            )}

                            {step === 'payment' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><CreditCard size={20} className="text-loja-terracotta" />Método de Pago</h2>
                                        <div className="grid grid-cols-3 gap-3 mb-6">
                                            <button className="p-4 border-2 border-loja-terracotta bg-loja-terracotta/5 rounded-xl"><span className="font-bold text-loja-terracotta">Tarjeta</span></button>
                                            <button className="p-4 border border-gray-200 rounded-xl hover:border-gray-300"><span className="font-medium text-gray-500">PayPal</span></button>
                                            <button className="p-4 border border-gray-200 rounded-xl hover:border-gray-300"><span className="font-medium text-gray-500">Depósito</span></button>
                                        </div>
                                        <div className="space-y-4">
                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">Número de Tarjeta</label><div className="relative"><CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" defaultValue="4242 4242 4242 4242" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-loja-terracotta/20 focus:border-loja-terracotta" /></div></div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Expiración</label><input type="text" defaultValue="12/28" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50" /></div>
                                                <div><label className="block text-sm font-medium text-gray-700 mb-2">CVV</label><div className="relative"><Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" defaultValue="123" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50" /></div></div>
                                            </div>
                                            <div><label className="block text-sm font-medium text-gray-700 mb-2">Nombre en la Tarjeta</label><input type="text" defaultValue="CARLOS MENDOZA" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 uppercase" /></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => setStep('info')} className="flex-1 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50"><ArrowLeft size={20} />Atrás</button>
                                        <button onClick={handleSubmit} disabled={isProcessing} className="flex-1 py-4 bg-loja-terracotta text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-loja-dark transition-all shadow-lg btn-press disabled:opacity-70">
                                            {isProcessing ? (<><Loader2 size={20} className="animate-spin" />Procesando...</>) : (<>Confirmar Pedido<ArrowRight size={20} /></>)}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-28">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Tu Pedido</h2>
                                <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                                    {cart.map((item) => (
                                        <div key={`${item.id}-${item.selectedVariation}`} className="flex gap-3">
                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-loja-terracotta text-white text-xs font-bold rounded-full flex items-center justify-center">{item.quantity}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</p>
                                                {item.selectedVariation && <p className="text-xs text-gray-500">{item.selectedVariation}</p>}
                                                <p className="text-sm font-bold text-loja-terracotta">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                                    <div className="flex justify-between text-gray-600"><span>Envío</span><span className={envio === 0 ? 'text-loja-green font-medium' : ''}>{envio === 0 ? '¡Gratis!' : `$${envio.toFixed(2)}`}</span></div>
                                </div>
                                <div className="flex justify-between items-center py-4 mt-4 border-t border-gray-100">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-loja-terracotta">${totalFinal.toFixed(2)}</span>
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
