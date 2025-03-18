import { Mail, Lock } from "lucide-react";
import Image from "next/image";

const Login = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Sección izquierda con beneficios */}
            <div className="w-full md:w-1/2 bg-[#3C88A3] flex flex-col items-center justify-center p-6 md:p-10 text-white">
                <Image src="/images/icono.png" alt="Logo" width={120} height={120} className="md:w-[150px] md:h-[150px]" />
                <div className="border border-orange-400 p-4 md:p-6 rounded-md mt-4 md:mt-6 text-center md:text-left">
                    <h2 className="text-lg font-semibold">Beneficios de comprar en <span className="text-orange-400">PaperTrail.com</span></h2>
                    <div className="mt-4 space-y-2 md:space-y-3">
                        <p className="flex items-center justify-center md:justify-start"><span className="mr-2">💳</span> Múltiples medios de pago</p>
                        <p className="flex items-center justify-center md:justify-start"><span className="mr-2">✅</span> Garantía de devolución</p>
                        <p className="flex items-center justify-center md:justify-start"><span className="mr-2">🚚</span> Envíos a todo Colombia</p>
                    </div>
                </div>
            </div>

            {/* Sección derecha con formulario de login */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-10">
                <h1 className="text-2xl md:text-3xl font-semibold text-orange-400 mb-4 md:mb-6 text-center">TE DAMOS LA BIENVENIDA</h1>
                
                <div className="w-full max-w-xs md:max-w-sm">
                    <label className="block text-sm font-medium">Email</label>
                    <div className="flex items-center border rounded-md p-2 mt-1">
                        <Mail size={18} className="text-gray-500 mr-2" />
                        <input type="email" className="flex-1 outline-none text-sm md:text-base" placeholder="Tu email" />
                    </div>

                    <label className="block text-sm font-medium mt-4">Contraseña</label>
                    <div className="flex items-center border rounded-md p-2 mt-1">
                        <Lock size={18} className="text-gray-500 mr-2" />
                        <input type="password" className="flex-1 outline-none text-sm md:text-base" placeholder="Tu contraseña" />
                    </div>

                    <button className="w-full bg-orange-400 text-white py-2 rounded-md mt-4">Ingresar</button>
                    <p className="text-xs md:text-sm text-gray-600 text-center mt-2 cursor-pointer">¿Olvidaste tu contraseña?</p>
                    <p className="text-xs md:text-sm text-gray-600 text-center mt-4">¿No tienes cuenta? <span className="text-blue-500 cursor-pointer">REGÍSTRATE</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;