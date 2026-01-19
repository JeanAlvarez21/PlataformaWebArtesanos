'use client';

import { useView } from '@/lib/ViewContext';
import { ShoppingBag, Hammer } from 'lucide-react';

export default function FloatingToggle() {
  const { viewMode, toggleView } = useView();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white/95 backdrop-blur-md p-3 rounded-full shadow-2xl border border-gray-200 scale-110 md:scale-100">
      <span className={`text-xs font-bold uppercase tracking-wider ${viewMode === 'buyer' ? 'text-loja-blue' : 'text-gray-400'}`}>
        Comprador
      </span>
      <button
        onClick={toggleView}
        className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${
          viewMode === 'artisan' ? 'bg-loja-terracotta' : 'bg-loja-blue'
        }`}
      >
        <div
          className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
            viewMode === 'artisan' ? 'translate-x-6' : 'translate-x-0'
          }`}
        >
          {viewMode === 'buyer' ? (
            <ShoppingBag size={14} className="text-loja-blue" />
          ) : (
            <Hammer size={14} className="text-loja-terracotta" />
          )}
        </div>
      </button>
      <span className={`text-sm font-medium ${viewMode === 'artisan' ? 'text-loja-terracotta' : 'text-gray-500'}`}>
        Artesano
      </span>
    </div>
  );
}
