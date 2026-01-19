import React from 'react';
import Navbar from '@/components/buyer/Navbar';

export default function HistoriaPage() {
  return (
    <div className="min-h-screen bg-loja-beige">
       <Navbar />
       <div className="max-w-4xl mx-auto px-4 py-12 pt-32">
          <h1 className="text-4xl md:text-5xl font-bold text-loja-dark mb-6">Nuestra Historia</h1>
          
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              <strong className="text-loja-terracotta">Origen Loja</strong> nació de una conversación en un pequeño taller de Saraguro, entre el olor a lana teñida y el sonido rítmico del telar. Nos dimos cuenta de que las historias detrás de cada objeto eran tan valiosas como los objetos mismos.
            </p>
            
            <h2 className="text-2xl font-bold text-loja-dark pt-4">La Misión</h2>
            <p>
              Nuestra misión es simple pero poderosa: <span className="italic">conectar el talento ancestral de los artesanos lojanos con el mundo digital, sin perder la esencia humana.</span> Queremos que cuando compres una taza, sepas quién moldeó el barro. Cuando uses un poncho, conozcas las manos que lo tejieron.
            </p>

            <div className="my-8 border-l-4 border-loja-blue pl-6 italic text-gray-600">
               "No vendemos productos, compartimos herencia. Cada pieza lleva consigo el alma de Loja, sus montañas, sus valles y su gente trabajadora."
            </div>

            <h2 className="text-2xl font-bold text-loja-dark pt-4">El Sello Digital</h2>
            <p>
              Creamos el Sello "Origen Loja" para garantizar tres cosas:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-loja-dark">Autenticidad:</strong> Hecho en Loja por manos lojanas.</li>
              <li><strong className="text-loja-dark">Comercio Justo:</strong> El artesano recibe el pago que merece por su arte.</li>
              <li><strong className="text-loja-dark">Sostenibilidad:</strong> Procesos respetuosos con nuestra Pacha Mama.</li>
            </ul>
          </div>
       </div>
    </div>
  );
}
