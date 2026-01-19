'use client';

import React, { useState } from 'react';
import { Upload, Plus, Trash2, X } from 'lucide-react';

export default function Inventory() {
  const [variations, setVariations] = useState<{name: string, stock: number}[]>([]);
  const [newVarName, setNewVarName] = useState('');
  const [newVarStock, setNewVarStock] = useState('');
  const [manualStock, setManualStock] = useState('');

  const addVariation = () => {
    if (newVarName && newVarStock) {
      setVariations([...variations, { name: newVarName, stock: parseInt(newVarStock) }]);
      setNewVarName('');
      setNewVarStock('');
    }
  };

  const removeVariation = (index: number) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Gestión de Inventario</h3>
        <button className="flex items-center gap-2 bg-loja-dark text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          <Plus size={16} />
          Nuevo Producto
        </button>
      </div>

      <form className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nombre del Producto</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-loja-terracotta focus:border-transparent outline-none transition-all" placeholder="Ej. Poncho Saraguro" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Precio ($)</label>
            <input type="number" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-loja-terracotta focus:border-transparent outline-none transition-all" placeholder="0.00" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
             <label className="text-sm font-medium text-gray-700">Categoría</label>
             <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-loja-terracotta focus:border-transparent outline-none transition-all">
               <option>Textiles</option>
               <option>Cerámica</option>
               <option>Café</option>
               <option>Joyería</option>
             </select>
          </div>
          
          {/* Base stock if no variations, otherwise disabled/calculated */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Stock General</label>
            <input 
              type="number" 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-loja-terracotta focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:text-gray-500" 
              placeholder="Cant." 
              disabled={variations.length > 0}
              value={variations.length > 0 ? variations.reduce((acc, v) => acc + v.stock, 0) : manualStock}
              onChange={(e) => setManualStock(e.target.value)}
            />
          </div>
        </div>

        {/* Variations Section */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
           <label className="text-sm font-bold text-gray-700 block mb-3">Variantes (Color, Tamaño, Tipo)</label>
           
           <div className="flex gap-2 mb-4">
             <input 
               type="text" 
               placeholder="Nombre (ej. Rojo, Grande)" 
               className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm focus:ring-1 focus:ring-loja-blue outline-none"
               value={newVarName}
               onChange={(e) => setNewVarName(e.target.value)}
             />
             <input 
               type="number" 
               placeholder="Stock" 
               className="w-24 px-3 py-2 rounded border border-gray-300 text-sm focus:ring-1 focus:ring-loja-blue outline-none"
               value={newVarStock}
               onChange={(e) => setNewVarStock(e.target.value)}
             />
             <button 
               type="button" 
               onClick={addVariation}
               className="bg-loja-blue text-white p-2 rounded hover:bg-loja-dark transition-colors"
             >
               <Plus size={18} />
             </button>
           </div>

           {variations.length > 0 && (
             <div className="space-y-2">
               {variations.map((v, idx) => (
                 <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-200 shadow-sm text-sm">
                   <span className="font-medium text-gray-800">{v.name}</span>
                   <div className="flex items-center gap-3">
                     <span className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-600">Stock: {v.stock}</span>
                     <button type="button" onClick={() => removeVariation(idx)} className="text-red-400 hover:text-red-600">
                       <X size={14} />
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Foto del Producto</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-loja-terracotta transition-colors bg-gray-50">
            <Upload size={32} className="text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Haz clic para subir o arrastra tu imagen aquí</p>
          </div>
        </div>

        <div className="pt-4">
          <button type="button" className="w-full bg-loja-terracotta text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors shadow-lg">
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
}