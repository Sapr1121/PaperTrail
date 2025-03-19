"use client";
import { useState } from "react";

const GestionRoot = () => {
  const [admins, setAdmins] = useState([
    { id: 1, name: "ADMIN 1" },
    { id: 2, name: "ADMIN 2" },
    { id: 3, name: "ADMIN 3" },
  ]);

  const handleDelete = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Título */}
      <h1 className="text-2xl font-bold text-center mb-6">GESTION ROOT</h1>

      {/* Sección de Administradores */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-semibold">Administradores</p>
          <p className="text-sm text-gray-600">Cantidad: {admins.length}</p>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">
          Crear administrador
        </button>
      </div>

      {/* Lista de Administradores */}
      <div className="space-y-4">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="flex items-center bg-white p-4 rounded-lg shadow-md border"
          >
            {/* Imagen */}
            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-400">📷</span>
            </div>

            {/* Nombre del administrador */}
            <div className="flex-1 ml-4">
              <p className="font-semibold">{admin.name}</p>
            </div>

            {/* Botones */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleDelete(admin.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
              >
                ELIMINAR
              </button>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
                EDITAR
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionRoot;
