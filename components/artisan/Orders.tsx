'use client';

import React from 'react';
import { orders } from '@/lib/data';
import { Truck, CheckCircle, Clock, Printer } from 'lucide-react';

export default function Orders() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">Pedidos Recientes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">ID Pedido</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                <td className="px-6 py-4 text-gray-500">{order.date}</td>
                <td className="px-6 py-4 font-bold text-gray-800">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Entregado' ? 'bg-green-100 text-green-700' :
                    order.status === 'Listo para envío' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status === 'Entregado' && <CheckCircle size={12} />}
                    {order.status === 'Listo para envío' && <Truck size={12} />}
                    {order.status === 'Pendiente' && <Clock size={12} />}
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-2 text-xs font-medium text-loja-blue border border-loja-blue/30 px-3 py-1.5 rounded hover:bg-loja-blue hover:text-white transition-colors">
                    <Printer size={14} />
                    Guía de Envío
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
