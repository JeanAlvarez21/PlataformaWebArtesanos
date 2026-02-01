'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from './data';

interface CartItem extends Product {
  quantity: number;
  selectedVariation?: string;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, variation?: string, quantity?: number) => void;
  removeFromCart: (productId: string, variation?: string) => void;
  updateQuantity: (productId: string, quantity: number, variation?: string) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'origen-loja-cart';
const WISHLIST_STORAGE_KEY = 'origen-loja-wishlist';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isHydrated]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error);
      }
    }
  }, [wishlist, isHydrated]);

  const addToCart = (product: Product, variation?: string, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) =>
        item.id === product.id && item.selectedVariation === variation
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedVariation === variation
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity, selectedVariation: variation }];
    });
  };

  const removeFromCart = (productId: string, variation?: string) => {
    setCart((prevCart) => prevCart.filter((item) =>
      !(item.id === productId && item.selectedVariation === variation)
    ));
  };

  const updateQuantity = (productId: string, quantity: number, variation?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variation);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedVariation === variation
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      total,
      itemCount
    }}>
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
