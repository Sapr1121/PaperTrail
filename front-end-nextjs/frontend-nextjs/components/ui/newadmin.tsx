"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const NewAdmin = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(false); // Cierra el modal
    setMessage("Administrador eliminado exitosamente"); // Muestra notificación roja

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-4 relative">
      {/* Modal de confirmación sin fondo oscuro */}
      {showConfirm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-80 text-center border z-50">
          <p className="text-lg font-semibold">¿Estás seguro?</p>
          <p className="text-gray-600 text-sm mt-2">Esta acción no se puede deshacer.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm"
              onClick={() => setShowConfirm(false)}
            >
              Cancelar
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm"
              onClick={handleDelete}
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      )}

      {/* Notificación emergente después de eliminar */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-red-500 text-white p-6 rounded-lg shadow-lg text-center text-sm z-50 flex items-center justify-between"
        >
          <span className="flex-1 text-center">{message}</span>
          <XCircle
            size={20}
            className="cursor-pointer hover:text-gray-200"
            onClick={() => setMessage(null)}
          />
        </motion.div>
      )}

      {/* Tarjeta del administrador */}
      <div className="flex items-center bg-white p-4 rounded-lg shadow-md border">
        {/* Imagen */}
        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-400">📷</span>
        </div>

        {/* Nombre del administrador */}
        <div className="flex-1 ml-4">
          <p className="font-semibold">Admin</p>
        </div>

        {/* Botones */}
        <div className="flex space-x-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm transition-transform duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => setShowConfirm(true)}
          >
            ELIMINAR
          </button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm transition-transform duration-300 transform hover:scale-105 cursor-pointer"
          onClick={()=>router.push("/editadmin")}>
            EDITAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAdmin;