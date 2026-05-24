const API_URL = 'http://localhost:3000/api/libros';

/* =========================
   CARGAR LIBROS
========================= */

async function cargarLibros() {

  try {

    const response = await axios.get(API_URL);

    mostrarLibros(response.data);

  } catch (error) {

    console.error("Error al cargar libros:", error);

    alert("Error al conectar con el backend");
  }
}

/* =========================
   MOSTRAR LIBROS
========================= */

function mostrarLibros(libros) {

  const tbody = document.querySelector('#tablaLibros tbody');

  tbody.innerHTML = '';

  libros.forEach(libro => {

    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${libro.id}</td>

      <td>${libro.titulo}</td>

      <td>${libro.autor}</td>

      <td>$${libro.precio.toLocaleString()}</td>

      <td>
        <button
          class="delete-btn"
          onclick="eliminarLibro(${libro.id})"
        >
          <i class="fas fa-trash"></i>
          Eliminar
        </button>
      </td>
    `;

    tbody.appendChild(fila);
  });
}

/* =========================
   AGREGAR LIBRO
========================= */

async function agregarLibro() {

  const titulo = document.getElementById('titulo').value;

  const autor = document.getElementById('autor').value;

  const precio = parseInt(
    document.getElementById('precio').value
  );

  if (!titulo || !autor || !precio) {

    alert("Por favor completa todos los campos");

    return;
  }

  try {

    await axios.post(API_URL, {
      titulo,
      autor,
      precio
    });

    alert("Libro agregado correctamente");

    limpiarFormulario();

    cargarLibros();

  } catch (error) {

    console.error(error);

    alert("Error al agregar el libro");
  }
}

/* =========================
   ELIMINAR LIBRO
========================= */

async function eliminarLibro(id) {

  const confirmar = confirm(
    "¿Estás seguro de eliminar este libro?"
  );

  if (!confirmar) return;

  try {

    await axios.delete(`${API_URL}/${id}`);

    alert("Libro eliminado correctamente");

    cargarLibros();

  } catch (error) {

    console.error(error);

    alert("Error al eliminar el libro");
  }
}

/* =========================
   LIMPIAR FORMULARIO
========================= */

function limpiarFormulario(){

  document.getElementById('titulo').value = '';

  document.getElementById('autor').value = '';

  document.getElementById('precio').value = '';
}

/* =========================
   INICIAR
========================= */

window.onload = cargarLibros;