'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products, Product, getArtisanById } from '@/lib/data';
import { Filter, ShoppingCart, Award, Heart, Search, SlidersHorizontal, X } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/lib/ToastContext';
import ProductModal from './ProductModal';
import { WaveTop, WaveBottom, DecorativeCircles, FloatingBeans, DotPattern, CoffeeBean } from '@/components/ui/Decorations';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'name';

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Todos', 'Textiles', 'Cerámica', 'Café', 'Joyería', 'Madera'];

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== 'Todos') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        getArtisanById(p.artisanId)?.name.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured - keep original order
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'Todos' || searchQuery.trim() || sortBy !== 'featured';



  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-loja-beige to-white">
      {/* Decoraciones de fondo */}
      <WaveTop color="#8B4513" opacity={0.06} />
      <DecorativeCircles />
      <FloatingBeans />
      <DotPattern />

      {/* Líneas curvas horizontales que atraviesan la sección */}
      <svg className="absolute top-1/3 left-0 w-full h-32 pointer-events-none" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M-50,50 Q360,10 720,50 T1500,50" stroke="#FFD700" strokeWidth="2" fill="none" opacity="0.3" />
        <path d="M-50,60 Q400,90 800,50 T1500,60" stroke="#8B4513" strokeWidth="1.5" fill="none" opacity="0.2" />
        <path d="M-50,40 Q300,80 600,30 T1500,40" stroke="#CE1126" strokeWidth="1.5" fill="none" opacity="0.15" />
      </svg>

      {/* Líneas curvas en la parte inferior */}
      <svg className="absolute bottom-1/4 left-0 w-full h-24 pointer-events-none" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,40 Q500,80 1000,30 T1440,40" stroke="#0033A0" strokeWidth="1.5" fill="none" opacity="0.2" />
        <path d="M0,50 Q400,20 800,60 T1440,50" stroke="#8B4513" strokeWidth="2" fill="none" opacity="0.15" />
      </svg>

      {/* Taza de café grande como fondo decorativo */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden lg:block">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="none">
          <path
            d="M20 30 L20 70 Q20 85 35 85 L65 85 Q80 85 80 70 L80 30 Z"
            fill="#3E2723"
          />
          <path
            d="M80 40 Q95 40 95 55 Q95 70 80 70"
            stroke="#3E2723"
            strokeWidth="6"
            fill="none"
          />
          {/* Steam */}
          <path
            d="M35 20 Q38 10 42 20 M48 18 Q52 6 56 18 M62 20 Q66 10 70 20"
            stroke="#3E2723"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Latte art */}
          <ellipse cx="50" cy="35" rx="20" ry="8" fill="#5D4037" opacity="0.5" />
          <path d="M40 33 Q50 40 60 33" stroke="#8D6E63" strokeWidth="2" fill="none" />
          <path d="M43 35 Q50 28 57 35" stroke="#8D6E63" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Otra taza de café pequeña al lado izquierdo */}
      <div className="absolute left-10 bottom-32 opacity-[0.03] pointer-events-none hidden xl:block rotate-12">
        <svg width="300" height="300" viewBox="0 0 100 100" fill="none">
          <path
            d="M20 30 L20 70 Q20 85 35 85 L65 85 Q80 85 80 70 L80 30 Z"
            fill="#3E2723"
          />
          <path
            d="M80 40 Q95 40 95 55 Q95 70 80 70"
            stroke="#3E2723"
            strokeWidth="6"
            fill="none"
          />
        </svg>
      </div>

      {/* Granos de café decorativos en esquinas */}
      <div className="absolute top-32 left-10 text-loja-terracotta opacity-20 rotate-12 hidden lg:block">
        <CoffeeBean size={50} />
      </div>
      <div className="absolute top-48 right-16 text-loja-terracotta opacity-15 -rotate-12 hidden lg:block">
        <CoffeeBean size={35} />
      </div>
      <div className="absolute bottom-32 left-20 text-loja-terracotta opacity-10 rotate-45 hidden lg:block">
        <CoffeeBean size={40} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="marketplace">
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Section Header */}
        <div className="text-center mb-12 animate-slide-in-up">
          <span className="inline-block bg-loja-terracotta/10 text-loja-terracotta px-4 py-1 rounded-full text-sm font-semibold mb-4">
            NUESTRO CATÁLOGO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-loja-dark mb-4">
            Tesoros de <span className="text-loja-terracotta">Loja</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cada pieza cuenta una historia. Encuentra productos auténticos hechos por manos lojanas.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos, artesanos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-loja-terracotta outline-none cursor-pointer min-w-[180px]"
              >
                <option value="featured">Destacados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="name">Nombre A-Z</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl border transition-colors lg:hidden ${showFilters ? 'bg-loja-terracotta text-white border-loja-terracotta' : 'border-gray-200 text-gray-600 hover:border-loja-terracotta'
                  }`}
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className={`mt-4 pt-4 border-t border-gray-100 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-wrap items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat
                    ? 'bg-loja-dark text-white shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-loja-terracotta'
                    }`}
                >
                  {cat}
                </button>
              ))}

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-full text-sm font-medium text-loja-terracotta hover:bg-loja-terracotta/10 transition-colors flex items-center gap-1"
                >
                  <X size={14} />
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-sm text-gray-500">
          {filteredAndSortedProducts.length} producto{filteredAndSortedProducts.length !== 1 ? 's' : ''} encontrado{filteredAndSortedProducts.length !== 1 ? 's' : ''}
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => openProduct(product)}
                delay={index * 50}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500 mb-4">Intenta con otros términos de búsqueda o filtros</p>
            <button
              onClick={clearFilters}
              className="text-loja-terracotta font-medium hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      <WaveBottom color="#8B4513" opacity={0.06} />
    </section>
  );
}

function ProductCard({ product, onClick, delay }: { product: Product, onClick: () => void, delay: number }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { showToast } = useToast();
  const artisan = getArtisanById(product.artisanId);
  const inWishlist = isInWishlist(product.id);

  const totalStock = product.variations
    ? product.variations.reduce((sum, v) => sum + v.stock, 0)
    : product.stock;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.variations?.[0]?.name);
    showToast(`${product.name} añadido al carrito`, 'success');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast('Eliminado de favoritos', 'info');
    } else {
      addToWishlist(product);
      showToast('Añadido a favoritos', 'success');
    }
  };

  return (
    <Link
      href={`/producto/${product.id}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 relative cursor-pointer card-hover animate-fade-in block"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Sello LojaNia */}
      <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
        <Award size={12} />
        LojaNia
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md transition-all ${inWishlist
          ? 'bg-red-500 text-white'
          : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'
          }`}
      >
        <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
      </button>

      {/* Product Image */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="text-xs text-loja-terracotta font-semibold uppercase tracking-wider">{product.category}</div>
          <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${totalStock > 5 ? 'bg-green-100 text-green-700' :
            totalStock > 0 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
            {totalStock > 0 ? `${totalStock} disponibles` : 'Agotado'}
          </div>
        </div>

        <h3 className="font-bold text-lg text-gray-800 mb-1 truncate group-hover:text-loja-terracotta transition-colors">
          {product.name}
        </h3>

        {artisan && (
          <p className="text-sm text-gray-500 mb-3">por {artisan.name}</p>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-xl font-bold text-loja-dark">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={totalStock === 0}
            className={`p-3 rounded-xl transition-all btn-press ${totalStock === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-loja-blue/10 text-loja-blue hover:bg-loja-blue hover:text-white'
              }`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}
