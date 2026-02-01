import React from 'react';
import Image from 'next/image';
import { artisans, getProductsByArtisan } from '@/lib/data';
import { ArrowLeft, MapPin, Star, ShieldCheck, Award, Leaf, MessageCircle, Sparkles, Heart, Share2, Instagram, ChevronRight, ArrowRight, Users, Coffee, Calendar } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';

export async function generateStaticParams() {
   return artisans.map((artisan) => ({
      id: artisan.id,
   }));
}

export default async function ArtisanProfilePage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;
   const artisan = artisans.find((a) => a.id === id);
   const artisanProducts = getProductsByArtisan(id);

   if (!artisan) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 text-loja-dark">
            <Navbar />
            <div className="text-center p-12 bg-white rounded-[3rem] shadow-2xl">
               <h1 className="text-3xl font-black mb-6 tracking-tight">Artesano no encontrado</h1>
               <Link href="/artesanos" className="px-8 py-3 bg-loja-terracotta text-white rounded-2xl font-black text-sm tracking-widest hover:scale-105 transition-all">
                  VOLVER A LA RED
               </Link>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 relative overflow-hidden">
         <Navbar />

         {/* SVG Decorativo de fondo */}
         <svg className="absolute top-0 left-0 w-full h-96 pointer-events-none opacity-30" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <defs>
               <linearGradient id="artisanWave" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C45C3C" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#D4A574" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#C45C3C" stopOpacity="0.3" />
               </linearGradient>
            </defs>
            <path fill="url(#artisanWave)" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L0,0Z" />
         </svg>

         {/* Círculos decorativos flotantes */}
         <div className="absolute top-40 right-10 w-64 h-64 bg-loja-terracotta/5 rounded-full blur-3xl animate-pulse" />
         <div className="absolute top-96 left-10 w-48 h-48 bg-loja-gold/10 rounded-full blur-2xl" />

         <div className="max-w-7xl mx-auto px-4 pt-28 pb-20 relative z-10">

            {/* Back Button */}
            <Link href="/artesanos" className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md text-loja-dark px-5 py-2.5 rounded-full border border-gray-100 hover:bg-loja-terracotta hover:text-white transition-all shadow-lg mb-10 group">
               <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
               <span className="font-bold text-xs uppercase tracking-widest">Volver a Artesanos</span>
            </Link>

            <div className="grid lg:grid-cols-12 gap-10">

               {/* Sidebar: Perfil */}
               <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white rounded-[3rem] shadow-xl p-8 border border-gray-100 relative overflow-hidden">
                     {/* Decoración */}
                     <div className="absolute -top-8 -right-8 w-32 h-32 bg-loja-terracotta/5 rounded-full" />

                     {/* Foto */}
                     <div className="relative mb-8">
                        <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white mx-auto">
                           <Image src={artisan.photo} alt={artisan.name} fill className="object-cover" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-5 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-2 z-10">
                           <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                           <span className="text-[10px] font-black tracking-widest uppercase">Activo</span>
                        </div>
                     </div>

                     <div className="text-center mb-6">
                        <h1 className="text-2xl font-black text-loja-dark mb-2">{artisan.name}</h1>
                        <div className="flex items-center justify-center gap-2 text-loja-terracotta font-bold text-xs uppercase tracking-widest">
                           <MapPin size={14} />
                           {artisan.location}
                        </div>
                     </div>

                     {/* Stats */}
                     <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
                        <div className="text-center">
                           <div className="flex justify-center text-yellow-500 mb-1"><Star size={18} fill="currentColor" /></div>
                           <div className="text-2xl font-black text-loja-dark">{artisan.rating}</div>
                           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Rating</p>
                        </div>
                        <div className="text-center">
                           <div className="flex justify-center text-loja-terracotta mb-1"><Heart size={18} fill="currentColor" /></div>
                           <div className="text-2xl font-black text-loja-dark">{artisan.reviews}</div>
                           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Reseñas</p>
                        </div>
                     </div>

                     {/* Badges */}
                     <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {artisan.badges.map(badge => (
                           <span key={badge} className="px-3 py-1.5 bg-loja-dark text-loja-gold text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1.5">
                              {badge === 'Trusted' && <ShieldCheck size={12} />}
                              {badge === 'Verificado' && <Award size={12} />}
                              {badge === 'Sostenible' && <Leaf size={12} />}
                              {badge}
                           </span>
                        ))}
                     </div>

                     {/* Social */}
                     <div className="grid grid-cols-3 gap-3 mt-8">
                        <button className="bg-gray-50 hover:bg-loja-dark hover:text-white p-3 rounded-2xl flex items-center justify-center text-gray-400 transition-all">
                           <Instagram size={18} />
                        </button>
                        <button className="bg-loja-terracotta text-white p-3 rounded-2xl flex items-center justify-center shadow-lg shadow-loja-terracotta/20">
                           <MessageCircle size={18} />
                        </button>
                        <button className="bg-gray-50 hover:bg-loja-dark hover:text-white p-3 rounded-2xl flex items-center justify-center text-gray-400 transition-all">
                           <Share2 size={18} />
                        </button>
                     </div>
                  </div>

                  {/* Quote Box */}
                  <div className="bg-loja-dark rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                     <div className="absolute top-0 left-0 right-0 h-1 flex">
                        <div className="flex-1 bg-yellow-400" />
                        <div className="flex-1 bg-blue-600" />
                        <div className="flex-1 bg-red-600" />
                     </div>
                     <div className="absolute top-0 right-0 w-24 h-24 bg-loja-terracotta/10 rounded-full blur-2xl" />
                     <h4 className="text-loja-gold font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Sparkles size={14} className="animate-pulse" />
                        La Promesa
                     </h4>
                     <p className="text-gray-300 leading-relaxed italic">
                        "Cada pieza que sale de mi taller lleva el alma de mis ancestros y la esencia de la tierra lojana."
                     </p>
                  </div>
               </div>

               {/* Main Content */}
               <div className="lg:col-span-8 space-y-10">

                  {/* Bio */}
                  <div className="bg-white rounded-[3rem] shadow-xl p-10 border border-gray-100">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-loja-terracotta/10 rounded-2xl flex items-center justify-center text-loja-terracotta">
                           <Users size={24} />
                        </div>
                        <div>
                           <h2 className="text-2xl font-black text-loja-dark">Su Legado</h2>
                           <div className="h-1 w-10 bg-loja-gold mt-1 rounded-full" />
                        </div>
                     </div>
                     <p className="text-lg text-gray-600 leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-loja-terracotta first-letter:mr-3 first-letter:float-left">
                        {artisan.description}
                     </p>

                     <div className="grid sm:grid-cols-2 gap-6 mt-10 p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100">
                        <div>
                           <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Especialidad</h4>
                           <p className="text-lg font-black text-loja-dark">{artisan.specialty}</p>
                        </div>
                        <div>
                           <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Experiencia</h4>
                           <p className="text-lg font-black text-loja-dark">+15 años de tradición</p>
                        </div>
                     </div>
                  </div>

                  {/* Products */}
                  <div className="space-y-6">
                     <div className="flex items-end justify-between px-2">
                        <div>
                           <h2 className="text-2xl font-black text-loja-dark">Obra Reciente</h2>
                           <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Colección LojaNia</p>
                        </div>
                        <span className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-50 text-xs font-black text-loja-dark tracking-widest">
                           {artisanProducts.length} PIEZAS
                        </span>
                     </div>

                     <div className="grid sm:grid-cols-2 gap-6">
                        {artisanProducts.map(product => (
                           <Link key={product.id} href={`/producto/${product.id}`} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-2">
                              <div className="h-64 relative overflow-hidden">
                                 <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-loja-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                 <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-lg z-10">
                                    <Heart size={18} />
                                 </button>
                                 <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-loja-dark font-black shadow-lg">
                                    ${product.price.toFixed(2)}
                                 </div>
                              </div>
                              <div className="p-6">
                                 <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-black uppercase text-loja-terracotta tracking-widest">{product.category}</span>
                                 </div>
                                 <h4 className="text-lg font-black text-gray-900 group-hover:text-loja-terracotta transition-colors line-clamp-1">{product.name}</h4>
                                 <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-1 text-yellow-600 text-xs font-bold">
                                       <Star size={14} fill="currentColor" />
                                       4.9
                                    </div>
                                    <span className="text-loja-terracotta font-bold text-xs uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                       Ver <ChevronRight size={14} />
                                    </span>
                                 </div>
                              </div>
                           </Link>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <Footer />
      </div>
   );
}
