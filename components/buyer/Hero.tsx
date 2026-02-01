'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      {/* Fondo claro completo */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #FDF8F3 0%, #EFEBE9 50%, #FDF8F3 100%)',
        }}
      />

      {/* SVG para la curva divisoria ondulada - UNA sola curva */}
      <svg
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Degradado para el lado oscuro */}
          <linearGradient id="darkGradient" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#2D1B0E" />
            <stop offset="50%" stopColor="#3E2723" />
            <stop offset="100%" stopColor="#1A0F08" />
          </linearGradient>
        </defs>

        {/* Área izquierda oscura - la curva ondulada es su borde derecho */}
        <path
          d="M0,0 L50,0 
             Q53,25 48,50 
             Q43,75 50,100 
             L0,100 Z"
          fill="url(#darkGradient)"
        />

        {/* 3 líneas de colores que adornan la curva divisoria - solo en el borde oscuro */}
        {/* Línea 1 - Amarilla/Dorada (más exterior, pegada a la curva) */}
        <path
          d="M50,0 Q53,25 48,50 Q43,75 50,100"
          stroke="#FFD700"
          strokeWidth="0.6"
          fill="none"
          opacity="0.95"
        />
        {/* Línea 2 - Azul (medio) */}
        <path
          d="M49.3,0 Q52.3,25 47.3,50 Q42.3,75 49.3,100"
          stroke="#0033A0"
          strokeWidth="0.5"
          fill="none"
          opacity="0.9"
        />
        {/* Línea 3 - Roja (interior, dentro del área oscura) */}
        <path
          d="M48.6,0 Q51.6,25 46.6,50 Q41.6,75 48.6,100"
          stroke="#CE1126"
          strokeWidth="0.4"
          fill="none"
          opacity="0.85"
        />
      </svg>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-12 min-h-[90vh]">

        {/* Lado izquierdo - Contenido sobre fondo oscuro */}
        <div className="flex-1 text-center lg:text-left animate-slide-in-up">
          {/* Badge animado con mejor visibilidad */}
          <div className="inline-flex items-center gap-2 bg-white/95 text-loja-dark px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg animate-float border border-loja-gold/30">
            <span className="w-2.5 h-2.5 bg-loja-green rounded-full animate-pulse"></span>
            <span className="bg-gradient-to-r from-loja-terracotta to-loja-dark bg-clip-text text-transparent">
              Comercio Justo desde Ecuador
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
            Tradición de{' '}
            <span className="text-loja-terracotta relative">
              Loja
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" fill="none">
                <path d="M0 8 Q25 0 50 8 T100 8" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            a tu puerta.
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Descubre la autenticidad de nuestros artesanos. Piezas únicas, hechas a mano con técnicas ancestrales y corazón lojano.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/#marketplace"
              className="group bg-loja-terracotta text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-loja-terracotta transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 btn-press"
            >
              Explorar Catálogo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/artesanos"
              className="group bg-transparent text-white border-2 border-white/50 px-8 py-4 rounded-full font-semibold hover:border-loja-terracotta hover:text-loja-terracotta hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Play size={18} className="group-hover:scale-110 transition-transform" fill="currentColor" />
              Conocer Artesanos
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 pt-8 border-t border-white/20 flex flex-wrap items-center justify-center lg:justify-start gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-400">Artesanos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">200+</div>
              <div className="text-sm text-gray-400">Productos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-loja-terracotta">4.9★</div>
              <div className="text-sm text-gray-400">Calificación</div>
            </div>
          </div>
        </div>

        {/* Lado derecho - Imagen sobre fondo claro */}
        <div className="flex-1 relative w-full animate-fade-in">
          <div className="relative aspect-[4/3] w-full max-w-lg mx-auto">
            {/* Main image */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/hero-banner.png"
                alt="Artesanías tradicionales de Loja - textiles, cerámica y café"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-bounce-gentle">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-loja-green/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌿</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">100% Artesanal</div>
                  <div className="text-xs text-gray-500">Hecho a mano</div>
                </div>
              </div>
            </div>

            {/* Floating card right */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 hidden md:block">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-loja-terracotta rounded-full flex items-center justify-center text-white text-xs font-bold">M</div>
                  <div className="w-8 h-8 bg-loja-blue rounded-full flex items-center justify-center text-white text-xs font-bold">C</div>
                  <div className="w-8 h-8 bg-loja-green rounded-full flex items-center justify-center text-white text-xs font-bold">F</div>
                </div>
                <div className="text-xs">
                  <div className="font-bold text-gray-800">Artesanos activos</div>
                  <div className="text-gray-500">En línea ahora</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-1/3 w-64 h-64 bg-loja-terracotta/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-loja-gold/20 rounded-full blur-3xl pointer-events-none" />

      {/* Líneas curvas decorativas en la zona de transición */}
      <svg className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-96 opacity-20 pointer-events-none" viewBox="0 0 50 200">
        <path d="M25,0 Q30,50 20,100 Q10,150 25,200" stroke="#FFD700" strokeWidth="1" fill="none" />
        <path d="M30,0 Q35,50 25,100 Q15,150 30,200" stroke="#CE1126" strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  );
}
