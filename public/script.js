async function getplatos() {
    try {
      const respuesta = await fetch('http://api-dishes.vercel.app/');
      if (!respuesta.ok) {
        throw new Error('Respuesta de API no exitosa');
      }
      const data = await respuesta.json();
      const arrayDatosPlatos = data.data; // Accedemos al array de platos
  
      // Obtenemos una referencia a la tabla en el HTML
      const table = document.getElementById('platos-table').getElementsByTagName('tbody')[0];
  
      // Limpiar la tabla antes de agregar nuevos datos
      table.innerHTML = '';
  
      // Iteramos sobre los datos de la API y creamos las filas en la tabla
      arrayDatosPlatos.forEach((plato) => {
        // Verificar si las propiedades existen y tienen valores válidos
        const name = plato.name || 'Nombre no disponible';
        const calories = plato.calories || 'Calorías no disponibles';
        const isVegetarian = plato.isVegetarian ? 'Sí' : 'No';
        const value = plato.value || 'Valor no disponible';
        const comments = plato.comments || 'No hay comentarios';
  
        const row = table.insertRow();
        row.innerHTML = `<td>${name}</td><td>${calories}</td><td>${isVegetarian}</td><td>${value}</td><td>${comments}</td>`;
      });
    } catch (error) {
      console.error('Error al obtener los platos:', error.message);
    }
  }
  
  // Llamamos a la función para obtener los datos de la API
  getplatos();







  // script.js
async function agregarPlato(nuevoPlato) {
  try {
    const respuesta = await fetch('http://api-dishes.vercel.app/dishes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoPlato)
    });

    if (!respuesta.ok) {
      throw new Error('Error al agregar el plato a la API');
    }

    const platoAgregado = await respuesta.json();

    return platoAgregado;
  } catch (error) {
    console.error('Error al agregar el plato:', error.message);
    throw error;
  }
}

async function agregarNuevoPlato(event) {
  event.preventDefault();

  const nuevoPlato = {
    name: document.getElementById('nombre').value,
    calories: parseFloat(document.getElementById('calorias').value),
    isVegetarian: document.getElementById('vegetariano').checked,
    value: parseFloat(document.getElementById('valor').value),
    comments: document.getElementById('descripcion').value
  };

  try {
    const platoAgregado = await agregarPlato(nuevoPlato);

    const table = document.getElementById('platos-table').getElementsByTagName('tbody')[0];

    const row = table.insertRow();
    row.innerHTML = `<td>${platoAgregado.name}</td><td>${platoAgregado.calories}</td><td>${platoAgregado.isVegetarian ? 'Sí' : 'No'}</td><td>${platoAgregado.value}</td><td>${platoAgregado.comments}</td>`;

    document.getElementById('plato-form').reset();
  } catch (error) {
    console.error('Error al agregar el nuevo plato:', error.message);
  }
}

document.getElementById('plato-form').addEventListener('submit', agregarNuevoPlato);
