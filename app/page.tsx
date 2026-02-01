'use client';

import React from 'react';
import Image from 'next/image';
import { useView } from '@/lib/ViewContext';
import { useCart } from '@/lib/CartContext';
import Hero from '@/components/buyer/Hero';
import Navbar from '@/components/buyer/Navbar';
import Marketplace from '@/components/buyer/Marketplace';
import Dashboard from '@/components/artisan/Dashboard';
import Inventory from '@/components/artisan/Inventory';
import Orders from '@/components/artisan/Orders';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import { WaveTop, WaveBottom, DecorativeCircles, CoffeeCup, FloatingBeans, AnimatedBlob, DotPattern } from '@/components/ui/Decorations';

export default function Home() {
  const { viewMode } = useView();
  const { itemCount } = useCart();

  if (viewMode === 'artisan') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Artisan Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                A
              </div>
              <div>
                <span className="font-bold text-gray-800">Portal Artesano</span>
                <span className="text-xs text-gray-500 block">Panel de Control</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <span className="text-sm text-gray-500 block">¡Hola!</span>
                <span className="text-sm font-semibold text-gray-800">María Guamán</span>
              </div>
              <div className="w-10 h-10 bg-loja-terracotta/20 rounded-full flex items-center justify-center text-loja-terracotta font-bold">
                MG
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="animate-slide-in-up">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Panel de Control</h1>
            <p className="text-gray-500">Resumen de tu actividad comercial en Loja</p>
          </div>

          <Dashboard />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Orders />
            </div>
            <div>
              <Inventory />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Buyer View
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-20">
        <Hero />
        <Marketplace />

        {/* Features Section */}
        <section className="bg-white py-20 relative overflow-hidden">
          {/* Decorative elements */}
          <WaveTop color="#E07A5F" opacity={0.08} />
          <DecorativeCircles />
          <FloatingBeans />
          <DotPattern />

          {/* Coffee cup decoration */}
          <div className="absolute top-20 right-20 text-loja-terracotta hidden lg:block animate-float">
            <CoffeeCup />
          </div>

          {/* Animated blob */}
          <AnimatedBlob color="#F2CC8F" className="-top-20 -left-20" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <span className="inline-block bg-loja-terracotta/10 text-loja-terracotta px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                ¿POR QUÉ ELEGIRNOS?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Tradición con propósito
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-loja-terracotta/5 to-transparent card-hover border border-loja-terracotta/10">
                <div className="w-16 h-16 bg-loja-terracotta/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">100% Artesanal</h3>
                <p className="text-gray-600">Cada pieza es única, creada a mano por artesanos lojanos con décadas de experiencia.</p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-loja-green/5 to-transparent card-hover border border-loja-green/10">
                <div className="w-16 h-16 bg-loja-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌿</span>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Sostenible</h3>
                <p className="text-gray-600">Materiales naturales y procesos respetuosos con el medio ambiente.</p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-loja-blue/5 to-transparent card-hover border border-loja-blue/10">
                <div className="w-16 h-16 bg-loja-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💝</span>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Comercio Justo</h3>
                <p className="text-gray-600">Los artesanos reciben una compensación justa por su trabajo y talento.</p>
              </div>
            </div>
          </div>

          <WaveBottom color="#E07A5F" opacity={0.08} />
        </section>
      </main>

      {/* Footer */}
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
                  info@origenloja.ec
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

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/593991234567?text=Hola!%20Me%20interesa%20saber%20más%20sobre%20los%20productos%20de%20Origen%20Loja"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110 group"
        title="Contáctanos por WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></span>
      </a>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-loja-terracotta hover:text-white hover:border-loja-terracotta transition-all"
        title="Volver arriba"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}