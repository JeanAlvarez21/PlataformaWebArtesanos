'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/lib/ToastContext';
import { getProductById, getArtisanById, getProductsByArtisan } from '@/lib/data';
import Navbar from '@/components/buyer/Navbar';
import Footer from '@/components/buyer/Footer';
import { Heart, ShoppingCart, Star, MapPin, Award, Truck, Shield, Package, Plus, Minus, Check, ArrowLeft, Share2, Sparkles, Coffee, Box, Info, Sparkle, ChevronRight, ArrowRight } from 'lucide-react';

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
            <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
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
        <div className="min-h-screen bg-[#FDFCFB]">
            <Navbar />

            <main className="pt-32 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header: Path & Social */}
                    <div className="flex flex-wrap items-center justify-between mb-12 gap-6 bg-white/50 backdrop-blur-md p-4 rounded-[2rem] border border-white/50">
                        <nav className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">
                            <Link href="/" className="hover:text-loja-terracotta transition-colors">Inicio</Link>
                            <ChevronRight size={12} className="text-gray-300" />
                            <Link href="/#marketplace" className="hover:text-loja-terracotta transition-colors">Tesorería</Link>
                            <ChevronRight size={12} className="text-gray-300" />
                            <span className="text-loja-terracotta">{product.name}</span>
                        </nav>
                        <div className="flex gap-3 mr-2">
                            <button className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-gray-400 hover:text-loja-terracotta transition-all shadow-sm border border-gray-100">
                                <Share2 size={20} />
                            </button>
                            <button
                                onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
                                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all shadow-sm border ${inWishlist ? 'bg-red-50 text-red-500 border-red-100' : 'bg-white text-gray-400 border-gray-100 hover:text-red-500'}`}
                            >
                                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">

                        {/* LEFT: Visual Showcase */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden bg-white shadow-2xl group border border-gray-100">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                                    priority
                                />
                                {/* Quality Sticker */}
                                <div className="absolute top-10 left-10">
                                    <div className="bg-loja-dark/90 backdrop-blur-xl text-loja-gold px-6 py-2.5 rounded-full text-[10px] font-black shadow-2xl tracking-[0.3em] flex items-center gap-3 border border-white/10 uppercase">
                                        <Sparkles size={14} className="animate-pulse" />
                                        Hecho a Mano
                                    </div>
                                </div>
                                {/* Bottom Accent Overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>

                            {/* Refined Thumbnail Gallery */}
                            <div className="grid grid-cols-4 gap-6 px-4">
                                <div className="aspect-square rounded-[2rem] border-4 border-loja-terracotta overflow-hidden relative cursor-pointer shadow-xl scale-105 transition-transform">
                                    <Image src={product.image} alt="Vista Principal" fill className="object-cover" />
                                </div>
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="aspect-square rounded-[2rem] border border-gray-100 overflow-hidden relative cursor-pointer hover:border-loja-terracotta/50 transition-all hover:scale-105 group">
                                        <Image src={product.image} alt={`Vista ${i + 1}`} fill className="object-cover grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all" />
                                        <div className="absolute inset-0 bg-loja-dark/10 group-hover:bg-transparent" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Curated Acquisition */}
                        <div className="lg:col-span-5 space-y-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-[2px] w-10 bg-loja-terracotta rounded-full" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-loja-terracotta">{product.category}</span>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-black text-loja-dark tracking-tighter leading-[0.9]">{product.name}</h1>

                                <div className="flex items-center gap-8 mb-4">
                                    <div className="text-5xl font-black text-loja-terracotta">${product.price.toFixed(2)}</div>
                                    <div className="flex items-center gap-2 bg-yellow-400/10 px-5 py-2.5 rounded-[1.5rem] text-yellow-700 border border-yellow-400/20 shadow-sm">
                                        <Star size={18} fill="currentColor" />
                                        <span className="font-black text-sm">4.9</span>
                                        <span className="text-[9px] font-black text-yellow-600/50 uppercase tracking-widest ml-1">(24 Ventas)</span>
                                    </div>
                                </div>

                                <p className="text-lg text-gray-500 leading-relaxed font-medium line-clamp-3 hover:line-clamp-none transition-all">
                                    {product.description}
                                </p>
                            </div>

                            {/* Detailed Integration Tabs */}
                            <div className="space-y-8">
                                <div className="bg-gray-100/50 p-2 rounded-[2.5rem] flex gap-2 border border-white shadow-inner">
                                    <button
                                        onClick={() => setActiveTab('historia')}
                                        className={`flex-1 py-4 px-6 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'historia' ? 'bg-white text-loja-terracotta shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <div className="flex items-center justify-center gap-3"><Coffee size={16} /> Nuestra Alma</div>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('detalles')}
                                        className={`flex-1 py-4 px-6 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'detalles' ? 'bg-white text-loja-terracotta shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <div className="flex items-center justify-center gap-3"><Info size={16} /> Especificaciones</div>
                                    </button>
                                </div>

                                <div className="min-h-[120px] px-6 relative">
                                    <div className="absolute -left-2 top-0 bottom-0 w-1 bg-loja-gold/20 rounded-full" />
                                    {activeTab === 'historia' ? (
                                        <p className="text-gray-600 italic leading-relaxed text-lg animate-fade-in relative z-10">
                                            &ldquo;{product.productStory}&rdquo;
                                        </p>
                                    ) : (
                                        <div className="space-y-4 animate-fade-in">
                                            {[
                                                { label: 'Material', value: 'Lana de Oveja Fina' },
                                                { label: 'Técnica', value: 'Telar de Cintura' },
                                                { label: 'Tiempo', value: '18 Horas de Trabajo' }
                                            ].map((spec) => (
                                                <div key={spec.label} className="flex justify-between items-center group">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-loja-terracotta transition-colors">{spec.label}</span>
                                                    <div className="flex-1 mx-4 border-b border-dashed border-gray-200" />
                                                    <span className="text-sm font-black text-loja-dark">{spec.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Purchase Architecture */}
                            <div className="space-y-6 pt-4">
                                <div className="flex flex-col sm:flex-row items-stretch gap-4">
                                    <div className="flex items-center justify-between bg-white rounded-[2rem] p-2 border border-gray-100 shadow-xl min-w-[160px]">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-loja-dark hover:bg-loja-terracotta hover:text-white transition-all"><Minus size={18} /></button>
                                        <span className="font-black text-loja-dark text-xl">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-loja-dark hover:bg-loja-terracotta hover:text-white transition-all"><Plus size={18} /></button>
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isAdded}
                                        className={`flex-1 flex items-center justify-center gap-4 py-6 rounded-[2rem] font-black tracking-[0.2em] uppercase text-xs transition-all shadow-xl group ${isAdded ? 'bg-green-600 text-white' : 'bg-loja-dark text-white hover:bg-loja-terracotta hover:shadow-loja-terracotta/20 active:scale-95'}`}
                                    >
                                        {isAdded ? <Check size={20} /> : <Box size={22} className="group-hover:scale-110 transition-transform" />}
                                        {isAdded ? '¡EN EL CARRITO!' : 'ADQUIRIR ESTA PIEZA'}
                                    </button>
                                </div>
                                <p className="text-center text-[9px] font-black text-gray-400 tracking-[0.3em] uppercase">Envío asegurado a todo el Ecuador</p>
                            </div>

                            {/* Artisan Heritage Connection */}
                            <div className="pt-10 mt-10 border-t border-gray-100">
                                <div className="bg-white rounded-[3rem] p-8 flex items-center gap-6 border border-gray-50 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-loja-terracotta/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000" />

                                    <Link href={`/artesanos/${artisan.id}`} className="flex-shrink-0 relative">
                                        <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-4 border-gray-50 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                            <Image src={artisan.photo} alt={artisan.name} fill className="object-cover" />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-loja-gold text-loja-dark p-1.5 rounded-xl shadow-lg border-2 border-white">
                                            <Award size={14} />
                                        </div>
                                    </Link>

                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-loja-terracotta uppercase tracking-[0.2em] mb-1">El Maestro detrás</p>
                                        <Link href={`/artesanos/${artisan.id}`}>
                                            <h4 className="text-2xl font-black text-loja-dark hover:text-loja-terracotta transition-colors leading-tight">{artisan.name}</h4>
                                        </Link>
                                        <div className="flex items-center gap-2 mt-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <MapPin size={12} className="text-loja-terracotta" />
                                            {artisan.location}
                                        </div>
                                    </div>

                                    <Link
                                        href={`/artesanos/${artisan.id}`}
                                        className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-loja-dark border border-gray-100 hover:bg-loja-dark hover:text-white transition-all shadow-sm"
                                    >
                                        <ChevronRight size={24} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quality Seals: Elevated Design */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-32 py-16 px-10 bg-loja-dark rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-loja-terracotta/10 rounded-full blur-[100px]" />

                        {[
                            { icon: MapPin, title: 'ORIGEN LOJA', desc: 'Certificado 100% artesanal de la provincia.' },
                            { icon: Shield, title: 'TRANSACCIÓN SEGURA', desc: 'Protocolo bancario para tu tranquilidad.' },
                            { icon: Package, title: 'EMPATE ECOLÓGICO', desc: 'Sostenibilidad en cada entrega.' }
                        ].map((seal, idx) => (
                            <div key={idx} className="text-center space-y-4 relative z-10 group">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-[1.5rem] flex items-center justify-center mx-auto text-loja-gold border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                    <seal.icon size={28} />
                                </div>
                                <h4 className="font-black text-xs tracking-[0.3em] uppercase">{seal.title}</h4>
                                <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-[200px] mx-auto opacity-70">
                                    {seal.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* RELATED: Otros Tesoros */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-32 space-y-12">
                            <div className="flex flex-wrap items-end justify-between px-6 gap-6">
                                <div>
                                    <h2 className="text-4xl font-black text-loja-dark tracking-tight">Otras obras maestras</h2>
                                    <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] mt-3 flex items-center gap-3">
                                        <div className="w-8 h-[1px] bg-loja-terracotta" />
                                        Del taller de {artisan.name.split(' ')[0]}
                                    </p>
                                </div>
                                <Link
                                    href={`/artesanos/${artisan.id}`}
                                    className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black text-loja-terracotta uppercase tracking-widest hover:bg-loja-terracotta hover:text-white transition-all shadow-xl shadow-gray-100/50"
                                >
                                    Ver Colección Completa
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                {relatedProducts.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/producto/${p.id}`}
                                        className="group bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 flex flex-col hover:-translate-y-3"
                                    >
                                        <div className="aspect-[4/5] relative overflow-hidden">
                                            <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[1500ms]" />
                                            {/* Top Category Badge */}
                                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-loja-terracotta tracking-widest uppercase shadow-lg">
                                                {p.category}
                                            </div>
                                            {/* Bottom Overlay Link */}
                                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-loja-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    Explorar Obra <ArrowRight size={16} />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-10 flex-1 flex flex-col">
                                            <h3 className="text-2xl font-black text-loja-dark group-hover:text-loja-terracotta transition-colors line-clamp-1 leading-tight">{p.name}</h3>
                                            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                                <p className="text-2xl font-black text-loja-dark">${p.price.toFixed(2)}</p>
                                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-loja-terracotta group-hover:bg-loja-terracotta group-hover:text-white transition-all">
                                                    <ShoppingCart size={18} />
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
