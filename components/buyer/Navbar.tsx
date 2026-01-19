'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="fixed w-full z-40 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-loja-dark flex items-center gap-2 group">
             <span className="text-loja-terracotta group-hover:scale-110 transition-transform duration-300 inline-block">Origen</span>Loja
          </Link>
          
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-loja-terracotta transition-colors">Inicio</Link>
            <Link href="/#marketplace" className="hover:text-loja-terracotta transition-colors">Catálogo</Link>
            <Link href="/artesanos" className="hover:text-loja-terracotta transition-colors">Artesanos</Link>
            <Link href="/historia" className="hover:text-loja-terracotta transition-colors">Historias</Link>
          </nav>
          
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsCartOpen(true)}
               className="relative flex items-center gap-2 bg-loja-blue/10 text-loja-blue px-4 py-2 rounded-full hover:bg-loja-blue hover:text-white transition-all duration-300 font-semibold text-sm"
             >
               <ShoppingBag size={18} />
               <span>Mi Carrito</span>
               {itemCount > 0 && (
                 <span className="bg-loja-terracotta text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce shadow-md">
                   {itemCount}
                 </span>
               )}
             </button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
