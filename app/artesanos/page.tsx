'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { artisans } from '@/lib/data';
import Link from 'next/link';
import { MapPin, Star, ShieldCheck, Leaf, Award, Heart, Coffee, Users, Sparkles, ArrowRight, Search, Filter } from 'lucide-react';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';

export default function ArtesanosPage() {
   const [hoveredId, setHoveredId] = useState<string | null>(null);
   const [selectedCategory, setSelectedCategory] = useState<string>('todos');

   const categories = ['todos', 'Textiles', 'Cerámica', 'Café', 'Madera'];

   const filteredArtisans = selectedCategory === 'todos'
      ? artisans
      : artisans.filter(a => a.specialty.includes(selectedCategory));

   return (
      <div className="min-h-screen bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 relative overflow-hidden">
         <Navbar />

         {/* SVG Decorativo de fondo - Ondas suaves */}
         <svg className="absolute top-0 left-0 w-full h-96 pointer-events-none opacity-30" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <defs>
               <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C45C3C" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#D4A574" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#C45C3C" stopOpacity="0.3" />
               </linearGradient>
            </defs>
            <path
               fill="url(#waveGradient)"
               d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
         </svg>

         {/* Círculos decorativos flotantes */}
         <div className="absolute top-40 right-10 w-64 h-64 bg-loja-terracotta/5 rounded-full blur-3xl animate-pulse" />
         <div className="absolute top-96 left-10 w-48 h-48 bg-loja-gold/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
         <div className="absolute bottom-40 right-20 w-32 h-32 bg-loja-blue/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

         <div className="max-w-7xl mx-auto px-4 py-12 pt-28 relative z-10">

            {/* Hero Header con decoraciones */}
            <div className="text-center mb-16 animate-slide-in-up relative">
               {/* Icono decorativo de café */}
               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 opacity-10">
                  <Coffee size={64} className="text-loja-terracotta" />
               </div>

               <span className="inline-flex items-center gap-2 bg-gradient-to-r from-loja-terracotta/20 to-loja-gold/20 text-loja-terracotta px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-sm border border-loja-terracotta/20 backdrop-blur-sm">
                  <Sparkles size={16} className="animate-pulse" />
                  CONOCE A NUESTROS CREADORES
                  <Sparkles size={16} className="animate-pulse" />
               </span>

               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-loja-dark mb-6">
                  <span className="relative inline-block">
                     Nuestros
                     <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                        <path d="M0 8 Q50 0 100 8 T200 8" stroke="#C45C3C" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.3" />
                     </svg>
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-loja-terracotta via-loja-dark to-loja-terracotta animate-gradient-x">
                     Artesanos
                  </span>
               </h1>

               <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
                  Conoce a los <span className="font-semibold text-loja-terracotta">guardianes de la tradición</span>.
                  Hombres y mujeres que mantienen vivas las técnicas ancestrales de Loja, Ecuador,
                  creando piezas únicas con <span className="font-semibold text-loja-dark">amor y dedicación</span>.
               </p>

               {/* Estadísticas animadas */}
               <div className="flex flex-wrap justify-center gap-8 mt-10">
                  <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '200ms' }}>
                     <Users className="text-loja-terracotta" size={24} />
                     <div className="text-left">
                        <div className="text-2xl font-bold text-loja-dark">{artisans.length}+</div>
                        <div className="text-xs text-gray-500">Artesanos</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '400ms' }}>
                     <Heart className="text-red-500" size={24} />
                     <div className="text-left">
                        <div className="text-2xl font-bold text-loja-dark">100%</div>
                        <div className="text-xs text-gray-500">Hecho a Mano</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '600ms' }}>
                     <Star className="text-yellow-500 fill-current" size={24} />
                     <div className="text-left">
                        <div className="text-2xl font-bold text-loja-dark">4.9</div>
                        <div className="text-xs text-gray-500">Calificación</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Filtros con estilo */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
               <div className="flex items-center gap-2 text-sm text-gray-500 mr-4">
                  <Filter size={16} />
                  Filtrar por:
               </div>
               {categories.map((cat) => (
                  <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`px-5 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 ${selectedCategory === cat
                           ? 'bg-loja-terracotta text-white shadow-lg shadow-loja-terracotta/30'
                           : 'bg-white text-gray-600 hover:bg-loja-beige border border-gray-200'
                        }`}
                  >
                     {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
               ))}
            </div>

            {/* Artisans Grid Reimaginado */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredArtisans.map((artisan, index) => (
                  <Link
                     href={`/artesanos/${artisan.id}`}
                     key={artisan.id}
                     className="block group animate-fade-in"
                     style={{ animationDelay: `${index * 100}ms` }}
                     onMouseEnter={() => setHoveredId(artisan.id)}
                     onMouseLeave={() => setHoveredId(null)}
                  >
                     <div className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col ${hoveredId === artisan.id
                           ? 'shadow-2xl shadow-loja-terracotta/20 -translate-y-2'
                           : 'shadow-lg hover:shadow-xl'
                        }`}>
                        {/* Decoración tricolor sutil en la esquina */}
                        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden z-20 pointer-events-none">
                           <div className="absolute -top-10 -right-10 w-20 h-20 rotate-45">
                              <div className="h-1/3 bg-yellow-400/80" />
                              <div className="h-1/3 bg-blue-600/80" />
                              <div className="h-1/3 bg-red-600/80" />
                           </div>
                        </div>

                        {/* Image Container con efectos */}
                        <div className="h-64 relative overflow-hidden">
                           <Image
                              src={artisan.photo}
                              alt={artisan.name}
                              fill
                              className={`object-cover transition-all duration-700 ${hoveredId === artisan.id ? 'scale-110 brightness-105' : 'scale-100'
                                 }`}
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                           />

                           {/* Overlay con gradiente mejorado */}
                           <div className={`absolute inset-0 transition-all duration-500 ${hoveredId === artisan.id
                                 ? 'bg-gradient-to-t from-loja-dark/90 via-loja-dark/40 to-transparent'
                                 : 'bg-gradient-to-t from-black/70 via-black/30 to-transparent'
                              }`} />

                           {/* Rating flotante */}
                           <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                              <Star size={14} className="text-yellow-500 fill-current" />
                              <span className="font-bold text-sm text-gray-800">{artisan.rating}</span>
                           </div>

                           {/* Botón de favorito */}
                           <button
                              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 hover:scale-110 z-30"
                              onClick={(e) => { e.preventDefault(); }}
                           >
                              <Heart size={18} className="text-gray-400 hover:text-red-500 transition-colors" />
                           </button>

                           {/* Artisan Info Overlay */}
                           <div className="absolute bottom-4 left-4 right-4 z-10">
                              <div className="flex items-center gap-2 mb-2">
                                 {artisan.badges.slice(0, 2).map((badge) => (
                                    <span key={badge} className="px-2 py-0.5 bg-loja-terracotta/90 text-white text-xs font-medium rounded-full">
                                       {badge}
                                    </span>
                                 ))}
                              </div>
                              <h3 className="text-2xl font-bold text-white group-hover:text-loja-gold transition-colors">
                                 {artisan.name}
                              </h3>
                              <div className="flex items-center gap-1 text-sm text-white/90 mt-1">
                                 <MapPin size={14} />
                                 {artisan.location}
                              </div>
                           </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-white to-gray-50/50">
                           <p className="text-gray-600 mb-4 line-clamp-2 flex-1 leading-relaxed">
                              {artisan.story}
                           </p>

                           {/* Especialidad con icono */}
                           <div className="flex items-center gap-2 mb-4 text-sm">
                              <Coffee size={16} className="text-loja-terracotta" />
                              <span className="text-gray-500">Especialidad:</span>
                              <span className="font-semibold text-loja-dark">{artisan.specialty}</span>
                           </div>

                           {/* Badges mejorados */}
                           <div className="flex flex-wrap gap-2 mb-4">
                              {artisan.badges.includes('Trusted') && (
                                 <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
                                    <ShieldCheck size={14} /> Trusted
                                 </span>
                              )}
                              {artisan.badges.includes('Verificado') && (
                                 <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
                                    <Award size={14} /> Verificado
                                 </span>
                              )}
                              {artisan.badges.includes('Sostenible') && (
                                 <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
                                    <Leaf size={14} /> Sostenible
                                 </span>
                              )}
                           </div>

                           {/* Footer mejorado */}
                           <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="text-sm text-gray-500">
                                 <span className="font-bold text-loja-dark">{artisan.reviews}</span> reseñas
                              </div>
                              <span className={`flex items-center gap-1 font-semibold text-sm transition-all duration-300 ${hoveredId === artisan.id ? 'text-loja-terracotta translate-x-1' : 'text-gray-600'
                                 }`}>
                                 Ver perfil
                                 <ArrowRight size={16} className={`transition-transform duration-300 ${hoveredId === artisan.id ? 'translate-x-1' : ''
                                    }`} />
                              </span>
                           </div>
                        </div>
                     </div>
                  </Link>
               ))}
            </div>

            {/* CTA Section Reimaginada */}
            <div className="mt-20 relative">
               {/* SVG decorativo */}
               <svg className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-10" width="200" height="200" viewBox="0 0 200 200">
                  <defs>
                     <pattern id="craftPattern" patternUnits="userSpaceOnUse" width="40" height="40">
                        <circle cx="20" cy="20" r="2" fill="#C45C3C" />
                     </pattern>
                  </defs>
                  <circle cx="100" cy="100" r="95" fill="url(#craftPattern)" />
               </svg>

               <div className="relative bg-gradient-to-r from-loja-dark via-loja-terracotta/90 to-loja-dark rounded-[2rem] p-10 md:p-16 text-center text-white overflow-hidden shadow-2xl">
                  {/* Líneas decorativas tricolor */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 flex">
                     <div className="flex-1 bg-yellow-400" />
                     <div className="flex-1 bg-blue-600" />
                     <div className="flex-1 bg-red-600" />
                  </div>

                  {/* Círculos de fondo */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
                  <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full" />

                  <div className="relative z-10">
                     <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Sparkles size={16} />
                        Únete a nuestra familia
                     </div>

                     <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        ¿Eres artesano de Loja?
                     </h2>

                     <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                        Únete a nuestra comunidad y lleva tus creaciones a más personas que valoran
                        el trabajo artesanal. <span className="font-semibold text-loja-gold">Tu talento merece ser visto.</span>
                     </p>

                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="group bg-white text-loja-dark px-8 py-4 rounded-full font-bold hover:bg-loja-gold transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2">
                           Solicitar unirse
                           <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                           Conocer más
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <Footer />
      </div>
   );
}
