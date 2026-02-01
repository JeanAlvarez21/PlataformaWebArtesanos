'use client';

import React, { useState } from 'react';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';
import { Mail, MapPin, Send, MessageCircle, Check, Loader2, Sparkles, Instagram, Facebook, Globe, Phone, Coffee } from 'lucide-react';

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

    const contactChannels = [
        { icon: MessageCircle, title: 'Chat WhatsApp', detail: '+593 99 123 456', color: 'text-green-600', bg: 'bg-green-50', href: 'https://wa.me/593991234567' },
        { icon: Mail, title: 'Correo Lojano', detail: 'info@lojania.ec', color: 'text-loja-terracotta', bg: 'bg-loja-terracotta/10', href: 'mailto:info@lojania.ec' },
        { icon: Phone, title: 'Atención Directa', detail: '+593 7 123 456', color: 'text-loja-dark', bg: 'bg-loja-dark/10', href: 'tel:+59371234567' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 relative overflow-hidden">
            <Navbar />

            {/* SVG Decorativo - Altura reducida */}
            <svg className="absolute top-0 left-0 w-full h-64 pointer-events-none opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
                <path fill="#C45C3C" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0L0,0Z" opacity="0.2" />
            </svg>

            <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 relative z-10">

                {/* Header Compacto */}
                <div className="mb-10 animate-slide-in-up">
                    <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-loja-terracotta px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-loja-terracotta/20 shadow-sm">
                        <Sparkles size={14} className="animate-pulse" />
                        CONTACTO DIRECTO
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-loja-dark leading-tight">
                        Hablemos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-loja-terracotta to-loja-dark">lo nuestro.</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Columna Izquierda: Información de contacto y Mapa (Más compacta) */}
                    <div className="lg:col-span-4 space-y-6 animate-fade-in">

                        {/* Canales de contacto */}
                        <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 border border-white shadow-xl">
                            <h2 className="text-lg font-bold text-loja-dark mb-5 border-l-4 border-loja-terracotta pl-3">Vías de Comunicación</h2>
                            <div className="space-y-4">
                                {contactChannels.map((item, idx) => (
                                    <a key={idx} href={item.href} className="group flex items-center gap-4 transition-all">
                                        <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.title}</p>
                                            <p className="text-sm font-bold text-loja-dark">{item.detail}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Mapa Mini */}
                        <div className="relative rounded-[2rem] overflow-hidden shadow-lg h-[220px] border border-white group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63781.9!2d-79.24!3d-3.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cb49a6e8e8b8b9%3A0x1!2sLoja%2C%20Ecuador!5e0!3m2!1ses!2sec"
                                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            />
                            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-sm border border-white/50 flex items-center gap-2">
                                <MapPin size={16} className="text-loja-terracotta" />
                                <span className="text-xs font-bold text-loja-dark">Loja, Ciudad Cultural</span>
                            </div>
                        </div>

                        {/* Redes Sociales Footer-like */}
                        <div className="flex justify-between items-center px-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SÍGUENOS</p>
                            <div className="flex gap-3">
                                {[Instagram, Facebook, Globe].map((Icon, i) => (
                                    <button key={i} className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-gray-400 hover:text-loja-terracotta hover:shadow-md transition-all">
                                        <Icon size={16} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario (Diseño optimizado) */}
                    <div className="lg:col-span-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
                            {/* Decoración Tricolor sutil */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 flex">
                                <div className="flex-1 bg-yellow-400" />
                                <div className="flex-1 bg-blue-600" />
                                <div className="flex-1 bg-red-600" />
                            </div>

                            {isSubmitted ? (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                                        <Check size={32} className="text-green-500" />
                                    </div>
                                    <h2 className="text-2xl font-black text-loja-dark mb-2">¡Mensaje Recibido!</h2>
                                    <p className="text-gray-500 mb-6 max-w-xs mx-auto text-sm">
                                        Gracias <span className="font-bold text-loja-terracotta">{formData.nombre}</span>, te responderemos pronto.
                                    </p>
                                    <button
                                        onClick={() => { setIsSubmitted(false); setFormData({ nombre: '', email: '', asunto: '', mensaje: '' }); }}
                                        className="bg-loja-dark text-white px-8 py-3 rounded-xl font-bold text-xs tracking-widest transition-all hover:bg-loja-terracotta"
                                    >
                                        ENVIAR OTRO
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Ej. Juan Pérez"
                                                value={formData.nombre}
                                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl p-3.5 text-sm font-bold focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/5 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="ejemplo@correo.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl p-3.5 text-sm font-bold focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/5 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">¿Cómo podemos ayudarte?</label>
                                        <select
                                            value={formData.asunto}
                                            onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                                            className="w-full bg-gray-50/50 border border-gray-100 rounded-xl p-3.5 text-sm font-bold focus:bg-white focus:border-loja-terracotta outline-none transition-all appearance-none"
                                        >
                                            <option value="">Selecciona un motivo</option>
                                            <option value="pedidos">Consulta de pedido</option>
                                            <option value="artesano">Quiero ser artesano aliado</option>
                                            <option value="mayorista">Ventas al por mayor</option>
                                            <option value="soporte">Soporte técnico</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tu Mensaje</label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="Cuéntanos más detalles..."
                                            value={formData.mensaje}
                                            onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                                            className="w-full bg-gray-50/50 border border-gray-100 rounded-xl p-4 text-sm font-bold focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/5 outline-none transition-all resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-3 py-4 bg-loja-dark text-white rounded-xl font-bold tracking-widest uppercase text-xs transition-all shadow-xl hover:bg-loja-terracotta active:scale-[0.98] disabled:opacity-70 group"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                ENVIANDO...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                ENVIAR MENSAJE
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* FAQ Quick CTA - Compacto */}
                <div className="mt-8 bg-loja-beige/50 border border-loja-terracotta/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-loja-terracotta shadow-sm">
                            <Coffee size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-loja-dark">¿Buscas respuestas rápidas?</h3>
                            <p className="text-xs text-gray-500 font-medium">Revisa nuestra sección de preguntas frecuentes antes de escribirnos.</p>
                        </div>
                    </div>
                    <button className="whitespace-nowrap bg-white text-loja-dark px-6 py-2.5 rounded-xl font-bold text-xs border border-gray-100 hover:bg-loja-terracotta hover:text-white transition-all">
                        IR A PREGUNTAS FRECUENTES
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
