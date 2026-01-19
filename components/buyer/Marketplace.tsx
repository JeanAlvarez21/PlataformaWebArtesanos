'use client';

import React, { useState } from 'react';
import { products, Product } from '@/lib/data';
import { Filter, ShoppingCart, Award } from 'lucide-react';
import ProductModal from './ProductModal';

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['Todos', 'Textiles', 'Cerámica', 'Café', 'Joyería', 'Madera'];

  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="marketplace">
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />

      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold text-loja-dark mb-2">Marketplace</h2>
          <p className="text-gray-600">Encuentra tesoros únicos de nuestra tierra</p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2 mt-4 md:mt-0 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter size={20} className="text-gray-400 mr-2 flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-loja-dark text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-loja-terracotta hover:text-loja-terracotta'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => openProduct(product)} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }: { product: Product, onClick: () => void }) {
  const totalStock = product.variations 
    ? product.variations.reduce((sum, v) => sum + v.stock, 0)
    : product.stock;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 relative cursor-pointer"
    >
      {/* Sello Origen Loja */}
      <div className="absolute top-3 left-3 z-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
        <Award size={12} />
        Origen Loja
      </div>

      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {/* Placeholder image logic */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-lg font-medium group-hover:scale-105 transition-transform duration-500">
           Img: {product.name}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <div className="text-xs text-loja-terracotta font-semibold uppercase tracking-wider">{product.category}</div>
          <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {totalStock} disponibles
          </div>
        </div>
        <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{product.name}</h3>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-loja-dark">${product.price.toFixed(2)}</span>
          <button className="p-2 bg-loja-blue/10 text-loja-blue rounded-full hover:bg-loja-blue hover:text-white transition-colors">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
