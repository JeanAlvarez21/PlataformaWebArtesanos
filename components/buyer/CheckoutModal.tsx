'use client';

import React, { useState, useEffect } from 'react';
import { X, CreditCard, Lock, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { total, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) setStep('form');
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate payment processing delay
    setTimeout(() => {
      setStep('success');
      clearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>

          {step === 'form' && (
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-loja-blue/10 rounded-full text-loja-blue">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Pasarela de Pago</h2>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Lock size={10} /> Encriptación SSL Segura
                  </p>
                </div>
              </div>

              <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total a Pagar</span>
                <span className="text-2xl font-bold text-loja-dark">${total.toFixed(2)}</span>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Número de Tarjeta</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000" 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-loja-blue focus:border-transparent outline-none"
                      required
                    />
                    <CreditCard size={16} className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Expiración</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-loja-blue focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">CVC</label>
                    <input 
                      type="text" 
                      placeholder="123" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-loja-blue focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Titular de la Tarjeta</label>
                  <input 
                    type="text" 
                    placeholder="Nombre como aparece en la tarjeta" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-loja-blue focus:border-transparent outline-none"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-loja-blue text-white py-3 rounded-xl font-bold mt-4 hover:bg-loja-dark transition-all shadow-lg active:scale-95"
                >
                  Pagar ${total.toFixed(2)}
                </button>
              </form>
            </div>
          )}

          {step === 'processing' && (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <Loader2 size={48} className="text-loja-blue animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-800">Procesando Pago...</h3>
              <p className="text-gray-500 mt-2">Por favor no cierres esta ventana.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="p-8 text-center bg-green-50 h-full">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h2>
              <p className="text-gray-600 mb-8">
                Gracias por apoyar el talento de Loja. Hemos enviado la confirmación a tu correo.
              </p>
              <button 
                onClick={onClose}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg"
              >
                Volver a la Tienda
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
