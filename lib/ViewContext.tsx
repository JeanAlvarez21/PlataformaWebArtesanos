'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ViewMode = 'buyer' | 'artisan';

interface ViewContextType {
  viewMode: ViewMode;
  toggleView: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('buyer');

  const toggleView = () => {
    setViewMode((prev) => (prev === 'buyer' ? 'artisan' : 'buyer'));
  };

  return (
    <ViewContext.Provider value={{ viewMode, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
}
