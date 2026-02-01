'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { Settings, Home, Bell, User, Store, CreditCard, Bell as BellIcon, Shield, Globe, Check, Camera, Save, Loader2 } from 'lucide-react';

export default function ConfiguracionPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('perfil');
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    React.useEffect(() => {
        if (!isAuthenticated) router.push('/login');
        else if (user?.type !== 'artisan') router.push('/');
    }, [isAuthenticated, user, router]);

    if (!user || user.type !== 'artisan') return null;

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const tabs = [
        { id: 'perfil', label: 'Mi Perfil', icon: User },
        { id: 'tienda', label: 'Mi Tienda', icon: Store },
        { id: 'pagos', label: 'Pagos', icon: CreditCard },
        { id: 'notificaciones', label: 'Notificaciones', icon: BellIcon },
        { id: 'seguridad', label: 'Seguridad', icon: Shield },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-xl flex items-center justify-center text-white font-bold shadow-md">LN</div>
                            </Link>
                            <div className="hidden sm:block">
                                <h1 className="font-bold text-gray-900">Configuración</h1>
                                <p className="text-xs text-gray-500">Portal Artesano</p>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-1">
                            <Link href="/panel" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Dashboard</Link>
                            <Link href="/panel/productos" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Productos</Link>
                            <Link href="/panel/pedidos" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Pedidos</Link>
                            <Link href="/panel/clientes" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors">Clientes</Link>
                        </nav>
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                                <Bell size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <Link href="/" className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors"><Home size={16} />Ver Tienda</Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 animate-slide-in-up">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Configuración</h1>
                    <p className="text-gray-500 mt-1">Personaliza tu perfil y preferencias</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-4 shadow-sm">
                            <nav className="space-y-1">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${activeTab === tab.id ? 'bg-loja-terracotta/10 text-loja-terracotta' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <tab.icon size={18} />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        {activeTab === 'perfil' && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Información Personal</h2>

                                <div className="flex items-center gap-6 mb-8">
                                    <div className="relative">
                                        <div className="w-24 h-24 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                                            {user.avatar}
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-loja-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-loja-terracotta transition-colors">
                                            <Camera size={16} />
                                        </button>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{user.name}</h3>
                                        <p className="text-sm text-gray-500">Artesano Verificado</p>
                                        <button className="mt-2 text-sm text-loja-terracotta font-medium hover:underline">Cambiar foto</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                                        <input type="text" defaultValue={user.name} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input type="email" defaultValue={user.email} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                                        <input type="tel" defaultValue="+593 99 123 4567" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                                        <input type="text" defaultValue="Loja, Ecuador" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none" />
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                                    <textarea rows={4} defaultValue="Tejedora de tercera generación, preservando técnicas ancestrales Saraguro..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none resize-none"></textarea>
                                </div>

                                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-3 bg-loja-terracotta text-white rounded-xl font-bold hover:bg-loja-dark transition-all disabled:opacity-70">
                                    {isSaving ? (<><Loader2 size={18} className="animate-spin" />Guardando...</>) : saved ? (<><Check size={18} />¡Guardado!</>) : (<><Save size={18} />Guardar Cambios</>)}
                                </button>
                            </div>
                        )}

                        {activeTab === 'tienda' && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Configuración de Tienda</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Tienda</label>
                                        <input type="text" defaultValue="Artesanías María Saraguro" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
                                        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta outline-none">
                                            <option>Textiles Tradicionales</option>
                                            <option>Cerámica</option>
                                            <option>Joyería</option>
                                            <option>Café</option>
                                            <option>Madera</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción de la Tienda</label>
                                        <textarea rows={4} defaultValue="Creaciones textiles únicas utilizando técnicas ancestrales..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none resize-none"></textarea>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <p className="font-medium text-gray-900">Tienda Activa</p>
                                            <p className="text-sm text-gray-500">Tu tienda está visible para los compradores</p>
                                        </div>
                                        <div className="w-12 h-6 bg-loja-green rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'pagos' && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Métodos de Pago</h2>
                                <div className="space-y-4">
                                    <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                                            <div>
                                                <p className="font-medium text-gray-900">**** **** **** 4242</p>
                                                <p className="text-sm text-gray-500">Expira 12/28</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Principal</span>
                                    </div>
                                    <button className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-loja-terracotta hover:text-loja-terracotta transition-colors font-medium">
                                        + Añadir Método de Pago
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notificaciones' && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Preferencias de Notificaciones</h2>
                                <div className="space-y-4">
                                    {[
                                        { title: 'Nuevos pedidos', desc: 'Recibe alertas cuando llegue un nuevo pedido' },
                                        { title: 'Mensajes de clientes', desc: 'Notificaciones de mensajes entrantes' },
                                        { title: 'Actualizaciones de productos', desc: 'Alertas sobre stock bajo' },
                                        { title: 'Promociones', desc: 'Ofertas especiales y oportunidades' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <div>
                                                <p className="font-medium text-gray-900">{item.title}</p>
                                                <p className="text-sm text-gray-500">{item.desc}</p>
                                            </div>
                                            <div className={`w-12 h-6 ${i < 2 ? 'bg-loja-green' : 'bg-gray-300'} rounded-full relative cursor-pointer`}>
                                                <div className={`absolute ${i < 2 ? 'right-1' : 'left-1'} top-1 w-4 h-4 bg-white rounded-full shadow`}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'seguridad' && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Seguridad de la Cuenta</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña Actual</label>
                                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
                                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nueva Contraseña</label>
                                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-loja-terracotta focus:ring-2 focus:ring-loja-terracotta/20 outline-none" />
                                    </div>
                                    <button className="px-6 py-3 bg-loja-dark text-white rounded-xl font-bold hover:bg-loja-terracotta transition-all">
                                        Actualizar Contraseña
                                    </button>

                                    <div className="pt-6 border-t border-gray-100">
                                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <Shield size={24} className="text-loja-green" />
                                                <div>
                                                    <p className="font-medium text-gray-900">Verificación en dos pasos</p>
                                                    <p className="text-sm text-gray-500">Añade una capa extra de seguridad</p>
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-loja-green text-white rounded-xl font-medium text-sm hover:bg-loja-green/90 transition-colors">Activar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
