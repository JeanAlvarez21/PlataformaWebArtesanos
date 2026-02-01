import React from 'react';
import Image from 'next/image';
import { artisans, products, getProductsByArtisan } from '@/lib/data';
import { ArrowLeft, MapPin, Star, ShieldCheck, Award, Leaf, Phone, Mail, Globe, ShoppingCart, MessageCircle, Sparkles, Heart, Share2, Facebook, Instagram, Twitter, ChevronRight, ArrowRight, Users } from 'lucide-react';
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
         <div className="min-h-screen flex items-center justify-center bg-gray-50 text-loja-dark">
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
      <div className="min-h-screen bg-[#FDFCFB]">
         <Navbar />

         {/* Cinematic Hero Section */}
         <div className="relative h-[65vh] min-h-[500px] overflow-hidden">
            <Image
               src={artisan.coverPhoto || "https://images.unsplash.com/photo-1590732823183-f9a84352061f?auto=format&fit=crop&q=80"}
               alt={`Taller de ${artisan.name}`}
               fill
               className="object-cover scale-110"
               priority
            />

            {/* Overlay Gradient: Luxurious and deep */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-loja-dark/40 to-loja-dark/60 z-10" />

            {/* Animated Light Trails / Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-loja-gold/20 rounded-full blur-[100px] animate-pulse z-0" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-loja-terracotta/10 rounded-full blur-[120px] animate-pulse delay-1000 z-0" />

            {/* Back Navigation */}
            <div className="absolute top-28 left-6 md:left-12 z-40">
               <Link
                  href="/artesanos"
                  className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-2xl border border-white/20 hover:bg-white hover:text-loja-dark transition-all duration-500 shadow-2xl"
               >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="font-black tracking-widest text-xs uppercase">Volver a la Red</span>
               </Link>
            </div>

            {/* Float Label */}
            <div className="absolute bottom-40 left-6 md:left-12 z-20 transition-all duration-1000 animate-slide-in-left">
               <div className="inline-flex items-center gap-2 bg-loja-gold text-loja-dark px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4 shadow-xl">
                  <Award size={14} />
                  MAESTRO ARTESANO
               </div>
               <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
                  {artisan.name}
               </h1>
            </div>

            {/* Tricolor Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-2 flex z-30">
               <div className="flex-1 bg-yellow-400" />
               <div className="flex-1 bg-blue-600" />
               <div className="flex-1 bg-red-600" />
            </div>
         </div>

         {/* Content Architecture */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-40 pb-32">
            <div className="grid lg:grid-cols-12 gap-10">

               {/* SIDEBAR: Profile Card & Stats (Glassmorphism) */}
               <div className="lg:col-span-4 space-y-8">
                  <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white p-10 relative overflow-hidden group">
                     {/* Abstract Decorative Element */}
                     <div className="absolute -top-10 -right-10 w-40 h-40 bg-loja-terracotta/5 rounded-full group-hover:scale-110 transition-transform duration-1000" />

                     {/* Main Photo */}
                     <div className="relative mb-10 group">
                        <div className="w-48 h-48 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white mx-auto relative z-10">
                           <Image src={artisan.photo} alt={artisan.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        {/* Status Badge */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-2xl shadow-xl border-2 border-white flex items-center gap-2 z-20">
                           <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                           <span className="text-[10px] font-black tracking-widest uppercase">Activo Ahora</span>
                        </div>
                     </div>

                     <div className="text-center space-y-2 mb-8">
                        <div className="flex items-center justify-center gap-2 text-loja-terracotta font-black tracking-widest text-[10px] uppercase">
                           <MapPin size={12} />
                           {artisan.location}
                        </div>
                        <p className="text-gray-400 text-xs font-medium px-4">Preservando el arte lojano desde hace más de 15 años.</p>
                     </div>

                     {/* Stats Matrix */}
                     <div className="grid grid-cols-2 gap-4 py-8 border-y border-gray-100/50">
                        <div className="text-center group/stat">
                           <div className="flex justify-center text-yellow-500 mb-1 group-hover/stat:scale-110 transition-transform">
                              <Star size={18} fill="currentColor" />
                           </div>
                           <div className="text-2xl font-black text-loja-dark">{artisan.rating}</div>
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Puntuación</p>
                        </div>
                        <div className="text-center group/stat">
                           <div className="flex justify-center text-loja-terracotta mb-1 group-hover/stat:scale-110 transition-transform">
                              <Heart size={18} fill="currentColor" />
                           </div>
                           <div className="text-2xl font-black text-loja-dark">{artisan.reviews}</div>
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Reseñas</p>
                        </div>
                     </div>

                     {/* Quality Badges */}
                     <div className="flex flex-wrap justify-center gap-3 mt-8">
                        {artisan.badges.map(badge => (
                           <span key={badge} className="px-4 py-2 bg-loja-dark text-loja-gold text-[9px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 border border-white/10 shadow-lg">
                              {badge === 'Trusted' && <ShieldCheck size={12} />}
                              {badge === 'Verificado' && <Award size={12} />}
                              {badge === 'Sostenible' && <Leaf size={12} />}
                              {badge}
                           </span>
                        ))}
                     </div>

                     {/* Social Interaction */}
                     <div className="grid grid-cols-3 gap-3 mt-10">
                        <button className="bg-gray-50 hover:bg-loja-dark hover:text-white p-4 rounded-3xl flex items-center justify-center text-gray-400 transition-all shadow-sm">
                           <Instagram size={20} />
                        </button>
                        <button className="bg-loja-terracotta hover:bg-loja-dark text-white p-4 rounded-3xl flex items-center justify-center transition-all shadow-xl shadow-loja-terracotta/20">
                           <MessageCircle size={20} />
                        </button>
                        <button className="bg-gray-50 hover:bg-loja-dark hover:text-white p-4 rounded-3xl flex items-center justify-center text-gray-400 transition-all shadow-sm">
                           <Share2 size={20} />
                        </button>
                     </div>
                  </div>

                  {/* Highlight: Heritage Box */}
                  <div className="bg-gradient-to-br from-loja-dark to-[#0F0F0F] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5 group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-loja-terracotta/10 rounded-full blur-[60px] group-hover:bg-loja-terracotta/20 transition-colors" />
                     <h4 className="text-loja-gold font-black text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                        <Sparkles size={16} className="animate-pulse" />
                        LA PROMESA
                     </h4>
                     <p className="text-gray-300 leading-relaxed italic text-lg opacity-90 group-hover:opacity-100 transition-opacity">
                        "Cada pieza que sale de mi taller lleva no solo mi firma, sino el alma de mis ancestros y el sudor de la tierra lojana."
                     </p>
                     <div className="mt-8 flex items-center gap-3 text-loja-gold/60 text-xs font-black uppercase tracking-widest">
                        <span>ENTREGA ASEGURADA</span>
                        <div className="flex-1 h-px bg-white/10" />
                     </div>
                  </div>
               </div>

               {/* MAIN AREA: Bio & Products */}
               <div className="lg:col-span-8 space-y-12">

                  {/* BIO: El Legado */}
                  <div className="bg-white rounded-[3rem] shadow-xl p-10 md:p-16 border border-gray-100 relative overflow-hidden">
                     {/* Background Graphic */}
                     <div className="absolute bottom-0 right-0 opacity-[0.03] pointer-events-none">
                        <Sparkles size={300} className="text-loja-terracotta" />
                     </div>

                     <div className="flex items-center gap-5 mb-12">
                        <div className="w-14 h-14 bg-loja-terracotta/5 rounded-[1.5rem] flex items-center justify-center text-loja-terracotta shadow-inner">
                           <Users size={28} />
                        </div>
                        <div>
                           <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-none">Su Legado</h2>
                           <div className="h-1.5 w-12 bg-loja-gold mt-2 rounded-full" />
                        </div>
                     </div>

                     <div className="relative text-xl text-gray-600 leading-relaxed font-medium">
                        <span className="text-7xl font-black text-loja-terracotta float-left mr-5 mt-1 -ml-2 select-none opacity-20 absolute -top-4 -left-2 italic">"</span>
                        <p className="relative z-10 first-letter:text-6xl first-letter:font-black first-letter:text-loja-terracotta first-letter:mr-4 first-letter:float-left">
                           {artisan.description}
                        </p>
                     </div>

                     <div className="grid sm:grid-cols-2 gap-8 mt-16 p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100">
                        <div className="space-y-3">
                           <h4 className="font-black text-loja-dark/40 text-[10px] uppercase tracking-[0.3em]">ESPECIALIDAD</h4>
                           <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-loja-terracotta" />
                              <p className="text-xl font-black text-loja-dark">{artisan.id === 'a1' ? 'Tejido Artístico' : 'Alfarería de Fina'}</p>
                           </div>
                        </div>
                        <div className="space-y-3">
                           <h4 className="font-black text-loja-dark/40 text-[10px] uppercase tracking-[0.3em]">TÉCNICA MAESTRA</h4>
                           <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-loja-gold" />
                              <p className="text-xl font-black text-loja-dark">Herencia Ancestral</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* CATALOG: Galería de Obras */}
                  <div className="space-y-10">
                     <div className="flex flex-wrap items-end justify-between px-6 gap-4">
                        <div>
                           <h2 className="text-4xl font-black text-gray-900 tracking-tight">Obra Reciente</h2>
                           <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Colección exclusiva LojaNia</p>
                        </div>
                        <div className="bg-white px-6 py-3 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3">
                           <span className="w-2 h-2 rounded-full bg-loja-gold animate-pulse" />
                           <span className="font-black text-loja-dark text-sm tracking-widest">{artisanProducts.length} PIEZAS DISPONIBLES</span>
                        </div>
                     </div>

                     <div className="grid sm:grid-cols-2 gap-10">
                        {artisanProducts.map(product => (
                           <Link
                              key={product.id}
                              href={`/producto/${product.id}`}
                              className="group bg-white rounded-[3.5rem] overflow-hidden shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 border border-gray-100 flex flex-col hover:-translate-y-3"
                           >
                              <div className="h-80 relative overflow-hidden">
                                 <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                 />
                                 {/* Hover Overlay */}
                                 <div className="absolute inset-0 bg-gradient-to-t from-loja-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                       <span className="inline-flex items-center gap-2 text-white font-black text-xs tracking-widest uppercase bg-loja-terracotta/90 px-5 py-2 rounded-full mb-4">
                                          DETALLES <ArrowRight size={14} />
                                       </span>
                                       <p className="text-white/70 text-sm font-medium leading-relaxed line-clamp-2">
                                          Una pieza magistral creada con {product.category.toLowerCase()} de la más alta calidad.
                                       </p>
                                    </div>
                                 </div>
                                 {/* Wishlist Button */}
                                 <button className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-lg z-20">
                                    <Heart size={20} />
                                 </button>
                                 {/* Price Badge */}
                                 <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-2 rounded-2xl text-loja-dark font-black shadow-xl z-20 group-hover:opacity-0 transition-opacity">
                                    ${product.price.toFixed(2)}
                                 </div>
                              </div>
                              <div className="p-10">
                                 <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[10px] font-black uppercase text-loja-terracotta tracking-[0.3em]">{product.category}</span>
                                    <div className="flex-1 h-px bg-loja-terracotta/10" />
                                 </div>
                                 <h4 className="text-2xl font-black text-gray-900 group-hover:text-loja-terracotta transition-colors mb-6 line-clamp-1">{product.name}</h4>

                                 <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                                    <div className="flex items-center gap-1.5 bg-yellow-400/10 px-3 py-1 rounded-full text-yellow-700 font-bold text-xs">
                                       <Star size={14} fill="currentColor" />
                                       4.9
                                    </div>
                                    <div className="text-loja-terracotta font-black text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all uppercase">
                                       Adquirir Pieza
                                       <ChevronRight size={16} />
                                    </div>
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
