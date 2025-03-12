const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Función para obtener datos de la colección "Nombres"
const fetchNombres = async () => {
  try {
    // Obtener todos los nombres de la API de Strapi
    const response = await axios.get(`${STRAPI_URL}/api/nombres`);
    const nombres = response.data.data;

    // 1. Imprimir todos los nombres
    console.log('Todos los nombres:', nombres);

    // 2. Filtrar nombres que empiezan con "J"
    const nombresConJ = nombres.filter(item => item.attributes.nombre.startsWith('J'));
    console.log('Nombres que empiezan con "c":', nombresConJ);

    // 3. Contar cuántos nombres hay en total
    const cantidadNombres = nombres.length;
    console.log('Cantidad de nombres:', cantidadNombres);

  } catch (error) {
    console.error('Error al obtener nombres:', error.response ? error.response.data : error.message);
  }
};

// Función para crear un nuevo nombre
const createNombre = async (nombre) => {
  try {
    const response = await axios.post(`${STRAPI_URL}/api/nombres`, {
      data: { nombre },
    });
    console.log('Nombre creado:', response.data);
  } catch (error) {
    console.error('Error al crear el nombre:', error.response ? error.response.data : error.message);
  }
};

// Probar las funciones
(async () => {
  // Crear un nuevo nombre (opcional)
  await createNombre('Juan Pérez');
  await createNombre('María Gómez');
  await createNombre('Carlos López');

  // Obtener y procesar los nombres
  await fetchNombres();
})();