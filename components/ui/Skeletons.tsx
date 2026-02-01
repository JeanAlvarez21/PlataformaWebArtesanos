'use client';

import React from 'react';

// Base Skeleton Component with shimmer animation
const Skeleton = ({ className = '' }: { className?: string }) => (
    <div className={`bg-gray-200 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded-xl ${className}`} />
);

// Product Card Skeleton
export const ProductCardSkeleton = () => (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg animate-pulse">
        <Skeleton className="h-56 w-full rounded-none" />
        <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between items-center pt-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
        </div>
    </div>
);

// Artisan Card Skeleton
export const ArtisanCardSkeleton = () => (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg animate-pulse">
        <Skeleton className="h-48 w-full rounded-none" />
        <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-2xl" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
            </div>
        </div>
    </div>
);

// Profile Header Skeleton
export const ProfileHeaderSkeleton = () => (
    <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl animate-pulse">
        <Skeleton className="h-36 w-full rounded-none" />
        <div className="px-10 pb-10 -mt-14">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                <Skeleton className="w-28 h-28 rounded-[2rem]" />
                <div className="flex-1 space-y-3 text-center md:text-left">
                    <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
                    <Skeleton className="h-4 w-56 mx-auto md:mx-0" />
                    <div className="flex gap-2 justify-center md:justify-start">
                        <Skeleton className="h-6 w-32 rounded-full" />
                        <Skeleton className="h-6 w-28 rounded-full" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-100">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex flex-col items-center gap-3">
                        <Skeleton className="w-12 h-12 rounded-2xl" />
                        <Skeleton className="h-6 w-8" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// Order Row Skeleton
export const OrderRowSkeleton = () => (
    <div className="flex items-center gap-6 p-6 border-b border-gray-50 animate-pulse">
        <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="h-4 w-24 hidden md:block" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-10 w-10 rounded-xl" />
    </div>
);

// Stats Card Skeleton
export const StatsCardSkeleton = () => (
    <div className="bg-white rounded-[2rem] p-6 shadow-lg animate-pulse">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="w-12 h-12 rounded-2xl" />
        </div>
    </div>
);

// Image Skeleton with aspect ratio
export const ImageSkeleton = ({ aspectRatio = '1/1' }: { aspectRatio?: string }) => (
    <div className="relative w-full animate-pulse" style={{ aspectRatio }}>
        <Skeleton className="absolute inset-0 rounded-2xl" />
    </div>
);

// Text Line Skeleton
export const TextSkeleton = ({ lines = 3, className = '' }: { lines?: number; className?: string }) => (
    <div className={`space-y-2 animate-pulse ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
            <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} />
        ))}
    </div>
);

// Dashboard Stats Skeleton
export const DashboardStatsSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
            <StatsCardSkeleton key={i} />
        ))}
    </div>
);

// Product Grid Skeleton
export const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
        ))}
    </div>
);

// Search Result Skeleton
export const SearchResultSkeleton = () => (
    <div className="space-y-3 p-4">
        {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-4 p-3 animate-pulse">
                <Skeleton className="w-14 h-14 rounded-xl" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16" />
            </div>
        ))}
    </div>
);

// Cart Item Skeleton
export const CartItemSkeleton = () => (
    <div className="bg-white rounded-[2rem] p-6 shadow-lg animate-pulse">
        <div className="flex gap-6">
            <Skeleton className="w-24 h-24 rounded-2xl" />
            <div className="flex-1 space-y-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
                <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-10 w-28 rounded-xl" />
                    <Skeleton className="h-7 w-20" />
                </div>
            </div>
        </div>
    </div>
);

// Full Page Loading Skeleton
export const PageLoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-b from-loja-beige via-white to-loja-beige/30 pt-28 px-4">
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-10 animate-pulse">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>
            <DashboardStatsSkeleton />
            <div className="mt-10">
                <ProductGridSkeleton count={6} />
            </div>
        </div>
    </div>
);

// Inline Loading Spinner
export const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4'
    };

    return (
        <div className={`${sizeClasses[size]} border-loja-terracotta/20 border-t-loja-terracotta rounded-full animate-spin`} />
    );
};

// Loading Overlay
export const LoadingOverlay = ({ message = 'Cargando...' }: { message?: string }) => (
    <div className="fixed inset-0 z-[200] bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center">
        <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-loja-gold rounded-lg animate-bounce" />
        </div>
        <p className="mt-6 text-loja-dark font-bold text-lg">{message}</p>
        <p className="text-gray-400 text-sm font-medium">Por favor espera un momento</p>
    </div>
);

export default Skeleton;
