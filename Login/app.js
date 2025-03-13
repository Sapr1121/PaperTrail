const STRAPI_URL = 'http://localhost:1337'; // URL de tu Strapi

// Datos de prueba
const userData = {
  Nombre: 'xxx',
  Apellido: 'Péxxez',
  cedula: '15',
  genero: 'Masculino',
  fecha_nacimiento: '1990-01-01',
  lugar_nacimiento: 'Cde México',
  email: 'juanmaniadsafsadfsfdaa@example.com',
  username: 'juanpereafsz',
  clave: 'pass4444123',
  temaL_1: 'Historia',
  temaL_2: 'Ciencia'
};

// Función para enviar datos a Strapi
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
      const errorData = await response.json(); // Obtener detalles del error
      console.error('Error detallado de Strapi:', errorData);
      throw new Error('Error al crear el usuario');
    }

    const data = await response.json();
    console.log('Usuario creado en Strapi:', data);
  } catch (error) {
    console.error('Error al enviar datos a Strapi:', error.message);
  }
};

// Función para recuperar todos los usuarios de Strapi
const recuperarUsuarios = async () => {
  try {
    console.log('Recuperando todos los usuarios de Strapi...');

    const response = await fetch(`${STRAPI_URL}/api/usuarios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Respuesta de Strapi:', response);

    if (!response.ok) {
      const errorData = await response.json(); // Obtener detalles del error
      console.error('Error detallado de Strapi:', errorData);
      throw new Error('Error al recuperar los usuarios');
    }

    const data = await response.json();
    console.log('Usuarios recuperados de Strapi:', data);
  } catch (error) {
    console.error('Error al recuperar los usuarios:', error.message);
  }
};

// Ejecutar las pruebas
const ejecutarPruebas = async () => {
  await enviarDatos(); // Enviar datos de prueba
  await recuperarUsuarios(); // Recuperar todos los usuarios
};

ejecutarPruebas();