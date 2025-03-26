"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const EditAdmin = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    lugarNacimiento: "",
    nuip: "",
    genero: "",
    correo: "",
    direccion: "",
    usuario: "",
    contraseña: "",
  });

  const handleEdit = () => {
    setShowConfirm(false);
    setMessage("Administrador editado correctamente");
    setTimeout(() => setMessage(null), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="flex w-full max-w-5xl mx-auto p-6 justify-center">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Sección Izquierda */}
        <div className="flex flex-col items-center">
          <h2 className="mt-10 text-xl font-bold italic text-center">EDITAR</h2>
          <h2 className="mb-8 text-xl font-bold italic text-center">ADMINISTRADOR</h2>
          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full">
            <span className="justify-center text-gray-500 text-6xl">/</span>
          </div>
        </div>

        {/* Separador */}
        <div className="hidden md:block w-px bg-gray-300 h-full"></div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(formData).map((field, index) => (
            <div key={index} className="space-y-3">
              <label className="block text-sm font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "fechaNacimiento" ? "date" : field === "correo" ? "email" : field === "contraseña" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="border border-gray-400 border-solid rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          ))}

          {/* Botones */}
          <div className="col-span-full flex flex-col gap-2 mt-4">
            <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => setShowConfirm(true)}>
              EDITAR ADMINISTRADOR
            </button>
            <button type="button" className="w-full bg-blue-500 text-white py-2 rounded-md transition-transform duration-300 transform hover:scale-105 cursor-pointer">
              CANCELAR
            </button>
          </div>
        </form>
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-80 text-center border z-50">
          <p className="text-lg font-semibold">¿Deseas continuar con los cambios?</p>
          <div className="mt-4 flex justify-center space-x-4">
            <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm" onClick={() => setShowConfirm(false)}>
              Cancelar
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm" onClick={handleEdit}>
              Sí, editar
            </button>
          </div>
        </div>
      )}

      {/* Notificación emergente */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-orange-500 text-white p-6 rounded-lg shadow-lg text-center text-sm z-50 flex items-center justify-between"
        >
          <span className="flex-1 text-center">{message}</span>
          <XCircle size={20} className="cursor-pointer hover:text-gray-200" onClick={() => setMessage(null)} />
        </motion.div>
      )}
    </div>
  );
};

export default EditAdmin;