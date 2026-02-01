'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserType = 'buyer' | 'artisan' | null;

interface User {
    name: string;
    email: string;
    avatar: string;
    type: UserType;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (type: 'buyer' | 'artisan', email?: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BUYER_USER_CARLOS: User = {
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@gmail.com',
    avatar: 'CM',
    type: 'buyer'
};

const BUYER_USER_JEAN: User = {
    name: 'Jean Alvarez',
    email: 'jean@lojania.com',
    avatar: 'JA',
    type: 'buyer'
};

const ARTISAN_USER: User = {
    name: 'María Guamán',
    email: 'maria.guaman@artesanias.ec',
    avatar: 'MG',
    type: 'artisan'
};

const AUTH_STORAGE_KEY = 'origen-loja-auth';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load auth from localStorage on mount
    useEffect(() => {
        try {
            const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
            if (savedAuth) {
                const parsed = JSON.parse(savedAuth);
                if (parsed.email === 'jean@lojania.com') {
                    setUser(BUYER_USER_JEAN);
                } else if (parsed.type === 'buyer') {
                    setUser(BUYER_USER_CARLOS);
                } else if (parsed.type === 'artisan') {
                    setUser(ARTISAN_USER);
                }
            }
        } catch (error) {
            console.error('Error loading auth from localStorage:', error);
        }
        setIsHydrated(true);
    }, []);

    // Save auth to localStorage whenever it changes
    useEffect(() => {
        if (isHydrated) {
            try {
                if (user) {
                    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
                        type: user.type,
                        email: user.email
                    }));
                } else {
                    localStorage.removeItem(AUTH_STORAGE_KEY);
                }
            } catch (error) {
                console.error('Error saving auth to localStorage:', error);
            }
        }
    }, [user, isHydrated]);

    const login = (type: 'buyer' | 'artisan', email?: string) => {
        if (type === 'buyer') {
            if (email === 'jean@lojania.com') {
                setUser(BUYER_USER_JEAN);
            } else {
                setUser(BUYER_USER_CARLOS);
            }
        } else {
            setUser(ARTISAN_USER);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: user !== null,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
