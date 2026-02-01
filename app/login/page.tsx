'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { Mail, Lock, Eye, EyeOff, User, Palette, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('jean@lojania.com');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState<'buyer' | 'artisan' | null>(null);
    const [activeTab, setActiveTab] = useState<'buyer' | 'artisan'>('buyer');

    const handleLogin = async (type: 'buyer' | 'artisan') => {
        setIsLoading(type);
        // Simular delay de autenticación
        await new Promise(resolve => setTimeout(resolve, 1500));
        login(type, email);
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-loja-beige via-white to-loja-beige flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <Image
                    src="/hero-banner.png"
                    alt="Artesanías de Loja"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-loja-dark/80 via-loja-dark/60 to-loja-terracotta/40" />

                <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center font-bold text-xl">
                            OL
                        </div>
                        <div>
                            <span className="font-bold text-2xl">Origen</span>
                            <span className="font-bold text-2xl text-loja-terracotta">Loja</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Tradición que <br />
                            <span className="text-loja-terracotta">conecta</span> mundos
                        </h1>
                        <p className="text-xl text-white/80 max-w-md leading-relaxed">
                            Únete a nuestra comunidad de artesanos y amantes de lo auténtico. Cada compra apoya el trabajo artesanal de Loja, Ecuador.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8">
                        <div>
                            <div className="text-3xl font-bold">50+</div>
                            <div className="text-white/60 text-sm">Artesanos</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">200+</div>
                            <div className="text-white/60 text-sm">Productos</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">1000+</div>
                            <div className="text-white/60 text-sm">Clientes</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-xl flex items-center justify-center text-white font-bold">
                            LN
                        </div>
                        <span className="font-bold text-2xl text-loja-dark">LojaNia</span>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido de vuelta!</h2>
                        <p className="text-gray-500">Inicia sesión para continuar</p>
                    </div>

                    {/* Tab Selector */}
                    <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
                        <button
                            onClick={() => {
                                setActiveTab('buyer');
                                setEmail('jean@lojania.com');
                            }}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'buyer'
                                ? 'bg-white text-loja-dark shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <User size={18} />
                            Comprador
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('artisan');
                                setEmail('maria.guaman@artesanias.ec');
                            }}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'artisan'
                                ? 'bg-white text-loja-terracotta shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Palette size={18} />
                            Artesano
                        </button>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ejemplo@correo.com"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-loja-terracotta/20 focus:border-loja-terracotta"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value="••••••••"
                                    readOnly
                                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-loja-terracotta/20 focus:border-loja-terracotta"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-loja-terracotta focus:ring-loja-terracotta" />
                                <span className="text-gray-600">Recordarme</span>
                            </label>
                            <a href="#" className="text-loja-terracotta hover:underline font-medium">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={() => handleLogin(activeTab)}
                            disabled={isLoading !== null}
                            className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl btn-press ${activeTab === 'buyer'
                                ? 'bg-loja-dark text-white hover:bg-gray-800'
                                : 'bg-loja-terracotta text-white hover:bg-loja-dark'
                                } ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                        >
                            {isLoading === activeTab ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Iniciando sesión...
                                </>
                            ) : (
                                <>
                                    {activeTab === 'buyer' ? 'Iniciar como Comprador' : 'Iniciar como Artesano'}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">o continúa con</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium text-gray-700">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                        <button className="py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium text-gray-700">
                            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </button>
                    </div>

                    {/* Register Link */}
                    <p className="text-center mt-8 text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <a href="#" className="text-loja-terracotta font-semibold hover:underline">
                            Regístrate aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
