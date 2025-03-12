import { createUser } from './strapi.js'; // Importar la función para crear usuarios

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector('.formulario');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    const restContraForm = document.querySelector('.rest-contra');
    const loginLink = document.querySelector('.login-link');
    const registrarseLink = document.querySelector('.registrarse-link');
    const recuperarLink = document.querySelector('.recuperar-link');
    const nuevoUsuario = document.querySelector('.nuevousuario');
    const restablecer = document.querySelector('.restablecer');

    // Función para ajustar el tamaño del formulario
    function ajustarTamañoFormulario(formularioActivo) {
        const alturaFormulario = formularioActivo.offsetHeight;
        const anchoFormulario = formularioActivo.offsetWidth;
        formulario.style.height = `${alturaFormulario}px`;
        formulario.style.maxWidth = `${anchoFormulario}px`;
    }

    registrarseLink.addEventListener('click', function (e) {
        e.preventDefault();
        setTimeout(() => {
            formulario.style.transform = 'translateX(0%)'; // Mover a la derecha
            nuevoUsuario.classList.add('active-registro');
            restablecer.classList.remove('active-restablecer');
            loginForm.classList.add('hidden');
            ajustarTamañoFormulario(registerForm); // Ajustar tamaño para el formulario de registro
            document.documentElement.scrollTop = registerForm.offsetTop;
            // Esperar un poco antes de hacer scroll
            setTimeout(() => {
                window.scrollTo({ top: registerForm.offsetTop, behavior: 'smooth' });
            }, 300); // Se da un pequeño retraso para que el formulario se renderice antes del scroll
        }, 10); // Pequeño retraso para permitir el renderizado
    });

    // Evento para el formulario de restablecer contraseña
    recuperarLink.addEventListener('click', function (e) {
        e.preventDefault();
        setTimeout(() => {
            formulario.style.transform = 'translateX(0%)'; // Mover a la izquierda
            restablecer.classList.add('active-restablecer');
            nuevoUsuario.classList.remove('active-registro');
            loginForm.classList.add('hidden');
            ajustarTamañoFormulario(restContraForm); // Ajustar tamaño para el formulario de restablecimiento
        }, 10); // Pequeño retraso para permitir el renderizado
    });

    // Evento para volver al inicio de sesión desde el registro
    const volverInicioDesdeRegistro = document.querySelector('.register-form .login-link');
    volverInicioDesdeRegistro.addEventListener('click', function (e) {
        e.preventDefault();
        setTimeout(() => {
            formulario.style.transform = 'translateX(0)'; // Volver al centro
            nuevoUsuario.classList.remove('active-registro');
            restablecer.classList.remove('active-restablecer');
            loginForm.classList.remove('hidden');
            ajustarTamañoFormulario(loginForm); // Ajustar tamaño para el formulario de inicio de sesión
        }, 10); // Pequeño retraso para permitir el renderizado
    });

    // Evento para volver al inicio de sesión desde restablecer
    const volverInicioDesdeRestablecer = document.querySelector('.rest-contra .login-link');
    volverInicioDesdeRestablecer.addEventListener('click', function (e) {
        e.preventDefault();
        setTimeout(() => {
            formulario.style.transform = 'translateX(0)'; // Volver al centro
            restablecer.classList.remove('active-restablecer');
            nuevoUsuario.classList.remove('active-registro');
            loginForm.classList.remove('hidden');
            ajustarTamañoFormulario(loginForm); // Ajustar tamaño para el formulario de inicio de sesión
        }, 10); // Pequeño retraso para permitir el renderizado
    });

    // Evento para capturar y enviar los datos del formulario de registro
    const btnRegistrarse = document.querySelector('.register-form .btn');
    if (btnRegistrarse) {
        btnRegistrarse.addEventListener('click', async function (e) {
            e.preventDefault();

            // Capturar los valores de los inputs
            const userData = {
                Nombre: document.querySelector('.register-form input[name="nombreUsuario"]')?.value,
                Apellido: document.querySelector('.register-form input[name="apellidoUsuario"]')?.value,
                cedula: document.querySelector('.register-form input[name="Cedula"]')?.value,
                genero: document.querySelector('.register-form .seleccionG .opciones')?.value,
                fecha_nacimiento: document.querySelector('.register-form input[type="date"]')?.value,
                lugar_nacimiento: document.querySelector('.register-form input[placeholder="Lugar de nacimiento"]')?.value,
                email: document.querySelector('.register-form input[type="email"]')?.value,
                username: document.querySelector('.register-form input[placeholder="Usuario"]')?.value,
                clave: document.querySelector('.register-form input[type="password"][placeholder="Contraseña"]')?.value,
                temaL_1: document.querySelectorAll('.register-form .seleccionG .opciones')[1]?.value,
                temaL_2: document.querySelectorAll('.register-form .seleccionG .opciones')[2]?.value,
            };

            // Mostrar los valores en la consola (para depuración)
            console.log('Datos del usuario:', userData);

            try {
                // Enviar los datos a Strapi
                const response = await createUser(userData);
                console.log('Usuario creado en Strapi:', response);

                // Mostrar un mensaje de éxito al usuario
                alert('¡Registro exitoso!');
            } catch (error) {
                console.error('Error al registrar el usuario:', error);

                // Mostrar un mensaje de error al usuario
                alert('Hubo un error al registrar el usuario. Por favor, intenta de nuevo.');
            }
        });
    }
});