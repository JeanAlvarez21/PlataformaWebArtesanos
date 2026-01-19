'use client';

import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, ShieldCheck, MapPin, Star, Phone, Mail, Package } from 'lucide-react';
import { Product, Artisan, artisans } from '@/lib/data';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(undefined);
  
  // Reset selection when product changes
  useEffect(() => {
    if (product?.variations && product.variations.length > 0) {
      setSelectedVariant(product.variations[0].name);
    } else {
      setSelectedVariant(undefined);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const artisan = artisans.find(a => a.id === product.artisanId);
  
  // Determine current stock based on selection
  const currentStock = selectedVariant && product.variations
    ? product.variations.find(v => v.name === selectedVariant)?.stock || 0
    : product.stock;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl border border-gray-100">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Product Image Side */}
            <div className="md:w-1/2 bg-gray-100 relative min-h-[300px] md:min-h-[500px]">
               {/* Image Placeholder */}
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium text-xl bg-gray-200">
                 [Imagen: {product.name}]
               </div>
               <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-loja-terracotta uppercase tracking-wider shadow-sm">
                 {product.category}
               </div>
            </div>

            {/* Content Side */}
            <div className="md:w-1/2 p-8 flex flex-col max-h-[90vh] overflow-y-auto">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-2xl font-bold text-loja-blue">${product.price.toFixed(2)}</div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    <Package size={14} />
                    <span>Stock: {currentStock} un.</span>
                  </div>
                </div>
                
                {/* Variations */}
                {product.variations && product.variations.length > 0 && (
                  <div className="mb-6">
                    <label className="text-sm font-bold text-gray-700 block mb-2">Opciones Disponibles:</label>
                    <div className="flex flex-wrap gap-2">
                      {product.variations.map((v) => (
                        <button
                          key={v.name}
                          onClick={() => setSelectedVariant(v.name)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                            selectedVariant === v.name
                              ? 'bg-loja-dark text-white border-loja-dark ring-2 ring-loja-dark/20'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-loja-terracotta'
                          }`}
                        >
                          {v.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="prose prose-sm text-gray-600 mb-8">
                  <p className="font-medium text-gray-800 mb-2">Descripción</p>
                  <p className="mb-4">{product.description}</p>
                  
                  <div className="bg-loja-beige/30 p-4 rounded-lg border-l-4 border-loja-terracotta">
                    <p className="font-serif italic text-gray-700">"{product.productStory}"</p>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={currentStock === 0}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform active:scale-95 ${
                    currentStock > 0 
                      ? 'bg-loja-blue text-white hover:bg-loja-dark' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {currentStock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                </button>
              </div>

              {/* Artisan Profile Section */}
              {artisan && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Sobre el Artesano</h3>
                  
                  <Link href={`/artesanos/${artisan.id}`} className="group block bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-loja-terracotta transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden group-hover:ring-2 ring-loja-terracotta transition-all">
                        {/* Avatar Placeholder */}
                        <div className="w-full h-full bg-loja-terracotta/20 flex items-center justify-center text-loja-terracotta font-bold text-xl">
                          {artisan.name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                           <h4 className="font-bold text-gray-900 text-lg group-hover:text-loja-terracotta transition-colors">{artisan.name}</h4>
                           <div className="flex items-center gap-1 bg-yellow-100 px-2 py-0.5 rounded text-xs font-bold text-yellow-700">
                             <Star size={10} fill="currentColor" />
                             {artisan.rating}
                           </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2 mb-3">
                          {artisan.badges.includes('Trusted') && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              <ShieldCheck size={10} /> Trusted
                            </span>
                          )}
                          {artisan.badges.includes('Verificado') && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Verificado
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                          <MapPin size={12} />
                          {artisan.location}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {artisan.description}
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                           <button className="flex items-center justify-center gap-2 text-xs font-semibold bg-white border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={(e) => e.preventDefault()}>
                             <Phone size={12} /> Contactar
                           </button>
                           <button className="flex items-center justify-center gap-2 text-xs font-semibold bg-white border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={(e) => e.preventDefault()}>
                             <Mail size={12} /> Mensaje
                           </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}