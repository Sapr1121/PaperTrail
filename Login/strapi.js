const STRAPI_URL = 'http://localhost:1337'; // URL de tu Strapi

// Función para crear un nuevo usuario en Strapi
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/usuarios`, { // Cambia "users" por "usuarios"
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // Envía los datos directamente, sin el objeto "data"
    });

    if (!response.ok) {
      throw new Error('Error al crear el usuario');
    }

    const data = await response.json();
    return data; // Retorna los datos del usuario creado
  } catch (error) {
    console.error('Error al crear el usuario:', error.message);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};