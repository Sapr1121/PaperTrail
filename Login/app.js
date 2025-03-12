// test-strapi.js
const STRAPI_URL = 'http://localhost:1337'; // URL de tu Strapi

// Datos de prueba
const userData = {
  Nombre: 'Juan',
  Apellido: 'Pérez',
  cedula: '123456789',
  genero: 'Masculino',
  fecha_nacimiento: '1990-01-01',
  lugar_nacimiento: 'Ciudad de México',
  email: 'juan@example.com',
  username: 'juanperez',
  clave: 'password123',
  temaL_1: 'Historia',
  temaL_2: 'Ciencia'
};

// Función para enviar datos a Strapi
const testStrapi = async () => {
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

// Ejecutar la prueba
testStrapi();