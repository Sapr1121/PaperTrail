"use client";
import { X } from "lucide-react";
import { useState } from "react";


const Home = () => {
  const [showSubscribe, setShowSubscribe] = useState(true);
  
  {/*Inicio funciones boton suscripción */}
  // Maneja la transición de desvanecimiento
  const handleMouseEnter = (e) => {
    const element = e.target as HTMLElement; // Asegura que target es un HTMLElement
    element.classList.add('scale-105');
  };
  
  const handleMouseLeave = (e) => {
    const element = e.target as HTMLElement; // Asegura que target es un HTMLElement
    element.classList.remove('scale-105');
  };

  const handleClose = () => {
    // Animar el desvanecimiento antes de esconder el componente
    setShowSubscribe(false);
  };
  {/*Fin funciones boton suscripción */}
  return (
    <div className="min-h-screen bg-white">

      {/* Sección de destacados */}
      <section className="flex justify-center items-center py-8">
        <div className="bg-gray-200 w-3/4 h-32 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">[ Banner promocional ]</p>
        </div>
      </section>

      {/* Título principal */}
      <h2 className="text-center text-xl md:text-2xl font-semibold">
        ENCUENTRA TODOS TUS <span className="text-orange-500">LIBROS FAVORITOS</span>
      </h2>

      {/* Botones de categorías y novedades */}
      <div className="flex justify-center gap-4 my-4">
        <button className="bg-[#3C88A3] text-white px-4 py-2 rounded-md">📚 Categorías</button>
        <button className="bg-[#3C88A3] text-white px-4 py-2 rounded-md">✨ Novedades</button>
      </div>

      {/* Lista de libros */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6 py-6">
        {Array(8).fill(0).map((_, index) => (
          <div key={index} className="border rounded-md p-3 shadow-sm">
            <div className="bg-gray-200 h-40 rounded-md flex items-center justify-center">
              <p className="text-gray-400">[ Imagen ]</p>
            </div>
            <h3 className="text-sm font-medium mt-2">Título del libro</h3>
            <p className="text-sm font-semibold text-gray-600">$50.000</p>
            <p className="text-xs text-gray-500">Usado/Nuevo</p>
            <button className="bg-orange-500 text-white text-xs px-2 py-1 mt-2 w-full rounded-md">➕ Comprar ya</button>
          </div>
        ))}
      </div>
      <div
      className={`fixed bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 cursor-pointer transition-all duration-300 ${
        showSubscribe ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      📩 SUSCRÍBETE!!!
      <button className="cursor-pointer" onClick={handleClose}>
        <X size={18} />
      </button>
      </div>
    </div>
  );
};

export default Home;
