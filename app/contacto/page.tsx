'use client';

import React, { useState } from 'react';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';
import { Mail, Phone, MapPin, Send, MessageCircle, ArrowRight, Check, Loader2, Sparkles, Instagram, Facebook, Globe } from 'lucide-react';

export default function ContactoPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-loja-beige">
            <Navbar />

            <main className="pt-32 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Hero Header - Matching Artesanos Style */}
                    <div className="text-center mb-24 animate-slide-in-up">
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-loja-terracotta/10 to-loja-gold/10 text-loja-terracotta px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-8 border border-loja-terracotta/20 backdrop-blur-sm">
                            <Sparkles size={14} className="animate-pulse" />
                            ESTAMOS PARA TI
                        </span>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-loja-dark mb-10 leading-tight">
                            <span className="relative inline-block">
                                Hablemos de
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                                    <path d="M0 8 Q50 0 100 8 T200 8" stroke="#C45C3C" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.2" />
                                </svg>
                            </span>{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-loja-terracotta via-loja-dark to-loja-terracotta animate-gradient">
                                lo nuestro.
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
                            ¿Tienes dudas sobre una pieza, quieres ser parte de nuestra red de artesanos o simplemente decir hola? <br />
                            <span className="text-loja-terracotta font-black">Tu voz es el alma de LojaNia.</span>
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-16 items-start">

                        {/* LEFT SIDE: Direct Contact & Info */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-black text-loja-dark tracking-tight">Vías Directas</h2>
                                <p className="text-sm text-gray-500 font-medium">Elige el canal que prefieras, estamos listos para escucharte.</p>
                            </div>

                            <div className="space-y-4">
                                {/* Direct Communication Cards - Standardized */}
                                {[
                                    { icon: MessageCircle, title: 'Chat WhatsApp', detail: 'Respuesta inmediata', color: 'text-green-600', bg: 'bg-green-50/50', border: 'border-green-100', href: 'https://wa.me/593991234567' },
                                    { icon: Mail, title: 'Correo lojano', detail: 'info@lojania.ec', color: 'text-loja-terracotta', bg: 'bg-loja-terracotta/5', border: 'border-loja-terracotta/10', href: 'mailto:info@lojania.ec' },
                                    { icon: MapPin, title: 'Ubicación', detail: 'Loja, Ecuador', color: 'text-loja-dark', bg: 'bg-loja-dark/5', border: 'border-loja-dark/10' }
                                ].map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.href || '#'}
                                        target={item.href?.startsWith('http') ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        className={`group flex items-center gap-5 p-5 ${item.bg} rounded-[2rem] border ${item.border} hover:shadow-xl transition-all duration-500`}
                                    >
                                        <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.title}</div>
                                            <div className="text-base font-black text-loja-dark">{item.detail}</div>
                                        </div>
                                        {item.href && <ArrowRight size={18} className="ml-auto text-gray-300 group-hover:translate-x-1 transition-transform" />}
                                    </a>
                                ))}
                            </div>

                            {/* Social Media Links */}
                            <div className="pt-8 border-t border-gray-100">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Conecta socialmente</p>
                                <div className="flex gap-3">
                                    {[Instagram, Facebook, Globe].map((Icon, i) => (
                                        <button key={i} className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-loja-terracotta hover:border-loja-terracotta/30 hover:scale-110 transition-all shadow-sm">
                                            <Icon size={20} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Interactive Form */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden h-full flex flex-col justify-center">
                                {/* Decorative elements in the card */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-loja-terracotta/5 rounded-bl-[8rem] -z-0" />

                                <div className="relative z-10">
                                    {isSubmitted ? (
                                        <div className="text-center py-16 animate-zoom-in">
                                            <div className="w-20 h-20 bg-green-50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                                                <Check size={40} className="text-green-500" />
                                            </div>
                                            <h2 className="text-3xl font-black text-loja-dark mb-4 tracking-tight">¡Mensaje Recibido!</h2>
                                            <p className="text-base text-gray-500 font-medium max-w-sm mx-auto mb-8">
                                                Gracias por escribirnos. En breve un miembro de nuestra comunidad te contactará.
                                            </p>
                                            <button
                                                onClick={() => setIsSubmitted(false)}
                                                className="px-8 py-3.5 bg-loja-dark text-white rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-loja-terracotta transition-all shadow-xl active:scale-95"
                                            >
                                                ENVIAR OTRO
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mb-10">
                                                <h2 className="text-3xl font-black text-loja-dark mb-2 tracking-tight">Escríbenos</h2>
                                                <p className="text-gray-500 font-medium tracking-tight">Completa el formulario y nos pondremos en marcha.</p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nombre</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="¿Cómo te llamas?"
                                                            value={formData.nombre}
                                                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                                            className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-loja-dark font-bold focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/5 outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Correo</label>
                                                        <input
                                                            type="email"
                                                            required
                                                            placeholder="tu@email.com"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-loja-dark font-bold focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/5 outline-none transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Motivo</label>
                                                    <select
                                                        value={formData.asunto}
                                                        onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                                                        className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-loja-dark font-bold focus:bg-white focus:border-loja-terracotta outline-none transition-all appearance-none"
                                                    >
                                                        <option value="">Selecciona un tema</option>
                                                        <option value="pedidos">Consulta sobre pedidos</option>
                                                        <option value="artesano">Quiero ser artesano</option>
                                                        <option value="mayorista">Venta al por mayor</option>
                                                        <option value="otro">Otro</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mensaje</label>
                                                    <textarea
                                                        required
                                                        rows={4}
                                                        placeholder="Escribe aquí..."
                                                        value={formData.mensaje}
                                                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                                                        className="w-full bg-gray-50/50 border border-gray-100 rounded-[1.5rem] p-6 text-loja-dark font-bold focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/5 outline-none transition-all resize-none"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full flex items-center justify-center gap-3 py-4 bg-loja-dark text-white rounded-[1.5rem] font-black tracking-widest uppercase text-[10px] transition-all shadow-xl hover:bg-loja-terracotta hover:shadow-loja-terracotta/10 active:scale-95 disabled:opacity-70 group"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 size={16} className="animate-spin" />
                                                            ENVIANDO...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                            ENVIAR MENSAJE
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Integrated Map - Full Width and Stylized */}
                    <div className="mt-32 rounded-[4rem] overflow-hidden border border-gray-100 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 h-[400px] relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63781.9!2d-79.24!3d-3.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cb49a6e8e8b8b9%3A0x1!2sLoja%2C%20Ecuador!5e0!3m2!1ses!2sec"
                            className="w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        />
                        <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin size={24} className="text-loja-terracotta" />
                                <span className="font-black text-loja-dark">Nuestra Base de Operaciones</span>
                            </div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest ml-9">Loja, Ciudad Cultural del Ecuador</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
