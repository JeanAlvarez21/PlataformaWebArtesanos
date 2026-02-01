'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/lib/ToastContext';
import CheckoutModal from './CheckoutModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const { showToast } = useToast();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleRemove = (productId: string, variation?: string, name?: string) => {
    removeFromCart(productId, variation);
    showToast(`${name} eliminado del carrito`, 'info');
  };

  const shippingThreshold = 50;
  const freeShipping = total >= shippingThreshold;
  const remainingForFreeShipping = shippingThreshold - total;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[56] shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-loja-terracotta/10 rounded-xl flex items-center justify-center">
                <ShoppingBag size={20} className="text-loja-terracotta" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">Tu Carrito</h2>
                <p className="text-sm text-gray-500">{itemCount} artículo{itemCount !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          {!freeShipping && cart.length > 0 && (
            <div className="px-6 py-3 bg-loja-beige/50">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">
                  Agrega <span className="font-bold text-loja-terracotta">${remainingForFreeShipping.toFixed(2)}</span> más para envío gratis
                </span>
                <span className="text-gray-500">🚚</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-loja-terracotta to-loja-green rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (total / shippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {freeShipping && cart.length > 0 && (
            <div className="px-6 py-3 bg-green-50 flex items-center gap-2 text-green-700">
              <span className="text-xl">🎉</span>
              <span className="text-sm font-medium">¡Tienes envío gratis!</span>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag size={32} className="text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Tu carrito está vacío</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Explora nuestros productos artesanales
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-loja-terracotta text-white rounded-xl font-medium hover:bg-loja-dark transition-colors"
                >
                  Explorar Tienda
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedVariation}`}
                    className="flex gap-4 p-4 bg-gray-50 rounded-2xl group animate-fade-in"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
                      {item.selectedVariation && (
                        <p className="text-xs text-gray-500 mt-0.5">{item.selectedVariation}</p>
                      )}
                      <p className="text-sm font-bold text-loja-terracotta mt-1">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-white rounded-lg border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedVariation)}
                            className="p-1.5 hover:bg-gray-50 rounded-l-lg transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedVariation)}
                            className="p-1.5 hover:bg-gray-50 rounded-r-lg transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id, item.selectedVariation, item.name)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 p-6 bg-white">
              {/* Subtotal */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Envío</span>
                <span className={`font-medium ${freeShipping ? 'text-green-600' : ''}`}>
                  {freeShipping ? 'Gratis' : '$5.00'}
                </span>
              </div>
              <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-loja-dark">
                  ${(total + (freeShipping ? 0 : 5)).toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-loja-terracotta text-white py-4 rounded-xl font-bold hover:bg-loja-dark transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl btn-press"
              >
                Proceder al Pago
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onClose}
                className="w-full mt-3 text-gray-600 py-2 font-medium hover:text-loja-terracotta transition-colors"
              >
                Seguir Comprando
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}
