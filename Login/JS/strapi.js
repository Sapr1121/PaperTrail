const STRAPI_URL = 'http://localhost:1337'; // URL de tu Strapi

// Función para obtener el ID del rol "Authenticated"
const obtenerIdRol = async () => {
    try {
        console.log('Obteniendo ID del rol "Authenticated"...');

        const response = await fetch(`${STRAPI_URL}/api/users-permissions/roles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error detallado de Strapi:', errorData);
            throw new Error('Error al obtener los roles');
        }

        const data = await response.json();
        const rolAuthenticated = data.roles.find((rol) => rol.name === 'Authenticated');

        if (!rolAuthenticated) {
            throw new Error('No se encontró el rol "Authenticated"');
        }

        console.log('ID del rol "Authenticated":', rolAuthenticated.id);
        return rolAuthenticated.id;
    } catch (error) {
        console.error('Error al obtener el ID del rol:', error.message);
        throw error;
    }
};

// Función para crear un usuario en Strapi
export const createUser = async (userData) => {
    try {
        const roleId = await obtenerIdRol(); // Obtén el ID del rol "Authenticated"

        const datosUsuario = {
            ...userData,
            password: userData.clave, // Mapea "clave" a "password"
            role: roleId, // Asigna el ID del rol
        };

        const response = await fetch(`${STRAPI_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosUsuario),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error detallado de Strapi:', errorData);
            throw new Error('Error al crear el usuario');
        }

        const data = await response.json();
        console.log('Usuario creado en Strapi:', data);
        return data;
    } catch (error) {
        console.error('Error al enviar datos a Strapi:', error.message);
        throw error;
    }
};

// Función para manejar el inicio de sesión
export const loginUser = async (email, password) => {
    try {
        console.log('Enviando solicitud de inicio de sesión a Strapi...');
        console.log('Email:', email);
        console.log('Contraseña:', password);

        const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier: email, // Strapi espera "identifier" para el correo o nombre de usuario
                password: password, // Contraseña en texto plano
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error detallado de Strapi:', errorData);
            throw new Error(errorData.message || 'Error al iniciar sesión');
        }

        const data = await response.json();
        console.log('Inicio de sesión exitoso:', data);
        return data; // Retorna los datos del usuario y el token JWT
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        throw error;
    }
};