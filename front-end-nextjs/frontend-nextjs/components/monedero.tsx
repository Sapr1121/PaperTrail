import { FaUserCircle } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

const Wallet = () => {
  return (
    <div className="w-full bg-white shadow-lg overflow-hidden">
      {/* Encabezado con onda */}
      <div className="relative bg-orange-600 text-white p-6 pb-16">
        <div className="flex items-center">
          <FaUserCircle className="text-6xl mr-3" />
          <div>
            <h2 className="text-xl font-bold">Hola,</h2>
            <h2 className="text-xl font-bold">Usuario</h2>
          </div>
        </div>
        <div className="absolute top-6 right-6 text-right">
          <h3 className="text-lg">Monedero</h3>
          <p className="text-2xl font-bold">$100.000.00</p>
        </div>
        {/* Onda inferior */}
        <svg className="absolute bottom-0 left-0 w-full h-8 text-blue-500" viewBox="0 0 1440 320">
          <path fill="currentColor" d="M0,96L80,80C160,64,320,32,480,42.7C640,53,800,107,960,122.7C1120,139,1280,117,1360,106.7L1440,96V320H0Z"></path>
        </svg>
      </div>

      {/* Contenedor de tarjetas con ancho fijo */}
      <div className="w-full flex flex-wrap items-start px-6 gap-6 py-6 justify-center lg:justify-start">

        {/* Tarjeta Débito */}
        <div className="bg-blue-600 text-white p-4 rounded-lg relative w-70 max-w-xs">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Débito</h3>
            <div className="flex gap-2">
              <MdEdit className="cursor-pointer" />
              <MdDelete className="cursor-pointer" />
            </div>
          </div>
          <p className="mt-4 text-lg">XXX.XXX.XXX.XXX</p>
          <div className="flex justify-between items-center mt-4">
            <p>Monto: $20.000</p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="w-8" />
          </div>
        </div>

        {/* Tarjeta Crédito */}
        <div className="bg-red-600 text-white p-4 rounded-lg relative w-70 max-w-xs">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Crédito</h3>
            <div className="flex gap-2">
              <MdEdit className="cursor-pointer" />
              <MdDelete className="cursor-pointer" />
            </div>
          </div>
          <p className="mt-4 text-lg">XXX.XXX.XXX.XXX</p>
          <div className="flex justify-between items-center mt-4">
            <p>Monto: $80.000</p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxlxmaeHpkOZde33aU6LX6ejwcKb7jGVPV5w&s" alt="Mastercard" className="w-8" />
          </div>
        </div>
      </div>

      {/* Botón agregar tarjeta */}
      <div className="px-6 pb-6 flex justify-end">
        <button className="bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md">
          Agregar Tarjeta
        </button>
      </div>
    </div>
  );
};

export default Wallet;
