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

    console.log('Respuesta de Strapi:', response);

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
    throw error; // Lanza el error para manejarlo en el frontend
  }
};

// Datos de prueba para el usuario registrado
const userData = async () => {
  const roleId = await obtenerIdRol(); // Obtén el ID del rol "Authenticated"

  return {
    username: 'juanpereafsz',
    email: 'juanmaniadsafsadfsfdaa@example.com',
    password: 'pass4444123', // Campo privado
    role: roleId, // Asigna el ID del rol
    Nombre: 'xxx', // Campo público
    Apellido: 'Péxxez', // Campo público
    cedula: '15', // Campo público
    genero: 'Masculino', // Campo público
    fecha_nacimiento: '1990-01-01', // Campo público
    lugar_nacimiento: 'Cde México', // Campo público
    temaL_1: 'Historia', // Campo público
    temaL_2: 'Ciencia', // Campo público
  };
};

// Función para enviar datos a Strapi (registrar un usuario)
const enviarDatos = async () => {
  try {
    console.log('Enviando datos de prueba a Strapi...');

    const datosUsuario = await userData(); // Obtén los datos del usuario con el ID del rol

    const response = await fetch(`${STRAPI_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosUsuario), // Envía los datos directamente
    });

    console.log('Respuesta de Strapi:', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error detallado de Strapi:', errorData);
      throw new Error('Error al crear el usuario');
    }

    const data = await response.json();
    console.log('Usuario creado en Strapi:', data);
  } catch (error) {
    console.error('Error al enviar datos a Strapi:', error.message);
  }
};

// Función para probar el inicio de sesión
const probarLogin = async (email, password) => {
  try {
    console.log('Probando inicio de sesión con:', { email, password });

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

    console.log('Respuesta de Strapi:', response);

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
    throw error; // Lanza el error para manejarlo en el frontend
  }
};

// Función para obtener los datos del usuario (requiere autenticación)
const obtenerDatosUsuario = async (jwt) => {
  try {
    console.log('Obteniendo datos del usuario...');

    const response = await fetch(`${STRAPI_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`, // Usa el token JWT para autenticación
      },
    });

    console.log('Respuesta de Strapi:', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error detallado de Strapi:', errorData);
      throw new Error('Error al obtener los datos del usuario');
    }

    const data = await response.json();
    console.log('Datos del usuario:', data);
    return data; // Retorna los datos del usuario
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error.message);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};

// Ejecutar las pruebas
const ejecutarPruebas = async () => {
  try {
    // Registrar un usuario de prueba
    await enviarDatos();

    // Pruebas de inicio de sesión
    const emailCorrecto = 'juanmaniadsafsadfsfdaa@example.com';
    const passwordCorrecto = 'pass4444123';

    // 1. Prueba con correo y contraseña correctos
    console.log('Prueba 1: Correo y contraseña correctos');
    const loginData = await probarLogin(emailCorrecto, passwordCorrecto);

    // 2. Obtener los datos del usuario usando el token JWT
    console.log('Prueba 2: Obtener datos del usuario');
    await obtenerDatosUsuario(loginData.jwt);

  } catch (error) {
    console.error('Error en las pruebas:', error.message);
  }
};

// Ejecutar todas las pruebas
ejecutarPruebas();