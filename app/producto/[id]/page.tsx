'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/lib/ToastContext';
import { getProductById, getArtisanById, getProductsByArtisan } from '@/lib/data';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';
import { Heart, ShoppingCart, Star, MapPin, Award, Shield, Package, Plus, Minus, Check, Share2, Sparkles, Coffee, Box, Info, ChevronRight, ArrowRight } from 'lucide-react';

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = use(params);
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
    const { showToast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [activeTab, setActiveTab] = useState('historia');

    const product = getProductById(id);
    const artisan = product ? getArtisanById(product.artisanId) : null;
    const relatedProducts = artisan ? getProductsByArtisan(artisan.id).filter(p => p.id !== id).slice(0, 3) : [];
    const inWishlist = product ? isInWishlist(product.id) : false;

    if (!product || !artisan) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 flex items-center justify-center">
                <Navbar />
                <div className="text-center p-16 bg-white rounded-[3rem] shadow-2xl">
                    <h1 className="text-3xl font-black mb-6">Pieza no encontrada</h1>
                    <Link href="/#marketplace" className="px-8 py-3 bg-loja-terracotta text-white rounded-2xl font-black text-xs tracking-widest hover:scale-105 transition-all inline-block">
                        VOLVER A LA TIENDA
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, undefined, quantity);
        setIsAdded(true);
        showToast(`¡${product.name} añadido al carrito!`, 'success');
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 relative overflow-hidden">
            <Navbar />

            {/* SVG Decorativo de fondo */}
            <svg className="absolute top-0 left-0 w-full h-64 pointer-events-none opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
                <path fill="#C45C3C" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0L0,0Z" opacity="0.15" />
            </svg>

            {/* Círculos decorativos */}
            <div className="absolute top-40 right-10 w-64 h-64 bg-loja-terracotta/5 rounded-full blur-3xl" />
            <div className="absolute bottom-40 left-10 w-48 h-48 bg-loja-gold/10 rounded-full blur-2xl" />

            <main className="pt-28 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8 bg-white/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/50 w-fit">
                        <Link href="/" className="hover:text-loja-terracotta transition-colors">Inicio</Link>
                        <ChevronRight size={12} />
                        <Link href="/#marketplace" className="hover:text-loja-terracotta transition-colors">Tienda</Link>
                        <ChevronRight size={12} />
                        <span className="text-loja-terracotta">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Imagen del Producto */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-white shadow-2xl group border border-gray-100">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                    priority
                                />
                                {/* Badge */}
                                <div className="absolute top-6 left-6 bg-loja-dark/90 backdrop-blur text-loja-gold px-5 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 uppercase">
                                    <Sparkles size={14} className="animate-pulse" />
                                    Hecho a Mano
                                </div>
                                {/* Wishlist */}
                                <button
                                    onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
                                    className={`absolute top-6 right-6 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${inWishlist ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-400 hover:text-red-500'}`}
                                >
                                    <Heart size={22} fill={inWishlist ? 'currentColor' : 'none'} />
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-4 gap-4">
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} className={`aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${i === 0 ? 'border-loja-terracotta shadow-lg' : 'border-gray-100 opacity-60 hover:opacity-100'}`}>
                                        <Image src={product.image} alt={`Vista ${i + 1}`} width={150} height={150} className="object-cover w-full h-full" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info del Producto */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="h-[2px] w-8 bg-loja-terracotta rounded-full" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-loja-terracotta">{product.category}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-loja-dark leading-tight mb-4">{product.name}</h1>

                                <div className="flex items-center gap-6 mb-6">
                                    <span className="text-4xl font-black text-loja-terracotta">${product.price.toFixed(2)}</span>
                                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full text-yellow-700 border border-yellow-100">
                                        <Star size={16} fill="currentColor" />
                                        <span className="font-bold text-sm">4.9</span>
                                        <span className="text-[10px] uppercase tracking-wider opacity-70">(24)</span>
                                    </div>
                                </div>

                                <p className="text-gray-500 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Tabs */}
                            <div className="bg-gray-100/50 p-1.5 rounded-2xl flex gap-1">
                                <button
                                    onClick={() => setActiveTab('historia')}
                                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'historia' ? 'bg-white text-loja-terracotta shadow-lg' : 'text-gray-400'}`}
                                >
                                    <Coffee size={14} /> Historia
                                </button>
                                <button
                                    onClick={() => setActiveTab('detalles')}
                                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'detalles' ? 'bg-white text-loja-terracotta shadow-lg' : 'text-gray-400'}`}
                                >
                                    <Info size={14} /> Detalles
                                </button>
                            </div>

                            <div className="min-h-[100px] px-4 border-l-2 border-loja-gold/30">
                                {activeTab === 'historia' ? (
                                    <p className="text-gray-600 italic leading-relaxed">&ldquo;{product.productStory}&rdquo;</p>
                                ) : (
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Material', value: 'Lana de Oveja Fina' },
                                            { label: 'Técnica', value: 'Telar de Cintura' },
                                            { label: 'Tiempo', value: '18 Horas de Trabajo' }
                                        ].map((spec) => (
                                            <div key={spec.label} className="flex justify-between items-center">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{spec.label}</span>
                                                <span className="text-sm font-bold text-loja-dark">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Comprar */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-white rounded-2xl p-1.5 border border-gray-100 shadow-lg">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-loja-terracotta hover:text-white transition-all"><Minus size={16} /></button>
                                        <span className="w-12 text-center font-black text-lg">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-loja-terracotta hover:text-white transition-all"><Plus size={16} /></button>
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isAdded}
                                        className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold tracking-widest uppercase text-xs transition-all shadow-xl ${isAdded ? 'bg-green-600 text-white' : 'bg-loja-dark text-white hover:bg-loja-terracotta active:scale-95'}`}
                                    >
                                        {isAdded ? <><Check size={18} /> ¡Añadido!</> : <><Box size={18} /> Añadir al Carrito</>}
                                    </button>
                                </div>
                                <p className="text-center text-[10px] font-bold text-gray-400 tracking-widest uppercase">Envío asegurado a todo Ecuador</p>
                            </div>

                            {/* Artesano */}
                            <div className="bg-white rounded-[2rem] p-6 flex items-center gap-5 border border-gray-50 shadow-lg hover:shadow-xl transition-shadow">
                                <Link href={`/artesanos/${artisan.id}`} className="relative flex-shrink-0">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-50 shadow-md">
                                        <Image src={artisan.photo} alt={artisan.name} fill className="object-cover" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-loja-gold text-loja-dark p-1 rounded-lg shadow border-2 border-white">
                                        <Award size={12} />
                                    </div>
                                </Link>
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-loja-terracotta uppercase tracking-widest">Creado por</p>
                                    <Link href={`/artesanos/${artisan.id}`}>
                                        <h4 className="text-lg font-black text-loja-dark hover:text-loja-terracotta transition-colors">{artisan.name}</h4>
                                    </Link>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                        <MapPin size={10} className="text-loja-terracotta" />
                                        {artisan.location}
                                    </div>
                                </div>
                                <Link href={`/artesanos/${artisan.id}`} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-loja-dark hover:bg-loja-dark hover:text-white transition-all">
                                    <ChevronRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Garantías */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 py-10 px-8 bg-loja-dark rounded-[3rem] text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 flex">
                            <div className="flex-1 bg-yellow-400" />
                            <div className="flex-1 bg-blue-600" />
                            <div className="flex-1 bg-red-600" />
                        </div>
                        {[
                            { icon: MapPin, title: 'Origen Loja', desc: 'Certificado 100% artesanal de la provincia.' },
                            { icon: Shield, title: 'Pago Seguro', desc: 'Protocolo bancario para tu tranquilidad.' },
                            { icon: Package, title: 'Envío Ecológico', desc: 'Sostenibilidad en cada entrega.' }
                        ].map((seal, idx) => (
                            <div key={idx} className="text-center space-y-3 relative z-10">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto text-loja-gold">
                                    <seal.icon size={24} />
                                </div>
                                <h4 className="font-black text-xs tracking-widest uppercase">{seal.title}</h4>
                                <p className="text-xs text-gray-400 max-w-[180px] mx-auto">{seal.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Productos Relacionados */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-20 space-y-8">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-loja-dark">Otras creaciones</h2>
                                    <p className="text-gray-400 text-sm font-medium mt-1">Del taller de {artisan.name.split(' ')[0]}</p>
                                </div>
                                <Link href={`/artesanos/${artisan.id}`} className="text-[10px] font-bold text-loja-terracotta uppercase tracking-widest hover:underline flex items-center gap-2">
                                    Ver Todo <ArrowRight size={14} />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedProducts.map((p) => (
                                    <Link key={p.id} href={`/producto/${p.id}`} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-2">
                                        <div className="aspect-[4/5] relative overflow-hidden">
                                            <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-bold text-loja-terracotta tracking-widest uppercase">
                                                {p.category}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-black text-loja-dark group-hover:text-loja-terracotta transition-colors line-clamp-1">{p.name}</h3>
                                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                                <p className="text-xl font-black text-loja-dark">${p.price.toFixed(2)}</p>
                                                <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-loja-terracotta group-hover:bg-loja-terracotta group-hover:text-white transition-all">
                                                    <ShoppingCart size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
