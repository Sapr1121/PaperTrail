import { createUser, loginUser } from './strapi.js'; // Importar funciones de Strapi
import { setupAnimations } from './animations.js'; // Importar las animaciones

document.addEventListener('DOMContentLoaded', function () {
    setupAnimations(); // Configurar las animaciones

    const toggleButtons = document.querySelectorAll('.toggle-password');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Obtener el input de contraseña asociado
            const passwordInput = button.previousElementSibling;

            // Cambiar el tipo de input entre "password" y "text"
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                button.querySelector('.eye-icon').src = '/img/eye0.png'; // Cambiar a ojo abierto
            } else {
                passwordInput.type = 'password';
                button.querySelector('.eye-icon').src = '/img/eye1.png'; // Cambiar a ojo cerrado
            }
        });
    });

    // Evento para el botón de inicio de sesión
    const btnLogin = document.querySelector('.login-form .btn');
    if (btnLogin) {
        btnLogin.addEventListener('click', async function (e) {
            e.preventDefault();
    
            // Capturar los valores de los inputs
            const email = document.querySelector('.login-form input[type="email"]')?.value;
            const password = document.querySelector('.login-form input[type="password"]')?.value;
            const messageDiv = document.querySelector('#login-message');
    
            if (!messageDiv) {
                console.error('No se encontró el elemento .login-form #login-message');
                return;
            }
    
            // Validar si los campos están vacíos
            if (!email || !password) {
                // Mostrar mensaje de error si algún campo está vacío
                messageDiv.textContent = 'Por favor, complete todos los campos.';
                messageDiv.style.color = 'red';
                messageDiv.style.display = 'block';
    
                // Ocultar el mensaje después de 5 segundos
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
                return; // Detener la ejecución si hay campos vacíos
            }
    
            try {
                // Verificar las credenciales con Strapi
                const response = await loginUser(email, password);
                console.log('Inicio de sesión exitoso:', response);
    
                // Mostrar un mensaje de éxito al usuario
                messageDiv.textContent = '¡Inicio de sesión exitoso!';
                messageDiv.style.color = 'green';
                messageDiv.style.display = 'block';
    
                // Ocultar el mensaje después de 5 segundos
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
    
                // Redirigir al usuario después de un inicio de sesión exitoso
                setTimeout(() => {
                    window.location.href = '/../home/homepage.html'; // Cambia esta URL según tu necesidad
                }, 3000);
            } catch (error) {
                console.error('Error al iniciar sesión:', error.message);
    
                // Mostrar un mensaje de error al usuario
                if (error.message.includes('Invalid identifier or password')) {
                    messageDiv.textContent = 'Correo o contraseña incorrectos.';
                } else {
                    messageDiv.textContent = 'Error al iniciar sesión: Email o contraseña incorrectos.';
                }
                messageDiv.style.color = 'red';
                messageDiv.style.display = 'block';
    
                // Ocultar el mensaje después de 5 segundos
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }
        });
    }

    
    // Evento para el botón de registro
    const btnRegistrarse = document.querySelector('.register-form .btn');
    if (btnRegistrarse) {
        btnRegistrarse.addEventListener('click', async function (e) {
            e.preventDefault();

            // Capturar los valores de los inputs
            const userData = {
                Nombre: document.querySelector('.register-form input[name="nombreUsuario"]')?.value,
                Apellido: document.querySelector('.register-form input[name="apellidoUsuario"]')?.value,
                cedula: document.querySelector('.register-form input[name="Cedula"]')?.value,
                genero: document.querySelector('.register-form select[name="genero"]')?.value,
                fecha_nacimiento: document.querySelector('.register-form input[type="date"]')?.value,
                lugar_nacimiento: document.querySelector('.register-form input[placeholder="Lugar de nacimiento"]')?.value,
                email: document.querySelector('.register-form input[type="email"]')?.value,
                username: document.querySelector('.register-form input[placeholder="Usuario"]')?.value,
                clave: document.getElementById('contrasena')?.value,
                temaL_1: document.querySelector('.register-form select[name="tema1"]')?.value,
                temaL_2: document.querySelector('.register-form select[name="tema2"]')?.value,
            };

            // Verifica si algún campo está vacío
            let campoVacio = false;
            for (const key in userData) {
                if (!userData[key]) {
                    console.error(`El campo ${key} está vacío.`);
                    campoVacio = true;

                    // Mostrar mensaje de error en el messageDiv
                    const messageDiv = document.querySelector('#register-message');
                    if (messageDiv) {
                        messageDiv.textContent = `Por favor, completa el campo ${key}.`;
                        messageDiv.style.color = 'red';
                        messageDiv.style.display = 'block';

                        // Ocultar el mensaje después de 5 segundos
                        setTimeout(() => {
                            messageDiv.style.display = 'none';
                        }, 5000);
                    }
                    break; // Detener el bucle si hay un campo vacío
                }
            }

            // Si hay un campo vacío, no continuar con el registro
            if (campoVacio) {
                return;
            }

            try {
                // Enviar los datos a Strapi
                const response = await createUser(userData);
                console.log('Usuario creado en Strapi:', response);

                // Mostrar un mensaje de éxito al usuario
                const messageDiv = document.querySelector('#register-message');
                if (messageDiv) {
                    messageDiv.textContent = '¡Registro exitoso!';
                    messageDiv.style.color = 'green';
                    messageDiv.style.display = 'block';

                    // Ocultar el mensaje después de 5 segundos
                    setTimeout(() => {
                        messageDiv.style.display = 'none';
                    }, 5000);
                }

                // Limpiar el formulario después de un registro exitoso
                document.querySelector('.register-form').reset();
            } catch (error) {
                console.error('Error al registrar el usuario:', error);

                // Mostrar un mensaje de error al usuario
                const messageDiv = document.querySelector('#register-message');
                if (messageDiv) {
                    messageDiv.textContent = 'Hubo un error al registrar el usuario.';
                    messageDiv.style.color = 'red';
                    messageDiv.style.display = 'block';

                    // Ocultar el mensaje después de 5 segundos
                    setTimeout(() => {
                        messageDiv.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }


    const contrasenaInput = document.getElementById('contrasena');
    const confirmarContrasenaInput = document.getElementById('confirmar_contrasena');

    function validarContrasenas() {
        const contrasena = contrasenaInput.value;
        const confirmarContrasena = confirmarContrasenaInput.value;

        if (contrasena === "" && confirmarContrasena === "") {
            // Si ambos campos están vacíos, no aplicar estilos
            contrasenaInput.style.borderColor = '';
            confirmarContrasenaInput.style.borderColor = '';
        } else if (contrasena === confirmarContrasena) {
            // Si las contraseñas coinciden, poner el borde en verde
            contrasenaInput.style.borderColor = 'green';
            confirmarContrasenaInput.style.borderColor = 'green';
        } else {
            // Si las contraseñas no coinciden, poner el borde en rojo
            contrasenaInput.style.borderColor = 'red';
            confirmarContrasenaInput.style.borderColor = 'red';
        }
    }

    // Agregar el evento input a ambos campos
    contrasenaInput.addEventListener('input', validarContrasenas);
    confirmarContrasenaInput.addEventListener('input', validarContrasenas);
});