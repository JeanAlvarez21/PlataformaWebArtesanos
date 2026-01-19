'use client';

import React, { useState } from 'react';
import { X, CreditCard, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import CheckoutModal from './CheckoutModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, total, removeFromCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => { setIsCheckoutOpen(false); onClose(); }} />
      
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col transform transition-transform duration-300">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-lg text-gray-800">Tu Canasta</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                <p>Tu carrito está vacío.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-400 font-bold overflow-hidden">
                     {/* Tiny placeholder */}
                     IMG
                  </div>
                  <div className="flex-1">
                     <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                     {item.selectedVariation && (
                       <p className="text-xs text-loja-blue font-medium mb-1">Var: {item.selectedVariation}</p>
                     )}
                     <p className="text-xs text-gray-500 mb-2">{item.quantity} x ${item.price.toFixed(2)}</p>
                     <button 
                       onClick={() => removeFromCart(item.id, item.selectedVariation)}
                       className="text-xs text-red-500 flex items-center gap-1 hover:underline"
                     >
                       <Trash2 size={10} /> Eliminar
                     </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between mb-4 text-sm">
               <span className="text-gray-600">Subtotal</span>
               <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-loja-blue text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={cart.length === 0}
            >
              <CreditCard size={18} />
              Pagar Ahora
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
