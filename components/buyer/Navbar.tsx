'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, Heart, User, LayoutDashboard, LogIn } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { itemCount, wishlist } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#marketplace', label: 'Tienda' },
    { href: '/artesanos', label: 'Artesanos' },
    { href: '/historia', label: 'Nuestra Historia' },
    { href: '/contacto', label: 'Contacto' },
  ];


  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">

        {/* Líneas tricolor animadas - pasan por detrás del contenido */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute top-0 left-0 w-[200%] h-full"
            viewBox="0 0 2880 80"
            preserveAspectRatio="none"
            style={{
              animation: 'slideLines 15s linear infinite',
            }}
          >
            {/* Línea amarilla (dorada) */}
            <path
              d="M0,25 Q180,45 360,25 T720,25 T1080,25 T1440,25 T1800,25 T2160,25 T2520,25 T2880,25"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              fill="none"
              opacity="0.5"
            />
            {/* Línea azul */}
            <path
              d="M0,40 Q180,20 360,40 T720,40 T1080,40 T1440,40 T1800,40 T2160,40 T2520,40 T2880,40"
              stroke="url(#blueGradient)"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
            />
            {/* Línea roja */}
            <path
              d="M0,55 Q180,70 360,55 T720,55 T1080,55 T1440,55 T1800,55 T2160,55 T2520,55 T2880,55"
              stroke="url(#redGradient)"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
            />

            {/* Gradientes para las líneas */}
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FFA500" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0033A0" />
                <stop offset="50%" stopColor="#1E90FF" />
                <stop offset="100%" stopColor="#0033A0" />
              </linearGradient>
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#CE1126" />
                <stop offset="50%" stopColor="#FF4444" />
                <stop offset="100%" stopColor="#CE1126" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Contenido del navbar con z-index superior */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 relative">
                <Image
                  src="/logo-lojania.png"
                  alt="LojaNia"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-loja-dark">Loja</span>
                <span className="font-bold text-xl text-loja-terracotta">Nia</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium text-gray-700 hover:text-loja-terracotta transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-loja-terracotta group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Panel de Control - Solo para artesanos */}
              {isAuthenticated && user?.type === 'artisan' && (
                <Link
                  href="/panel"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-loja-terracotta/10 text-loja-terracotta rounded-xl font-medium text-sm hover:bg-loja-terracotta hover:text-white transition-colors"
                >
                  <LayoutDashboard size={18} />
                  Panel de Control
                </Link>
              )}

              {/* Wishlist */}
              <Link
                href="/#marketplace"
                className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors hidden sm:flex"
                title="Favoritos"
              >
                <Heart size={22} className="text-gray-700" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <ShoppingCart size={22} className="text-gray-700 group-hover:text-loja-terracotta transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-loja-terracotta text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* User Profile / Login */}
              {isAuthenticated ? (
                <Link
                  href="/perfil"
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                  title="Mi Perfil"
                >
                  <User size={22} className="text-gray-700" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2.5 bg-loja-dark text-white rounded-xl font-medium text-sm hover:bg-loja-terracotta transition-colors"
                >
                  <LogIn size={18} />
                  <span className="hidden sm:inline">Iniciar Sesión</span>
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
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'
          }`}>
          <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <hr className="my-2 border-gray-100" />

            {isAuthenticated && user?.type === 'artisan' && (
              <Link
                href="/panel"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-loja-terracotta/10 text-loja-terracotta font-medium transition-colors"
              >
                <LayoutDashboard size={18} />
                Panel de Control
              </Link>
            )}

            <Link
              href="/#marketplace"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
            >
              <Heart size={18} />
              Favoritos ({wishlist.length})
            </Link>

            {isAuthenticated ? (
              <Link
                href="/perfil"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {user?.avatar}
                </div>
                Mi Perfil
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-loja-dark text-white font-medium transition-colors"
              >
                <LogIn size={18} />
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
