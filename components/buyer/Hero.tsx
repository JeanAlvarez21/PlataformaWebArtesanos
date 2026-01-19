import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative bg-loja-beige text-loja-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Tradición de <span className="text-loja-terracotta">Loja</span> <br />
            a tu puerta.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
            Descubre la autenticidad de nuestros artesanos. Piezas únicas, hechas a mano con técnicas ancestrales y corazón lojano.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link 
              href="/#marketplace"
              className="bg-loja-terracotta text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition shadow-lg flex items-center justify-center"
            >
              Explorar Catálogo
            </Link>
            <Link 
              href="/artesanos"
              className="bg-white text-loja-terracotta border-2 border-loja-terracotta px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition flex items-center justify-center"
            >
              Conocer a los Artesanos
            </Link>
          </div>
        </div>
        
        {/* Placeholder for Hero Image */}
        <div className="flex-1 relative w-full h-64 md:h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
           <div className="absolute inset-0 bg-gradient-to-br from-loja-terracotta/20 to-loja-blue/20 mix-blend-multiply" />
           <div className="flex items-center justify-center h-full text-gray-400 font-bold text-2xl">
             [Imagen Artesanías Loja]
           </div>
        </div>
      </div>
      
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-loja-terracotta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-loja-blue/10 rounded-full blur-3xl" />
    </div>
  );
}
