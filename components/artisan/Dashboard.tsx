'use client';

import React from 'react';
import { DollarSign, Package, Eye, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Ventas Totales" 
        value="$1,245.00" 
        change="+12%" 
        icon={<DollarSign size={24} className="text-white" />} 
        color="bg-green-500" 
      />
      <StatCard 
        title="Pedidos Pendientes" 
        value="8" 
        change="-2" 
        icon={<Package size={24} className="text-white" />} 
        color="bg-orange-500" 
      />
      <StatCard 
        title="Vistas de Productos" 
        value="3,402" 
        change="+24%" 
        icon={<Eye size={24} className="text-white" />} 
        color="bg-blue-500" 
      />
      <StatCard 
        title="Tasa de Conversión" 
        value="3.2%" 
        change="+0.4%" 
        icon={<TrendingUp size={24} className="text-white" />} 
        color="bg-purple-500" 
      />
    </div>
  );
}

function StatCard({ title, value, change, icon, color }: { title: string, value: string, change: string, icon: React.ReactNode, color: string }) {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'} flex items-center mt-2`}>
          {change} <span className="text-gray-400 ml-1">vs mes anterior</span>
        </span>
      </div>
      <div className={`${color} p-3 rounded-lg shadow-md`}>
        {icon}
      </div>
    </div>
  );
}
