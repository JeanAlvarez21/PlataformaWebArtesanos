'use client';

import { useState } from 'react';
import { useView } from '@/lib/ViewContext';
import { useCart } from '@/lib/CartContext';
import Hero from '@/components/buyer/Hero';
import Navbar from '@/components/buyer/Navbar';
import Marketplace from '@/components/buyer/Marketplace';
import CartDrawer from '@/components/buyer/CartDrawer';
import Dashboard from '@/components/artisan/Dashboard';
import Inventory from '@/components/artisan/Inventory';
import Orders from '@/components/artisan/Orders';

export default function Home() {
  const { viewMode } = useView();
  const { itemCount } = useCart();

  if (viewMode === 'artisan') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Artisan Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-loja-terracotta rounded-lg flex items-center justify-center text-white font-bold">A</div>
               <span className="font-bold text-gray-800">Portal Artesano</span>
             </div>
             <div className="flex items-center gap-4">
               <span className="text-sm text-gray-500">Hola, María Guamán</span>
               <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                 {/* Avatar placeholder */}
                 <div className="w-full h-full bg-loja-dark/10" />
               </div>
             </div>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
            <p className="text-gray-500">Resumen de tu actividad comercial en Loja</p>
          </div>
          
          <Dashboard />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 space-y-8">
                <Orders />
             </div>
             <div>
                <Inventory />
             </div>
          </div>
        </div>
      </div>
    );
  }

  // Buyer View
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <Hero />
        <Marketplace />
      </main>

      <footer className="bg-loja-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
           <div>
             <h4 className="font-bold text-lg mb-4">Origen Loja</h4>
             <p className="text-gray-400">Impulsando el comercio justo y valorando nuestras raíces.</p>
           </div>
           <div>
             <h4 className="font-bold text-lg mb-4">Enlaces</h4>
             <ul className="space-y-2 text-gray-400">
               <li>Términos y Condiciones</li>
               <li>Política de Privacidad</li>
               <li>Envíos y Devoluciones</li>
             </ul>
           </div>
           <div>
             <h4 className="font-bold text-lg mb-4">Contacto</h4>
             <p className="text-gray-400">info@origenloja.ec</p>
             <p className="text-gray-400">Loja, Ecuador</p>
           </div>
        </div>
      </footer>
    </div>
  );
}