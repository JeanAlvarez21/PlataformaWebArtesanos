import React from 'react';
import { artisans, products } from '@/lib/data';
import { ArrowLeft, MapPin, Star, ShieldCheck, Award, Leaf, Phone, Mail, Globe, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/buyer/Navbar';

// Helper for static params generation in Next.js App Router
export async function generateStaticParams() {
  return artisans.map((artisan) => ({
    id: artisan.id,
  }));
}

export default async function ArtisanProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artisan = artisans.find((a) => a.id === id);
  const artisanProducts = products.filter((p) => p.artisanId === id);

  if (!artisan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-loja-beige">
        <Navbar />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-loja-dark">Artesano no encontrado</h1>
          <Link href="/artesanos" className="text-loja-terracotta hover:underline mt-4 block">
            Volver a la lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      {/* Cover Image */}
      <div className="h-64 md:h-80 bg-loja-dark relative mt-20">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
         <div className="absolute inset-0 flex items-center justify-center opacity-20 text-white text-4xl font-bold">
            [Portada: {artisan.name}]
         </div>
         <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-8 relative z-10">
            <Link href="/artesanos" className="absolute top-8 left-4 md:left-8 text-white flex items-center gap-2 hover:underline">
               <ArrowLeft size={16} /> Volver
            </Link>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
         <div className="bg-white rounded-xl shadow-xl p-6 md:p-10 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-8">
               
               {/* Profile Info */}
               <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4">
                     {/* Avatar Placeholder */}
                     <div className="w-full h-full bg-loja-terracotta/20 flex items-center justify-center text-loja-terracotta font-bold text-4xl">
                        {artisan.name.charAt(0)}
                     </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{artisan.name}</h1>
                  
                  <div className="flex items-center gap-1 text-gray-600 mb-4">
                     <MapPin size={16} /> {artisan.location}
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                     {artisan.badges.includes('Trusted') && (
                        <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                           <ShieldCheck size={12} /> Trusted
                        </span>
                     )}
                     {artisan.badges.includes('Verificado') && (
                        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                           <Award size={12} /> Verificado
                        </span>
                     )}
                     {artisan.badges.includes('Sostenible') && (
                        <span className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                           <Leaf size={12} /> Sostenible
                        </span>
                     )}
                  </div>

                  <div className="w-full space-y-3 mb-6">
                     <div className="flex items-center gap-3 text-gray-600 text-sm">
                        <Phone size={16} className="text-gray-400" /> {artisan.contact.phone}
                     </div>
                     <div className="flex items-center gap-3 text-gray-600 text-sm">
                        <Mail size={16} className="text-gray-400" /> {artisan.contact.email}
                     </div>
                     {artisan.contact.website && (
                        <div className="flex items-center gap-3 text-loja-blue text-sm hover:underline cursor-pointer">
                           <Globe size={16} className="text-gray-400" /> {artisan.contact.website}
                        </div>
                     )}
                  </div>

                  <div className="w-full bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-center justify-center gap-2">
                     <span className="text-2xl font-bold text-yellow-600">{artisan.rating}</span>
                     <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} size={16} fill={i < Math.floor(artisan.rating) ? "currentColor" : "none"} />
                        ))}
                     </div>
                     <span className="text-xs text-yellow-700 ml-1">(120 reseñas)</span>
                  </div>
               </div>

               {/* Bio & Products */}
               <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-gray-100 md:pl-10 pt-8 md:pt-0">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre el Artesano</h2>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                     {artisan.description}
                  </p>
                  
                  <div className="bg-loja-beige/30 p-6 rounded-xl border-l-4 border-loja-terracotta mb-10">
                     <h3 className="font-bold text-loja-dark mb-2">Su Historia</h3>
                     <p className="italic text-gray-700">"{artisan.story}"</p>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                     <span>Catálogo de {artisan.name.split(' ')[0]}</span>
                     <span className="text-sm font-normal text-gray-500">{artisanProducts.length} productos</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     {artisanProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden group">
                           <div className="h-40 bg-gray-100 relative overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium group-hover:scale-105 transition-transform duration-500">
                                 [Img: {product.name}]
                              </div>
                           </div>
                           <div className="p-4">
                              <div className="text-xs text-loja-terracotta font-bold uppercase mb-1">{product.category}</div>
                              <h4 className="font-bold text-gray-900 mb-2 truncate">{product.name}</h4>
                              <div className="flex items-center justify-between">
                                 <span className="font-bold text-lg text-loja-dark">${product.price.toFixed(2)}</span>
                                 <button className="p-2 bg-gray-50 rounded-full hover:bg-loja-blue hover:text-white transition-colors text-gray-500">
                                    <ShoppingCart size={16} />
                                 </button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
