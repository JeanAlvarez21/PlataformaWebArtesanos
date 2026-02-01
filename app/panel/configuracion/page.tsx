'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import PanelLayout from '@/components/panel/PanelLayout';
import { Settings, User, Store, CreditCard, Bell as BellIcon, Shield, Camera, Save, Loader2, Check, Sparkles } from 'lucide-react';

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
        { id: 'notificaciones', label: 'Alertas', icon: BellIcon },
        { id: 'seguridad', label: 'Seguridad', icon: Shield },
    ];

    return (
        <PanelLayout>
            {/* Page Header */}
            <div className="mb-10 animate-slide-in-up">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <Settings size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-loja-dark">Configuración</h1>
                        <p className="text-gray-500 font-medium">Personaliza tu perfil y preferencias</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-[2rem] p-4 shadow-lg border border-gray-100">
                        <nav className="space-y-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === tab.id
                                        ? 'bg-loja-terracotta/10 text-loja-terracotta'
                                        : 'text-gray-400 hover:bg-gray-50 hover:text-loja-dark'
                                        }`}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-gradient-to-br from-loja-dark to-loja-terracotta rounded-[2rem] p-6 text-white mt-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 flex">
                            <div className="flex-1 bg-yellow-400" />
                            <div className="flex-1 bg-blue-600" />
                            <div className="flex-1 bg-red-600" />
                        </div>
                        <Sparkles size={24} className="text-loja-gold mb-3" />
                        <h3 className="font-black mb-1">¿Necesitas ayuda?</h3>
                        <p className="text-white/70 text-xs mb-4">Nuestro equipo está disponible 24/7.</p>
                        <button className="bg-white text-loja-dark px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest w-full hover:bg-loja-gold transition-colors">
                            Contactar Soporte
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    {activeTab === 'perfil' && (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100 animate-fade-in">
                            <h2 className="text-xl font-black text-loja-dark mb-8">Información Personal</h2>

                            <div className="flex items-center gap-6 mb-10">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-gradient-to-br from-loja-terracotta to-loja-dark rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
                                        {user.avatar}
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-loja-dark text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-loja-terracotta transition-colors">
                                        <Camera size={18} />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="font-black text-loja-dark text-lg">{user.name}</h3>
                                    <p className="text-[10px] font-bold text-loja-terracotta uppercase tracking-widest">Artesano Verificado</p>
                                    <button className="mt-2 text-xs text-gray-400 font-bold hover:text-loja-terracotta transition-colors">Cambiar foto</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre Completo</label>
                                    <input type="text" defaultValue={user.name} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-bold transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</label>
                                    <input type="email" defaultValue={user.email} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-bold transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Teléfono</label>
                                    <input type="tel" defaultValue="+593 99 123 4567" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-bold transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ubicación</label>
                                    <input type="text" defaultValue="Loja, Ecuador" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-bold transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2 mb-8">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Biografía</label>
                                <textarea rows={4} defaultValue="Tejedora de tercera generación, preservando técnicas ancestrales Saraguro..." className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta focus:ring-4 focus:ring-loja-terracotta/10 outline-none font-medium resize-none transition-all" />
                            </div>

                            <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-8 py-4 bg-loja-dark text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-loja-terracotta transition-all disabled:opacity-70 shadow-lg">
                                {isSaving ? (<><Loader2 size={18} className="animate-spin" />Guardando...</>) : saved ? (<><Check size={18} />¡Guardado!</>) : (<><Save size={18} />Guardar Cambios</>)}
                            </button>
                        </div>
                    )}

                    {activeTab === 'tienda' && (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100 animate-fade-in">
                            <h2 className="text-xl font-black text-loja-dark mb-8">Configuración de Tienda</h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre de la Tienda</label>
                                    <input type="text" defaultValue="Artesanías María Saraguro" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none font-bold transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Especialidad</label>
                                    <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none font-bold">
                                        <option>Textiles Tradicionales</option>
                                        <option>Cerámica</option>
                                        <option>Joyería</option>
                                        <option>Café</option>
                                        <option>Madera</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Descripción de la Tienda</label>
                                    <textarea rows={4} defaultValue="Creaciones textiles únicas utilizando técnicas ancestrales..." className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none font-medium resize-none transition-all" />
                                </div>
                                <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl">
                                    <div>
                                        <p className="font-bold text-loja-dark">Tienda Activa</p>
                                        <p className="text-xs text-gray-400">Tu tienda está visible para los compradores</p>
                                    </div>
                                    <div className="w-14 h-7 bg-green-500 rounded-full relative cursor-pointer shadow-inner">
                                        <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pagos' && (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100 animate-fade-in">
                            <h2 className="text-xl font-black text-loja-dark mb-8">Métodos de Pago</h2>
                            <div className="space-y-4">
                                <div className="p-5 border border-gray-100 rounded-2xl flex items-center justify-between bg-gray-50/50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-black">VISA</div>
                                        <div>
                                            <p className="font-bold text-loja-dark">**** **** **** 4242</p>
                                            <p className="text-xs text-gray-400">Expira 12/28</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1.5 bg-green-50 text-green-600 text-[10px] font-black rounded-full uppercase tracking-widest">Principal</span>
                                </div>
                                <button className="w-full p-5 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-loja-terracotta hover:text-loja-terracotta transition-colors font-bold">
                                    + Añadir Método de Pago
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notificaciones' && (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100 animate-fade-in">
                            <h2 className="text-xl font-black text-loja-dark mb-8">Preferencias de Notificaciones</h2>
                            <div className="space-y-4">
                                {[
                                    { title: 'Nuevos pedidos', desc: 'Recibe alertas cuando llegue un nuevo pedido', active: true },
                                    { title: 'Mensajes de clientes', desc: 'Notificaciones de mensajes entrantes', active: true },
                                    { title: 'Actualizaciones de productos', desc: 'Alertas sobre stock bajo', active: false },
                                    { title: 'Promociones', desc: 'Ofertas especiales y oportunidades', active: false },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl">
                                        <div>
                                            <p className="font-bold text-loja-dark">{item.title}</p>
                                            <p className="text-xs text-gray-400">{item.desc}</p>
                                        </div>
                                        <div className={`w-14 h-7 ${item.active ? 'bg-green-500' : 'bg-gray-300'} rounded-full relative cursor-pointer shadow-inner`}>
                                            <div className={`absolute ${item.active ? 'right-1' : 'left-1'} top-1 w-5 h-5 bg-white rounded-full shadow transition-all`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'seguridad' && (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100 animate-fade-in">
                            <h2 className="text-xl font-black text-loja-dark mb-8">Seguridad de la Cuenta</h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contraseña Actual</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none font-bold transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nueva Contraseña</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none font-bold transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confirmar Nueva Contraseña</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-loja-terracotta outline-none font-bold transition-all" />
                                </div>
                                <button className="px-8 py-4 bg-loja-dark text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-loja-terracotta transition-all shadow-lg">
                                    Actualizar Contraseña
                                </button>

                                <div className="pt-8 border-t border-gray-100">
                                    <div className="flex items-center justify-between p-5 bg-green-50 rounded-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                                <Shield size={24} className="text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-loja-dark">Verificación en dos pasos</p>
                                                <p className="text-xs text-gray-500">Añade una capa extra de seguridad</p>
                                            </div>
                                        </div>
                                        <button className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-green-700 transition-colors">Activar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PanelLayout>
    );
}
