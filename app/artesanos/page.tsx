import React from 'react';
import { artisans } from '@/lib/data';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import Navbar from '@/components/buyer/Navbar';

export default function ArtesanosPage() {
  return (
    <div className="min-h-screen bg-loja-beige">
       <Navbar />
       <div className="max-w-7xl mx-auto px-4 py-12 pt-32">
          <h1 className="text-4xl font-bold text-loja-dark mb-2">Nuestros Artesanos</h1>
          <p className="text-gray-600 mb-12 max-w-2xl">
            Conoce a los guardianes de la tradición. Hombres y mujeres que mantienen vivas las técnicas ancestrales de Loja.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisans.map((artisan) => (
               <Link href={`/artesanos/${artisan.id}`} key={artisan.id} className="block group">
                 <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    <div className="h-48 bg-gray-200 relative">
                       {/* Banner Placeholder */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                       <div className="absolute bottom-4 left-4 z-20 text-white">
                          <h3 className="text-xl font-bold group-hover:text-loja-terracotta transition-colors">{artisan.name}</h3>
                          <div className="flex items-center gap-1 text-sm opacity-90">
                             <MapPin size={14} /> {artisan.location}
                          </div>
                       </div>
                       <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-2xl group-hover:scale-105 transition-transform duration-700">
                          [Foto {artisan.name}]
                       </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col justify-between">
                       <p className="text-gray-600 mb-4 line-clamp-3">{artisan.story}</p>
                       
                       <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-1 text-yellow-500 font-bold">
                             <Star size={16} fill="currentColor" />
                             {artisan.rating}
                          </div>
                          <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                             {artisan.badges.join(' • ')}
                          </span>
                       </div>
                    </div>
                 </div>
               </Link>
            ))}
          </div>
       </div>
    </div>
  );
}
