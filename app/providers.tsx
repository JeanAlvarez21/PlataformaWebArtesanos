'use client';

import { CartProvider } from '@/lib/CartContext';
import { ViewProvider } from '@/lib/ViewContext';
import { ToastProvider } from '@/lib/ToastContext';
import { AuthProvider } from '@/lib/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <ViewProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ViewProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
