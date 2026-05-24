import { useEffect, useState } from "react";
import axios from "axios";

function LibroList() {

  const [libros, setLibros] = useState([]);

  // PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);

  const librosPorPagina = 10;

  // BUSCADOR
  const [busqueda, setBusqueda] = useState("");

  // FILTRO
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  // MENSAJE
  const [mensaje, setMensaje] = useState("");

  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    isbn: ""
  });

  // =========================
  // CARGAR LIBROS
  // =========================

  const cargarLibros = async () => {

    try {

      const res = await axios.get(
        "https://proyecto-biblioteca-universitaria.onrender.com/api/libros"
      );

      setLibros(res.data);

    } catch (error) {

      console.error(error);

      alert("Error al cargar libros");

    }

  };

  useEffect(() => {
    cargarLibros();
  }, []);

  // =========================
  // REGISTRAR LIBRO
  // =========================

  const registrarLibro = async () => {

    if (
      !nuevoLibro.titulo ||
      !nuevoLibro.autor ||
      !nuevoLibro.categoria ||
      !nuevoLibro.isbn
    ) {
      return alert("Complete todos los campos");
    }

    try {

      await axios.post(
        "https://proyecto-biblioteca-universitaria.onrender.com/api/libros",
        nuevoLibro
      );

      alert("Libro registrado correctamente");

      setNuevoLibro({
        titulo: "",
        autor: "",
        categoria: "",
        isbn: ""
      });

      cargarLibros();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.mensaje ||
        "Error al registrar libro"
      );

    }

  };

  // =========================
  // ELIMINAR LIBRO
  // =========================

  const eliminarLibro = async (id) => {

    try {

      await axios.delete(
         `https://proyecto-biblioteca-universitaria.onrender.com/api/libros/${id}`
      );

      alert("Libro eliminado correctamente");

      cargarLibros();

    } catch (error) {

      console.error(error);

      alert("Error al eliminar libro");

    }

  };

  // =========================
  // FILTRAR LIBROS
  // =========================

  const librosFiltrados = libros.filter((libro) => {

    const coincideBusqueda =

      libro.titulo
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        );

    const coincideCategoria =

      categoriaFiltro === "" ||

      libro.categoria
        ?.trim()
        .toLowerCase() ===

      categoriaFiltro
        .trim()
        .toLowerCase();

    return (
      coincideBusqueda &&
      coincideCategoria
    );

  });

  // =========================
  // CATEGORÍAS ÚNICAS
  // =========================

  const categorias = [

    ...new Set(

      libros.map((l) =>

        l.categoria
          ?.trim()

      )

    )

  ];

  // =========================
  // PAGINACIÓN
  // =========================

  const indiceUltimoLibro =
    paginaActual * librosPorPagina;

  const indicePrimerLibro =
    indiceUltimoLibro - librosPorPagina;

  const librosActuales =
    librosFiltrados.slice(
      indicePrimerLibro,
      indiceUltimoLibro
    );

  const totalPaginas = Math.ceil(
    librosFiltrados.length / librosPorPagina
  );

  return (

    <div className="table-container">

      <div className="table-header">
        <h2>Libros Registrados</h2>
      </div>

      {/* MENSAJE */}

      {mensaje && (
        <div className="alert-success">
          {mensaje}
        </div>
      )}

      {/* FORMULARIO */}

      <div className="form-books">

        <input
          type="text"
          placeholder="Título"
          value={nuevoLibro.titulo}
          onChange={(e) =>
            setNuevoLibro({
              ...nuevoLibro,
              titulo: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Autor"
          value={nuevoLibro.autor}
          onChange={(e) =>
            setNuevoLibro({
              ...nuevoLibro,
              autor: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Categoría"
          value={nuevoLibro.categoria}
          onChange={(e) =>
            setNuevoLibro({
              ...nuevoLibro,
              categoria: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="ISBN"
          value={nuevoLibro.isbn}
          onChange={(e) =>
            setNuevoLibro({
              ...nuevoLibro,
              isbn: e.target.value
            })
          }
        />

        <button onClick={registrarLibro}>
          Registrar Libro
        </button>

      </div>

      {/* BUSCADOR Y FILTROS */}

      <div className="filters">

        {/* BUSCADOR */}

        <div className="search-box">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Buscar por título..."
            value={busqueda}
            onChange={(e) => {

              setBusqueda(e.target.value);

              setPaginaActual(1);

            }}
          />

        </div>

        {/* FILTRO CATEGORÍA */}

        <select
          value={categoriaFiltro}
          onChange={(e) => {

            setCategoriaFiltro(
              e.target.value
            );

            setPaginaActual(1);

          }}
        >

          <option value="">
            Todas las categorías
          </option>

          {categorias.map((cat, index) => (

            <option
              key={index}
              value={cat}
            >
              {cat}
            </option>

          ))}

        </select>

      </div>

      {/* TABLA */}

      <div className="table-responsive">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
              <th>ISBN</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>

          </thead>

          <tbody>

            {librosActuales.length > 0 ? (

              librosActuales.map((libro) => (

                <tr key={libro.id}>

                  <td>{libro.id}</td>

                  <td>{libro.titulo}</td>

                  <td>{libro.autor}</td>

                  <td>{libro.categoria}</td>

                  <td>{libro.isbn}</td>

                  <td>

                    <span
                      className={
                        libro.disponible
                          ? "status available"
                          : "status unavailable"
                      }
                    >
                      {libro.disponible
                        ? "Disponible"
                        : "Prestado"}
                    </span>

                  </td>

                  <td>

                    <button
                      className="btn-danger"
                      onClick={() =>
                        eliminarLibro(libro.id)
                      }
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "20px"
                  }}
                >
                  No se encontraron libros
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* PAGINACIÓN */}

      {totalPaginas > 1 && (

        <div className="pagination">

          <button
            className="pagination-btn"
            onClick={() =>
              setPaginaActual(
                paginaActual - 1
              )
            }
            disabled={paginaActual === 1}
          >
            ← Anterior
          </button>

          {[...Array(totalPaginas)].map((_, index) => (

            <button
              key={index}
              className={
                paginaActual === index + 1
                  ? "pagination-number active-page"
                  : "pagination-number"
              }
              onClick={() =>
                setPaginaActual(index + 1)
              }
            >
              {index + 1}
            </button>

          ))}

          <button
            className="pagination-btn"
            onClick={() =>
              setPaginaActual(
                paginaActual + 1
              )
            }
            disabled={
              paginaActual === totalPaginas
            }
          >
            Siguiente →
          </button>

        </div>

      )}

    </div>

  );

}

export default LibroList;