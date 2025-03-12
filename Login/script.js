document.addEventListener('DOMContentLoaded', function() {
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

    // Evento para el formulario de registro
    registrarseLink.addEventListener('click', function(e) {
        e.preventDefault();
        setTimeout(() => {
            formulario.style.transform = 'translateX(100%)'; // Mover a la derecha
            nuevoUsuario.classList.add('active-registro');
            restablecer.classList.remove('active-restablecer');
            loginForm.classList.add('hidden');
            ajustarTamañoFormulario(registerForm); // Ajustar tamaño para el formulario de registro
        }, 10); // Pequeño retraso para permitir el renderizado
    });

    // Evento para el formulario de restablecer contraseña
    recuperarLink.addEventListener('click', function(e) {
        e.preventDefault();
        setTimeout(() => {
            formulario.style.transform = 'translateX(-100%)'; // Mover a la izquierda
            restablecer.classList.add('active-restablecer');
            nuevoUsuario.classList.remove('active-registro');
            loginForm.classList.add('hidden');
            ajustarTamañoFormulario(restContraForm); // Ajustar tamaño para el formulario de restablecimiento
        }, 10); // Pequeño retraso para permitir el renderizado
    });

    // Evento para volver al inicio de sesión desde el registro
    const volverInicioDesdeRegistro = document.querySelector('.register-form .login-link');
    volverInicioDesdeRegistro.addEventListener('click', function(e) {
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
    volverInicioDesdeRestablecer.addEventListener('click', function(e) {
        e.preventDefault();
        setTimeout(() => {
            formulario.style.transform = 'translateX(0)'; // Volver al centro
            restablecer.classList.remove('active-restablecer');
            nuevoUsuario.classList.remove('active-registro');
            loginForm.classList.remove('hidden');
            ajustarTamañoFormulario(loginForm); // Ajustar tamaño para el formulario de inicio de sesión
        }, 10); // Pequeño retraso para permitir el renderizado
    });
});