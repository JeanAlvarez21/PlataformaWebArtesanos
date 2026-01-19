'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from './data';

interface CartItem extends Product {
  quantity: number;
  selectedVariation?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variation?: string) => void;
  removeFromCart: (productId: string, variation?: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, variation?: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => 
        item.id === product.id && item.selectedVariation === variation
      );
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedVariation === variation
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, selectedVariation: variation }];
    });
  };

  const removeFromCart = (productId: string, variation?: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === productId && item.selectedVariation === variation)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
