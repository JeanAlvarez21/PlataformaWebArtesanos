'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingCart, Heart, MapPin, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product, getArtisanById } from '@/lib/data';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/lib/ToastContext';
import Link from 'next/link';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { showToast } = useToast();
  const [selectedVariation, setSelectedVariation] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const artisan = getArtisanById(product.artisanId);
  const inWishlist = isInWishlist(product.id);

  const currentVariation = product.variations?.find(v => v.name === selectedVariation);
  const availableStock = currentVariation?.stock ?? product.stock;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedVariation || product.variations?.[0]?.name);
    }
    showToast(`${quantity}x ${product.name} añadido al carrito`, 'success');
    onClose();
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast('Eliminado de favoritos', 'info');
    } else {
      addToWishlist(product);
      showToast('Añadido a favoritos', 'success');
    }
  };

  // Reset state when modal opens with new product
  React.useEffect(() => {
    if (isOpen && product) {
      setSelectedVariation(product.variations?.[0]?.name);
      setQuantity(1);
    }
  }, [isOpen, product]);

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative h-80 md:h-full min-h-[400px] bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  ✨ LojaNia
                </div>
                {availableStock <= 3 && availableStock > 0 && (
                  <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    ¡Últimas unidades!
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 md:p-8 flex flex-col">
              {/* Category & Wishlist */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-loja-terracotta uppercase tracking-wider">
                  {product.category}
                </span>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-full transition-colors ${inWishlist
                    ? 'bg-red-100 text-red-500'
                    : 'bg-gray-100 text-gray-400 hover:text-red-500'
                    }`}
                >
                  <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Product Name */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h2>

              {/* Artisan Link */}
              {artisan && (
                <Link
                  href={`/artesanos/${artisan.id}`}
                  onClick={onClose}
                  className="flex items-center gap-2 mb-4 group"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 relative">
                    <Image
                      src={artisan.photo}
                      alt={artisan.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 group-hover:text-loja-terracotta transition-colors">
                      {artisan.name}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin size={10} /> {artisan.location}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-medium text-gray-700">{artisan.rating}</span>
                  </div>
                </Link>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-loja-dark">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">USD</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Product Story */}
              <div className="bg-loja-beige/50 p-4 rounded-xl mb-6 border-l-4 border-loja-terracotta">
                <h4 className="font-semibold text-loja-dark text-sm mb-1">Historia del producto</h4>
                <p className="text-sm text-gray-600 italic">"{product.productStory}"</p>
              </div>

              {/* Variations */}
              {product.variations && product.variations.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Variación</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.map((variation) => (
                      <button
                        key={variation.name}
                        onClick={() => setSelectedVariation(variation.name)}
                        disabled={variation.stock === 0}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedVariation === variation.name
                          ? 'bg-loja-dark text-white shadow-md'
                          : variation.stock === 0
                            ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }`}
                      >
                        {variation.name}
                        {variation.stock <= 3 && variation.stock > 0 && (
                          <span className="ml-1 text-xs text-red-500">({variation.stock})</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors rounded-l-xl"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                    className="p-3 hover:bg-gray-50 transition-colors rounded-r-xl"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={availableStock === 0}
                  className={`flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 btn-press ${availableStock === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-loja-terracotta text-white hover:bg-loja-dark shadow-lg hover:shadow-xl'
                    }`}
                >
                  <ShoppingCart size={20} />
                  {availableStock === 0 ? 'Agotado' : `Añadir al Carrito`}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                <div className="flex flex-col items-center text-center p-2">
                  <Truck size={20} className="text-loja-green mb-1" />
                  <span className="text-xs text-gray-600">Envío gratis +$50</span>
                </div>
                <div className="flex flex-col items-center text-center p-2">
                  <Shield size={20} className="text-loja-blue mb-1" />
                  <span className="text-xs text-gray-600">Compra segura</span>
                </div>
                <div className="flex flex-col items-center text-center p-2">
                  <RotateCcw size={20} className="text-loja-terracotta mb-1" />
                  <span className="text-xs text-gray-600">30 días devolución</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}