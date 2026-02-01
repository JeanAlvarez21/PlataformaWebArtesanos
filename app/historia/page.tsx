'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';
import { Target, Eye, Heart, Users, Lightbulb, Shield, ArrowRight, Sparkles, CheckCircle, Rocket, Coffee, MapPin, Calendar, Globe, Star, Utensils, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HistoriaPage() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const timelineEvents = [
    { year: '2024', title: 'El Inicio', description: 'Nace LojaNia en un pequeño taller de Saraguro, uniendo sueños y tradición.' },
    { year: '2025', title: 'Crecimiento', description: 'Más de 50 artesanos se unen a nuestra red de comercio justo.' },
    { year: '2026', title: 'Consolidación', description: 'Reconocimiento nacional por innovación y nuestro impacto social positivo.' },
    { year: '2027', title: 'Visión Global', description: 'Expandiendo el arte lojano a los mercados más exigentes del mundo.' },
  ];

  const valores = [
    { icon: Heart, titulo: 'Pasión', desc: 'Amamos cada detalle de nuestro trabajo y nuestra tierra.' },
    { icon: Shield, titulo: 'Confianza', desc: 'Construimos relaciones honestas y duraderas con cada artesano.' },
    { icon: Lightbulb, titulo: 'Innovación', desc: 'Ponemos la tecnología al servicio de las técnicas ancestrales.' },
    { icon: Users, titulo: 'Comunidad', desc: 'Crecemos juntos, fortaleciendo el tejido social de Loja.' },
  ];

  const stats = [
    { label: 'Artesanos', value: '50+', icon: Users },
    { label: 'Productos', value: '250+', icon: Sparkles },
    { label: 'Comunidades', value: '18', icon: MapPin },
    { label: 'Años', value: '3', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-loja-beige overflow-hidden">
      <Navbar />

      {/* Hero Section - Immersive Premium with Decorative Blobs */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Tricolor Lines Background */}
        <div className="absolute inset-x-0 top-0 h-1.5 flex z-30">
          <div className="flex-1 bg-[#FFD700]" />
          <div className="flex-1 bg-[#0056B3]" />
          <div className="flex-1 bg-[#EF4444]" />
        </div>

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/historia-hero.png"
            alt="Artesana tejiendo en telar tradicional"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-loja-dark/95 via-loja-dark/70 to-loja-dark/90" />
        </div>

        {/* Decorative Floating Blobs - Simplified */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-loja-terracotta/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
          <div className={`inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-8 border border-white/20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Sparkles size={14} className="text-loja-gold animate-pulse" />
            NUESTRA HISTORIA
            <div className="w-1.5 h-1.5 rounded-full bg-loja-terracotta" />
          </div>

          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="relative inline-block">
              Nuestra
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M0 8 Q50 0 100 8 T200 8" stroke="#C45C3C" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />
              </svg>
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-loja-terracotta via-loja-gold to-loja-terracotta animate-gradient">
              Historia
            </span>
          </h1>

          <p className={`text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            LojaNia no es solo una plataforma, es el eco de miles de manos que transforman
            el barro, la lana y el café en <span className="text-white font-bold italic">legado vivo.</span>
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <a href="#quienes-somos" className="group flex items-center gap-3 bg-loja-terracotta text-white px-8 py-4 rounded-2xl font-black tracking-widest text-[10px] uppercase hover:translate-y-[-4px] transition-all shadow-xl shadow-loja-terracotta/20">
              CONÓCENOS
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* SVG Curve at Bottom */}
        <div className="absolute bottom-[-1px] left-0 right-0 z-20">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-loja-beige">
            <path d="M0 120L1440 120L1440 0C1440 0 1190.5 84 720 84C249.5 84 0 0 0 0L0 120Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Quiénes Somos - Refined and Elegant */}
      <section id="quienes-somos" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-loja-terracotta/5 rounded-[3rem] -z-10 animate-float" />
              <span className="text-loja-terracotta font-black tracking-[0.3em] text-[10px] uppercase mb-6 block">NUESTROS ORÍGENES</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                Tejiendo el futuro <br />
                <span className="text-loja-terracotta italic">desde la raíz.</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Todo comenzó con una pregunta sencilla en el valle de <span className="text-loja-dark font-bold underline decoration-loja-gold/30">Vilcabamba</span>:
                  ¿Cómo podemos llevar la magia de nuestras manos lojanas al resto del mundo sin perder nuestra esencia?
                </p>
                <p>
                  En LojaNia entendimos que la respuesta estaba en la <span className="text-loja-dark font-black">unión</span>.
                  Combinamos la precisión tecnológica con la sabiduría ancestral de Saraguro, Loja y sus alrededores.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-6 p-6 bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-50">
                <div className="w-14 h-14 bg-loja-gold rounded-2xl flex items-center justify-center text-loja-dark shadow-lg shadow-loja-gold/20 flex-shrink-0">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Pasión por la autenticidad</p>
                  <p className="text-xs text-gray-500">Cada pieza cuenta una historia grabada en el alma de Loja.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 relative">
              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-dashed border-loja-terracotta/20 rounded-full animate-spin-slow" />

              {stats.map((stat, idx) => (
                <div key={idx} className={`bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 group hover:-translate-y-2 transition-all duration-500 ${idx % 2 === 1 ? 'translate-y-6' : ''}`}>
                  <div className="w-12 h-12 bg-loja-terracotta/5 rounded-2xl flex items-center justify-center text-loja-terracotta mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon size={24} />
                  </div>
                  <div className="text-4xl font-black text-loja-dark mb-1">{stat.value}</div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Compact Horizontal and Elegant */}
      <section className="py-32 bg-loja-dark relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-loja-terracotta/20 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Nuestro Camino</h2>
            <div className="w-20 h-1.5 bg-loja-terracotta mx-auto rounded-full" />
          </div>

          <div className="relative pt-12">
            {/* Main Progress Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10" />
            <div
              className="absolute top-0 left-0 h-1 bg-loja-terracotta transition-all duration-1000 shadow-[0_0_20px_rgba(196,92,60,0.8)]"
              style={{ width: `${(activeTimeline / (timelineEvents.length - 1)) * 100}%` }}
            />

            <div className="flex justify-between items-start">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="relative flex flex-col items-center group">
                  <button
                    onClick={() => setActiveTimeline(idx)}
                    className={`absolute -top-3 w-6 h-6 rounded-full border-4 transition-all duration-500 z-20 ${idx <= activeTimeline ? 'bg-loja-terracotta border-loja-terracotta scale-125 shadow-[0_0_15px_rgba(196,92,60,0.5)]' : 'bg-gray-800 border-gray-700 hover:border-loja-terracotta'}`}
                  />

                  <div className={`mt-12 transition-all duration-700 flex flex-col items-center max-w-[150px] text-center ${idx === activeTimeline ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}>
                    <span className="text-loja-gold font-black text-2xl mb-2">{event.year}</span>
                    <h4 className="text-white font-bold text-lg mb-3">{event.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed font-medium">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión - Deluxe Cards */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Misión */}
            <div className="group bg-gradient-to-br from-loja-beige to-white p-12 rounded-[3rem] border border-gray-100 relative overflow-hidden shadow-2xl hover:shadow-loja-terracotta/5 transition-all">
              <div className="absolute top-0 right-0 w-40 h-40 bg-loja-terracotta/5 rounded-bl-[10rem] -z-0" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-loja-terracotta rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-loja-terracotta/20 group-hover:scale-110 transition-transform">
                  <Target size={32} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-6">Nuestra Misión</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-10">
                  Empoderar a los artesanos locales mediante una plataforma digital de excelencia,
                  garantizando precios justos y conectando su arte con el corazón de clientes globales.
                </p>
                <div className="space-y-4">
                  {['Comercio Justo', 'Sostenibilidad', 'Calidad Premium'].map((item) => (
                    <div key={item} className="flex items-center gap-4 text-gray-800 font-bold">
                      <div className="w-2 h-2 rounded-full bg-loja-terracotta" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visión */}
            <div className="group bg-loja-dark p-12 rounded-[3rem] relative overflow-hidden shadow-2xl">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-loja-gold/5 rounded-tr-[10rem] -z-0" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-loja-gold rounded-3xl flex items-center justify-center text-loja-dark mb-8 shadow-xl shadow-loja-gold/20 group-hover:scale-110 transition-transform">
                  <Eye size={32} />
                </div>
                <h3 className="text-3xl font-black text-white mb-6">Nuestra Visión</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  Convertirnos en el máximo referente del arte lojano en el mundo,
                  preservando las tradiciones y fomentando el desarrollo socioeconómico de nuestras comunidades.
                </p>
                <div className="space-y-4">
                  {['Liderazgo Regional', 'Orgullo Local', 'Impacto Social'].map((item) => (
                    <div key={item} className="flex items-center gap-4 text-loja-gold font-bold">
                      <div className="w-2 h-2 rounded-full bg-loja-gold" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores - Standardized Brown/Terracotta Theme */}
      <section className="py-32 bg-loja-beige relative overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C45C3C 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-loja-terracotta font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">LOS PILARES</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Nuestra esencia</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, idx) => (
              <div
                key={idx}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl border-b-[6px] border-loja-terracotta hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 text-center"
              >
                <div className="w-20 h-20 bg-loja-terracotta/5 rounded-[2rem] flex items-center justify-center mb-8 mx-auto group-hover:bg-loja-terracotta/10 group-hover:scale-110 transition-all">
                  <valor.icon size={36} className="text-loja-terracotta" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{valor.titulo}</h3>
                <p className="text-gray-500 leading-relaxed font-medium text-sm">
                  {valor.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Final Push */}
      <section className="py-32 bg-white relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-loja-dark rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-loja-terracotta/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-loja-gold/10 rounded-full blur-[100px]" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                ¿Listo para ser parte de <span className="text-loja-terracotta italic">nuestra historia?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Cada adquisición es un puente directo al corazón de un artesano.
                Apoya lo local, siente lo eterno.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/#marketplace"
                  className="bg-loja-terracotta text-white px-10 py-5 rounded-2xl font-black tracking-widest text-sm hover:translate-y-[-4px] transition-all shadow-xl shadow-loja-terracotta/30 flex items-center justify-center gap-3"
                >
                  EXPLORAR TIENDA
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/artesanos"
                  className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-black tracking-widest text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-3 backdrop-blur-md"
                >
                  CONOCER ARTESANOS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
