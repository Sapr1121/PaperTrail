export function setupAnimations() {
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
            formulario.style.transform = 'translateX(0%)'; 
            nuevoUsuario.classList.add('active-registro');
            restablecer.classList.remove('active-restablecer');
            loginForm.classList.add('hidden');
            ajustarTamañoFormulario(registerForm); 
            document.documentElement.scrollTop = registerForm.offsetTop;
            setTimeout(() => {
                window.scrollTo({ top: registerForm.offsetTop, behavior: 'smooth' });
            }, 300);
        }, 10);
    });

    recuperarLink.addEventListener('click', function (e) {
        e.preventDefault();
        setTimeout(() => {
            formulario.style.transform = 'translateX(0%)';
            restablecer.classList.add('active-restablecer');
            nuevoUsuario.classList.remove('active-registro');
            loginForm.classList.add('hidden');
            ajustarTamañoFormulario(restContraForm);
        }, 10);
    });

    const volverInicioDesdeRegistro = document.querySelector('.register-form .login-link');
    volverInicioDesdeRegistro.addEventListener('click', function (e) {
        e.preventDefault();
        setTimeout(() => {
            formulario.style.transform = 'translateX(0)';
            nuevoUsuario.classList.remove('active-registro');
            restablecer.classList.remove('active-restablecer');
            loginForm.classList.remove('hidden');
            ajustarTamañoFormulario(loginForm);
        }, 10);
    });

    const volverInicioDesdeRestablecer = document.querySelector('.rest-contra .login-link');
    volverInicioDesdeRestablecer.addEventListener('click', function (e) {
        e.preventDefault();
        setTimeout(() => {
            formulario.style.transform = 'translateX(0)';
            restablecer.classList.remove('active-restablecer');
            nuevoUsuario.classList.remove('active-registro');
            loginForm.classList.remove('hidden');
            ajustarTamañoFormulario(loginForm);
        }, 10);
    });
}