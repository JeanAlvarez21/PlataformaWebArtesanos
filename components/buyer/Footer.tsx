'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart, ArrowRight, Sparkles, Coffee, Send, Shield, Truck, Award } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-loja-dark text-white relative overflow-hidden">
            {/* Decorative SVG Wave Top */}
            <svg className="absolute top-0 left-0 w-full h-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 80">
                <path fill="#FDFCFB" d="M0,0L48,10.7C96,21,192,43,288,48C384,53,480,43,576,37.3C672,32,768,32,864,42.7C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,0L0,0Z" />
            </svg>

            {/* Floating Decorations */}
            <div className="absolute top-40 right-10 w-64 h-64 bg-loja-terracotta/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-48 h-48 bg-loja-gold/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Newsletter Section */}
            <div className="relative pt-28 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-gradient-to-r from-loja-terracotta/20 to-loja-gold/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                        {/* Tricolor Top */}
                        <div className="absolute top-0 left-0 right-0 h-1 flex">
                            <div className="flex-1 bg-yellow-400" />
                            <div className="flex-1 bg-blue-600" />
                            <div className="flex-1 bg-red-600" />
                        </div>
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full" />

                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-loja-terracotta rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                    <Sparkles size={28} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black mb-1">Únete a nuestra comunidad</h3>
                                    <p className="text-white/60 font-medium">Recibe novedades y ofertas exclusivas de artesanos lojanos</p>
                                </div>
                            </div>
                            <div className="flex w-full lg:w-auto gap-3">
                                <div className="relative flex-1 lg:w-72">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                    <input
                                        type="email"
                                        placeholder="tu@email.com"
                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/20 font-medium transition-all"
                                    />
                                </div>
                                <button className="px-6 py-4 bg-white text-loja-dark rounded-xl font-bold hover:bg-loja-gold transition-colors whitespace-nowrap flex items-center gap-2 shadow-lg hover:shadow-xl">
                                    <Send size={18} />
                                    <span className="hidden sm:inline">Suscribirse</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Shield, title: 'Pago Seguro', desc: 'Transacciones 100% protegidas' },
                            { icon: Truck, title: 'Envío Nacional', desc: 'A todo Ecuador en 3-5 días' },
                            { icon: Award, title: 'Calidad Garantizada', desc: 'Productos 100% artesanales' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-loja-gold group-hover:bg-loja-terracotta group-hover:text-white transition-all">
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{item.title}</h4>
                                    <p className="text-white/50 text-sm font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-14 h-14 relative">
                                <Image src="/logo-lojania.png" alt="LojaNia Logo" fill className="object-contain" />
                            </div>
                            <div>
                                <span className="font-black text-2xl">Loja</span>
                                <span className="font-black text-2xl text-loja-terracotta">Nia</span>
                            </div>
                        </div>
                        <p className="text-white/60 mb-6 leading-relaxed font-medium">
                            Impulsando el comercio justo y valorando nuestras raíces. Conectando artesanos lojanos con el mundo.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, href: '#' },
                                { icon: Instagram, href: '#' },
                                { icon: Twitter, href: '#' }
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-loja-terracotta transition-all hover:scale-110 group">
                                    <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-black text-lg mb-6 flex items-center gap-2">
                            <Coffee size={18} className="text-loja-terracotta" />Explorar
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { href: '/#marketplace', label: 'Tienda' },
                                { href: '/artesanos', label: 'Artesanos' },
                                { href: '/historia', label: 'Nuestra Historia' },
                                { href: '/contacto', label: 'Contacto' }
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/60 hover:text-white transition-colors font-medium flex items-center gap-2 group">
                                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-loja-terracotta" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-black text-lg mb-6 flex items-center gap-2">
                            <Shield size={18} className="text-loja-terracotta" />Legal
                        </h4>
                        <ul className="space-y-4">
                            {['Términos y Condiciones', 'Política de Privacidad', 'Envíos y Devoluciones', 'Preguntas Frecuentes'].map((text) => (
                                <li key={text}>
                                    <a href="#" className="text-white/60 hover:text-white transition-colors font-medium flex items-center gap-2 group">
                                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-loja-terracotta" />
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-black text-lg mb-6 flex items-center gap-2">
                            <Mail size={18} className="text-loja-terracotta" />Contacto
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="mailto:info@lojania.ec" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-medium group">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-loja-terracotta group-hover:bg-loja-terracotta group-hover:text-white transition-all">
                                        <Mail size={16} />
                                    </div>
                                    info@lojania.ec
                                </a>
                            </li>
                            <li>
                                <a href="tel:+593991234567" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-medium group">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-loja-terracotta group-hover:bg-loja-terracotta group-hover:text-white transition-all">
                                        <Phone size={16} />
                                    </div>
                                    +593 99 123 4567
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-white/60 font-medium">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-loja-terracotta flex-shrink-0">
                                    <MapPin size={16} />
                                </div>
                                <span>Loja, Ecuador<br />Ciudad de la Música</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/50 text-sm font-medium">© 2026 LojaNia. Todos los derechos reservados.</p>
                        <p className="flex items-center gap-2 text-white/50 text-sm font-medium">
                            Hecho con <Heart size={14} className="text-red-500 animate-pulse" fill="currentColor" /> en Ecuador 🇪🇨
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
