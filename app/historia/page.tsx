'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';
import { Target, Eye, Heart, Users, Lightbulb, Shield, ArrowRight, Sparkles, Coffee, MapPin, Calendar, Star, Award } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 relative overflow-hidden">
      <Navbar />

      {/* SVG Decorativo de fondo - Ondas suaves */}
      <svg className="absolute top-0 left-0 w-full h-96 pointer-events-none opacity-30" preserveAspectRatio="none" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="waveGradientHistoria" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C45C3C" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#D4A574" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C45C3C" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          fill="url(#waveGradientHistoria)"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>

      {/* Círculos decorativos flotantes */}
      <div className="absolute top-40 right-10 w-64 h-64 bg-loja-terracotta/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-96 left-10 w-48 h-48 bg-loja-gold/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-loja-blue/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 py-12 pt-28 relative z-10">

        {/* Hero Header con decoraciones */}
        <div className={`text-center mb-20 animate-slide-in-up relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Icono decorativo */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 opacity-10">
            <Coffee size={64} className="text-loja-terracotta" />
          </div>

          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-loja-terracotta/20 to-loja-gold/20 text-loja-terracotta px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-sm border border-loja-terracotta/20 backdrop-blur-sm">
            <Sparkles size={16} className="animate-pulse" />
            NUESTRA HISTORIA
            <Sparkles size={16} className="animate-pulse" />
          </span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-loja-dark mb-6">
            <span className="relative inline-block">
              El corazón de
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M0 8 Q50 0 100 8 T200 8" stroke="#C45C3C" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.3" />
              </svg>
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-loja-terracotta via-loja-dark to-loja-terracotta animate-gradient-x">
              LojaNia
            </span>
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            No somos solo una tienda, somos el <span className="font-semibold text-loja-terracotta">eco de miles de manos</span> que
            transforman el barro, la lana y el café en <span className="font-semibold text-loja-dark">legado vivo</span>.
          </p>

          {/* Estadísticas animadas */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-gray-100 animate-fade-in hover:-translate-y-1 transition-transform"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="w-12 h-12 bg-loja-terracotta/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="text-loja-terracotta" size={24} />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-loja-dark">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiénes Somos - Historia Principal */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-loja-terracotta/10 rounded-[2rem] -z-10 animate-float" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-loja-gold/15 rounded-[2rem] -z-10 animate-float" style={{ animationDelay: '1s' }} />

            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
                src="/historia-hero.png"
                alt="Artesana tejiendo en telar tradicional"
                width={600}
                height={500}
                className="object-cover w-full h-[450px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-loja-dark/60 via-transparent to-transparent" />

              {/* Badge flotante */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-loja-gold rounded-xl flex items-center justify-center">
                  <Star size={20} className="text-loja-dark" fill="currentColor" />
                </div>
                <div>
                  <div className="text-sm font-bold text-loja-dark">Desde 2024</div>
                  <div className="text-xs text-gray-500">Tradición viva</div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <span className="text-loja-terracotta font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Nuestros Orígenes</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Tejiendo el futuro <br />
              <span className="text-loja-terracotta italic">desde la raíz.</span>
            </h2>
            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>
                Todo comenzó con una pregunta sencilla en el valle de <span className="text-loja-dark font-bold">Vilcabamba</span>:
                ¿Cómo podemos llevar la magia de nuestras manos lojanas al resto del mundo sin perder nuestra esencia?
              </p>
              <p>
                En LojaNia entendimos que la respuesta estaba en la <span className="text-loja-dark font-black">unión</span>.
                Combinamos la precisión tecnológica con la sabiduría ancestral de Saraguro, Loja y sus alrededores.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-5 p-5 bg-white rounded-2xl shadow-xl border border-gray-50 hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-loja-terracotta rounded-2xl flex items-center justify-center text-white shadow-lg shadow-loja-terracotta/30 flex-shrink-0">
                <Award size={28} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Comercio Justo Certificado</p>
                <p className="text-sm text-gray-500">Cada pieza cuenta una historia grabada en el alma de Loja.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-24 relative">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-loja-dark text-white px-5 py-2 rounded-full text-sm font-bold mb-4">
              <Calendar size={16} />
              NUESTRO CAMINO
            </span>
            <h2 className="text-4xl font-bold text-loja-dark">Línea del tiempo</h2>
          </div>

          <div className="relative bg-gradient-to-r from-loja-dark via-loja-terracotta/90 to-loja-dark rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-2xl">
            {/* Líneas decorativas tricolor */}
            <div className="absolute top-0 left-0 right-0 h-1.5 flex">
              <div className="flex-1 bg-yellow-400" />
              <div className="flex-1 bg-blue-600" />
              <div className="flex-1 bg-red-600" />
            </div>

            {/* Círculos de fondo */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full" />

            <div className="relative pt-8">
              {/* Progress Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 rounded-full" />
              <div
                className="absolute top-0 left-0 h-1 bg-loja-gold rounded-full transition-all duration-700"
                style={{ width: `${(activeTimeline / (timelineEvents.length - 1)) * 100}%` }}
              />

              <div className="grid grid-cols-4 gap-4">
                {timelineEvents.map((event, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTimeline(idx)}
                    className={`relative text-center transition-all duration-500 ${idx <= activeTimeline ? 'opacity-100' : 'opacity-50'}`}
                  >
                    <div
                      className={`absolute -top-[11px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 transition-all ${idx <= activeTimeline
                        ? 'bg-loja-gold border-loja-gold shadow-lg shadow-loja-gold/50'
                        : 'bg-gray-600 border-gray-500 hover:border-loja-gold'
                        }`}
                    />
                    <div className="pt-10">
                      <span className="text-loja-gold font-black text-xl block">{event.year}</span>
                      <h4 className="text-white font-bold text-base mb-2">{event.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed hidden md:block">{event.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 hover:shadow-2xl transition-all group animate-fade-in">
            <div className="w-16 h-16 bg-loja-terracotta/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target size={32} className="text-loja-terracotta" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Empoderar a los artesanos locales mediante una plataforma digital de excelencia,
              garantizando precios justos y conectando su arte con el corazón de clientes globales.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Comercio Justo', 'Sostenibilidad', 'Calidad Premium'].map((tag) => (
                <span key={tag} className="bg-loja-terracotta/10 text-loja-terracotta px-3 py-1.5 rounded-full text-xs font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-loja-dark p-10 rounded-[2.5rem] shadow-xl group animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="w-16 h-16 bg-loja-gold/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Eye size={32} className="text-loja-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Nuestra Visión</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Convertirnos en el máximo referente del arte lojano en el mundo,
              preservando las tradiciones y fomentando el desarrollo socioeconómico de nuestras comunidades.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Liderazgo Regional', 'Orgullo Local', 'Impacto Social'].map((tag) => (
                <span key={tag} className="bg-loja-gold/20 text-loja-gold px-3 py-1.5 rounded-full text-xs font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-loja-terracotta font-bold tracking-[0.2em] text-xs uppercase mb-4 block">LOS PILARES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-loja-dark">Nuestra esencia</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-[2.5rem] shadow-lg border-b-4 border-loja-terracotta hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group text-center animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-16 h-16 bg-loja-terracotta/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-loja-terracotta/20 group-hover:scale-110 transition-all">
                  <valor.icon size={32} className="text-loja-terracotta" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{valor.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative mb-12">
          <div className="relative bg-gradient-to-r from-loja-dark via-loja-terracotta/90 to-loja-dark rounded-[2rem] p-10 md:p-16 text-center text-white overflow-hidden shadow-2xl">
            {/* Líneas decorativas tricolor */}
            <div className="absolute top-0 left-0 right-0 h-1.5 flex">
              <div className="flex-1 bg-yellow-400" />
              <div className="flex-1 bg-blue-600" />
              <div className="flex-1 bg-red-600" />
            </div>

            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles size={16} />
                Sé parte de nuestra historia
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                ¿Listo para descubrir <br />
                <span className="text-loja-gold">nuestras creaciones?</span>
              </h2>

              <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Cada adquisición es un puente directo al corazón de un artesano.
                <span className="font-semibold text-loja-gold"> Apoya lo local, siente lo eterno.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#marketplace"
                  className="group bg-white text-loja-dark px-8 py-4 rounded-full font-bold hover:bg-loja-gold transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                >
                  Explorar Tienda
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/artesanos"
                  className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
                >
                  Conocer Artesanos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
