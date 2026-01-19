'use client';

import { ViewProvider } from '@/lib/ViewContext';
import { CartProvider } from '@/lib/CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ViewProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ViewProvider>
  );
}
