'use client';

import React from 'react';

// Componente de onda curva superior
export const WaveTop = ({ color = '#E07A5F', opacity = 0.1 }: { color?: string; opacity?: number }) => (
    <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
            className="relative block w-full h-[100px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
        >
            <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill={color}
                fillOpacity={opacity}
            />
        </svg>
    </div>
);

// Componente de onda curva inferior
export const WaveBottom = ({ color = '#E07A5F', opacity = 0.1 }: { color?: string; opacity?: number }) => (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none rotate-180">
        <svg
            className="relative block w-full h-[100px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
        >
            <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill={color}
                fillOpacity={opacity}
            />
        </svg>
    </div>
);

// Círculos decorativos
export const DecorativeCircles = () => (
    <>
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full border-2 border-loja-terracotta/20 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full border-2 border-loja-terracotta/15 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full border-2 border-loja-green/15 pointer-events-none hidden lg:block" />
    </>
);

// Silueta de taza de café
export const CoffeeCup = ({ className = '' }: { className?: string }) => (
    <svg
        className={`w-24 h-24 opacity-10 ${className}`}
        viewBox="0 0 100 100"
        fill="none"
    >
        <path
            d="M20 30 L20 70 Q20 85 35 85 L65 85 Q80 85 80 70 L80 30 Z"
            fill="currentColor"
        />
        <path
            d="M80 40 Q95 40 95 55 Q95 70 80 70"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
        />
        {/* Steam */}
        <path
            d="M35 20 Q38 10 42 20 M48 18 Q52 6 56 18 M62 20 Q66 10 70 20"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className="animate-pulse"
        />
    </svg>
);

// Grano de café
export const CoffeeBean = ({ className = '', size = 40 }: { className?: string; size?: number }) => (
    <svg
        className={`opacity-10 ${className}`}
        width={size}
        height={size * 1.5}
        viewBox="0 0 40 60"
        fill="none"
    >
        <ellipse cx="20" cy="30" rx="16" ry="26" fill="currentColor" />
        <path
            d="M20 8 Q12 30 20 52"
            stroke="white"
            strokeWidth="3"
            fill="none"
            opacity="0.4"
        />
    </svg>
);

// Patrón de granos de café flotantes
export const FloatingBeans = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-loja-terracotta animate-float">
            <CoffeeBean size={30} />
        </div>
        <div className="absolute top-1/4 right-20 text-loja-terracotta animate-float" style={{ animationDelay: '1s' }}>
            <CoffeeBean size={25} />
        </div>
        <div className="absolute bottom-20 left-1/4 text-loja-terracotta animate-float" style={{ animationDelay: '2s' }}>
            <CoffeeBean size={35} />
        </div>
        <div className="absolute top-1/2 right-1/3 text-loja-terracotta animate-float hidden lg:block" style={{ animationDelay: '0.5s' }}>
            <CoffeeBean size={20} />
        </div>
    </div>
);

// Blob decorativo animado
export const AnimatedBlob = ({ color = '#E07A5F', className = '' }: { color?: string; className?: string }) => (
    <div
        className={`absolute w-72 h-72 rounded-full filter blur-3xl opacity-20 animate-pulse ${className}`}
        style={{ backgroundColor: color }}
    />
);

// Puntos decorativos
export const DotPattern = ({ className = '' }: { className?: string }) => (
    <div
        className={`absolute inset-0 pointer-events-none opacity-5 ${className}`}
        style={{
            backgroundImage: `radial-gradient(circle, #E07A5F 1.5px, transparent 1.5px)`,
            backgroundSize: '30px 30px'
        }}
    />
);
