'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, Heart, User, LayoutDashboard, LogIn, Search, ArrowRight, Sparkles, Coffee, Tag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';
import { products, artisans } from '@/lib/data';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { itemCount, wishlist } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '/#marketplace', label: 'Tienda' },
    { href: '/artesanos', label: 'Artesanos' },
    { href: '/historia', label: 'Nuestra Historia' },
    { href: '/contacto', label: 'Contacto' },
  ];

  const filteredProducts = searchQuery.length >= 2
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4)
    : [];

  const filteredArtisans = searchQuery.length >= 2
    ? artisans.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2)
    : [];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-white/90 backdrop-blur-md shadow-sm'}`}>
        {/* Líneas tricolor animadas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute top-0 left-0 w-[200%] h-full"
            viewBox="0 0 2880 80"
            preserveAspectRatio="none"
            style={{ animation: 'slideLines 15s linear infinite' }}
          >
            <path d="M0,25 Q180,45 360,25 T720,25 T1080,25 T1440,25 T1800,25 T2160,25 T2520,25 T2880,25" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none" opacity="0.5" />
            <path d="M0,40 Q180,20 360,40 T720,40 T1080,40 T1440,40 T1800,40 T2160,40 T2520,40 T2880,40" stroke="url(#blueGradient)" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M0,55 Q180,70 360,55 T720,55 T1080,55 T1440,55 T1800,55 T2160,55 T2520,55 T2880,55" stroke="url(#redGradient)" strokeWidth="2" fill="none" opacity="0.4" />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFD700" /><stop offset="50%" stopColor="#FFA500" /><stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0033A0" /><stop offset="50%" stopColor="#1E90FF" /><stop offset="100%" stopColor="#0033A0" />
              </linearGradient>
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#CE1126" /><stop offset="50%" stopColor="#FF4444" /><stop offset="100%" stopColor="#CE1126" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 relative transform group-hover:scale-110 transition-transform duration-300">
                <Image src="/logo-lojania.png" alt="LojaNia" fill className="object-contain" />
              </div>
              <div className="hidden sm:block">
                <span className="font-black text-xl text-loja-dark">Loja</span>
                <span className="font-black text-xl text-loja-terracotta">Nia</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-bold text-sm text-gray-600 hover:text-loja-terracotta transition-all relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-loja-terracotta to-loja-gold group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group"
              >
                <Search size={18} className="text-gray-400 group-hover:text-loja-terracotta transition-colors" />
                <span className="text-sm text-gray-400 font-medium">Buscar...</span>
                <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono text-gray-400">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="sm:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Search size={22} className="text-gray-700" />
              </button>

              {/* Panel de Control - Solo para artesanos */}
              {isAuthenticated && user?.type === 'artisan' && (
                <Link
                  href="/panel"
                  className="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-loja-terracotta/10 to-loja-gold/10 text-loja-terracotta rounded-xl font-bold text-xs uppercase tracking-widest hover:from-loja-terracotta hover:to-loja-dark hover:text-white transition-all"
                >
                  <LayoutDashboard size={16} />
                  Panel
                </Link>
              )}

              {/* Wishlist */}
              <Link
                href="/#marketplace"
                className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all hidden sm:flex group"
                title="Favoritos"
              >
                <Heart size={22} className="text-gray-600 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-scale-in">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all group"
              >
                <ShoppingCart size={22} className="text-gray-600 group-hover:text-loja-terracotta group-hover:scale-110 transition-all" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-loja-terracotta text-white text-[10px] font-black rounded-full flex items-center justify-center animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* User Profile / Login */}
              {isAuthenticated ? (
                <Link
                  href="/perfil"
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-all group"
                  title="Mi Perfil"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-xl flex items-center justify-center text-white font-bold text-xs group-hover:scale-105 transition-transform">
                    {user?.avatar}
                  </div>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2.5 bg-loja-dark text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-loja-terracotta transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <LogIn size={16} />
                  <span className="hidden sm:inline">Ingresar</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors md:hidden"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
          <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-100" />
            {isAuthenticated && user?.type === 'artisan' && (
              <Link href="/panel" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-loja-terracotta/10 text-loja-terracotta font-bold text-sm transition-colors">
                <LayoutDashboard size={18} />Panel de Control
              </Link>
            )}
            <Link href="/#marketplace" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors">
              <Heart size={18} />Favoritos ({wishlist.length})
            </Link>
            {isAuthenticated ? (
              <Link href="/perfil" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-lg flex items-center justify-center text-white font-bold text-xs">{user?.avatar}</div>
                Mi Perfil
              </Link>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-loja-dark text-white font-bold text-sm transition-colors">
                <LogIn size={18} />Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fade-in" onClick={() => setIsSearchOpen(false)}>
          <div ref={searchRef} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-scale-in">
            {/* Search Input */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <Search size={24} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar productos, artesanos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 text-lg font-medium text-gray-900 placeholder-gray-400 outline-none"
                />
                <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {searchQuery.length < 2 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-loja-terracotta/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search size={28} className="text-loja-terracotta" />
                  </div>
                  <p className="text-gray-500 font-medium">Escribe al menos 2 caracteres para buscar</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['Poncho', 'Café', 'Cerámica', 'Textil'].map(tag => (
                      <button key={tag} onClick={() => setSearchQuery(tag)} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold hover:bg-loja-terracotta/10 hover:text-loja-terracotta transition-colors">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Products */}
                  {filteredProducts.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Tag size={12} />Productos
                      </h3>
                      <div className="space-y-2">
                        {filteredProducts.map(product => (
                          <Link
                            key={product.id}
                            href={`/producto/${product.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-14 h-14 rounded-xl bg-loja-beige overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform">
                              <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-900 group-hover:text-loja-terracotta transition-colors truncate">{product.name}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-black text-loja-terracotta">${product.price.toFixed(2)}</p>
                              <div className="flex items-center gap-1 text-green-500">
                                <span className="text-[10px] font-bold">{product.stock > 0 ? 'En stock' : 'Agotado'}</span>
                              </div>
                            </div>
                            <ArrowRight size={18} className="text-gray-300 group-hover:text-loja-terracotta group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Artisans */}
                  {filteredArtisans.length > 0 && (
                    <div>
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Coffee size={12} />Artesanos
                      </h3>
                      <div className="space-y-2">
                        {filteredArtisans.map(artisan => (
                          <Link
                            key={artisan.id}
                            href={`/artesanos/${artisan.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-loja-terracotta to-loja-dark overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform">
                              <Image src={artisan.photo} alt={artisan.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-900 group-hover:text-loja-terracotta transition-colors truncate">{artisan.name}</p>
                              <p className="text-xs text-gray-500">{artisan.location}</p>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest">Verificado</span>
                            <ArrowRight size={18} className="text-gray-300 group-hover:text-loja-terracotta group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Results */}
                  {filteredProducts.length === 0 && filteredArtisans.length === 0 && (
                    <div className="text-center py-10">
                      <Sparkles size={32} className="text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">No se encontraron resultados para "{searchQuery}"</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Quick Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-medium">Presiona <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded font-mono">ESC</kbd> para cerrar</span>
                <Link href="/#marketplace" onClick={() => setIsSearchOpen(false)} className="font-bold text-loja-terracotta hover:underline flex items-center gap-1">
                  Ver todos los productos <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
