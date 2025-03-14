const STRAPI_URL = 'http://localhost:1337'; // URL de tu Strapi

// Datos de prueba para el usuario registrado
const userData = {
  Nombre: 'xxx',
  Apellido: 'Péxxez',
  cedula: '15',
  genero: 'Masculino',
  fecha_nacimiento: '1990-01-01',
  lugar_nacimiento: 'Cde México',
  email: 'juanmaniadsafsadfsfdaa@example.com',
  username: 'juanpereafsz',
  password: 'pass4444123', // Asegúrate de que este campo se llame "password"
  temaL_1: 'Historia',
  temaL_2: 'Ciencia'
};

// Función para enviar datos a Strapi (registrar un usuario)
const enviarDatos = async () => {
  try {
    console.log('Enviando datos de prueba a Strapi...');

    const response = await fetch(`${STRAPI_URL}/api/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: userData }), // Envía los datos dentro de un objeto "data"
    });

    console.log('Respuesta de Strapi:', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error detallado de Strapi:', errorData.error.details.errors);
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

// Función para probar el inicio de sesión personalizado
const probarLoginPersonalizado = async (email, password) => {
  try {
    console.log('Probando inicio de sesión personalizado con:', { email, password });

    // Busca el usuario por correo electrónico o nombre de usuario
    const userResponse = await fetch(`${STRAPI_URL}/api/usuarios?filters[email][$eq]=${email}`);
    const userData = await userResponse.json();

    if (!userData.data || userData.data.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    const user = userData.data[0].attributes;

    // Verifica la contraseña utilizando el campo "password"
    const validPassword = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    if (!validPassword.ok) {
      const errorData = await validPassword.json();
      console.error('Error detallado de Strapi:', errorData);
      throw new Error('Contraseña incorrecta');
    }

    // Genera el token JWT
    const tokenResponse = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log('Inicio de sesión exitoso:', tokenData);
    return tokenData; // Retorna los datos del usuario y el token JWT
  } catch (error) {
    console.error('Error al iniciar sesión personalizado:', error.message);
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
    await probarLoginPersonalizado(emailCorrecto, passwordCorrecto);

  } catch (error) {
    console.error('Error en las pruebas:', error.message);
  }
};

// Ejecutar todas las pruebas
ejecutarPruebas();