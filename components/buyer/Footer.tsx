'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-loja-dark text-white">
            {/* Newsletter */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Únete a nuestra comunidad</h3>
                            <p className="text-gray-400">Recibe novedades y ofertas exclusivas de artesanos lojanos.</p>
                        </div>
                        <div className="flex w-full md:w-auto gap-2">
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-loja-terracotta"
                            />
                            <button className="px-6 py-3 bg-loja-terracotta rounded-xl font-semibold hover:bg-white hover:text-loja-dark transition-colors whitespace-nowrap">
                                Suscribirse
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 relative">
                                <Image
                                    src="/logo-lojania.png"
                                    alt="LojaNia Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl">LojaNia</span>
                        </div>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            Impulsando el comercio justo y valorando nuestras raíces. Conectando artesanos con el mundo.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-loja-terracotta transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-loja-terracotta transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-loja-terracotta transition-colors">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Explorar</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="/#marketplace" className="hover:text-white transition-colors">Tienda</Link></li>
                            <li><Link href="/artesanos" className="hover:text-white transition-colors">Artesanos</Link></li>
                            <li><Link href="/historia" className="hover:text-white transition-colors">Nuestra Historia</Link></li>
                            <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Legal</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Envíos y Devoluciones</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Contacto</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="text-loja-terracotta" />
                                info@lojania.ec
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} className="text-loja-terracotta" />
                                +593 99 123 4567
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin size={16} className="text-loja-terracotta mt-1" />
                                <span>Loja, Ecuador<br />Ciudad de la Música</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                        <p>© 2026 LojaNia. Todos los derechos reservados.</p>
                        <p className="flex items-center gap-1">
                            Hecho con <Heart size={14} className="text-red-500" fill="currentColor" /> en Ecuador
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
