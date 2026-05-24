import { useEffect, useState } from "react";
import axios from "axios";

function Prestamos() {

  const [prestamos, setPrestamos] = useState([]);

  // BUSCADOR
  const [busqueda, setBusqueda] = useState("");

  // =========================
  // PAGINACIÓN
  // =========================

  const [paginaActual, setPaginaActual] = useState(1);

  const prestamosPorPagina = 10;

  // =========================
  // PRESTAR LIBRO
  // =========================

  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    cedula: "",
    isbn: "",
    fechaPrestamo: "",
    fechaDevolucion: ""
  });

  // =========================
  // DEVOLVER LIBRO
  // =========================

  const [devolucion, setDevolucion] = useState({
    cedula: "",
    isbn: "",
    fechaEntrega: ""
  });

  // =========================
  // CARGAR PRESTAMOS
  // =========================

  const cargarPrestamos = async () => {

    try {

      const res = await axios.get(
        "https://proyecto-biblioteca-universitaria.onrender.com/api/prestamos"
      );

      console.log(res.data.length);

      setPrestamos(res.data);

    } catch (error) {

      console.error(error);

      alert("Error al cargar préstamos");

    }

  };

  useEffect(() => {
    cargarPrestamos();
  }, []);

  // =========================
  // REGISTRAR PRESTAMO
  // =========================

  const registrarPrestamo = async () => {

    if (
      !nuevoPrestamo.cedula ||
      !nuevoPrestamo.isbn ||
      !nuevoPrestamo.fechaPrestamo ||
      !nuevoPrestamo.fechaDevolucion
    ) {
      return alert("Complete todos los campos");
    }

    try {

      await axios.post(
        "https://proyecto-biblioteca-universitaria.onrender.com/api/prestamos",
        nuevoPrestamo
      );

      alert("Préstamo registrado correctamente");

      setNuevoPrestamo({
        cedula: "",
        isbn: "",
        fechaPrestamo: "",
        fechaDevolucion: ""
      });

      cargarPrestamos();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.mensaje ||
        "Error al registrar préstamo"
      );

    }

  };

  // =========================
  // DEVOLVER LIBRO
  // =========================

  const devolverLibro = async () => {

    if (
      !devolucion.cedula ||
      !devolucion.isbn ||
      !devolucion.fechaEntrega
    ) {
      return alert("Complete todos los campos");
    }

    try {

      await axios.put(
        "https://proyecto-biblioteca-universitaria.onrender.com/api/prestamos/devolver",
        devolucion
      );

      alert("Libro devuelto correctamente");

      setDevolucion({
        cedula: "",
        isbn: "",
        fechaEntrega: ""
      });

      cargarPrestamos();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.mensaje ||
        "Error al devolver libro"
      );

    }

  };

  // =========================
  // FILTRAR PRESTAMOS
  // =========================

  const prestamosFiltrados = prestamos.filter(
    (prestamo) =>

      prestamo.cedula
        ?.toString()
        .includes(busqueda)

      ||

      prestamo.isbn
        ?.toLowerCase()
        .includes(busqueda.toLowerCase())

      ||

      prestamo.estado
        ?.toLowerCase()
        .includes(busqueda.toLowerCase())

  );

  // =========================
  // PAGINACIÓN
  // =========================

  const indiceUltimoPrestamo =
    paginaActual * prestamosPorPagina;

  const indicePrimerPrestamo =
    indiceUltimoPrestamo - prestamosPorPagina;

  const prestamosActuales =
    prestamosFiltrados.slice(
      indicePrimerPrestamo,
      indiceUltimoPrestamo
    );

  const totalPaginas = Math.ceil(
    prestamosFiltrados.length /
    prestamosPorPagina
  );

  return (

    <div className="table-container">

      <div className="table-header">
        <h2>Gestión de Préstamos</h2>
      </div>

      {/* =========================
          FORMULARIO PRESTAR
      ========================= */}

      <h3 style={{ marginBottom: "15px" }}>
        Prestar Libro
      </h3>

      <div className="form-books">

        <input
          type="text"
          placeholder="Cédula Usuario"
          value={nuevoPrestamo.cedula}
          onChange={(e) =>
            setNuevoPrestamo({
              ...nuevoPrestamo,
              cedula: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="ISBN Libro"
          value={nuevoPrestamo.isbn}
          onChange={(e) =>
            setNuevoPrestamo({
              ...nuevoPrestamo,
              isbn: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Fecha Préstamo"
          onFocus={(e) =>
            e.target.type = "date"
          }
          onBlur={(e) => {
            if (!e.target.value) {
              e.target.type = "text";
            }
          }}
          value={nuevoPrestamo.fechaPrestamo}
          onChange={(e) =>
            setNuevoPrestamo({
              ...nuevoPrestamo,
              fechaPrestamo: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Fecha Devolución"
          onFocus={(e) =>
            e.target.type = "date"
          }
          onBlur={(e) => {
            if (!e.target.value) {
              e.target.type = "text";
            }
          }}
          value={nuevoPrestamo.fechaDevolucion}
          onChange={(e) =>
            setNuevoPrestamo({
              ...nuevoPrestamo,
              fechaDevolucion: e.target.value
            })
          }
        />

        <button onClick={registrarPrestamo}>
          Registrar Préstamo
        </button>

      </div>

      {/* =========================
          FORMULARIO DEVOLVER
      ========================= */}

      <h3
        style={{
          marginTop: "40px",
          marginBottom: "15px"
        }}
      >
        Devolver Libro
      </h3>

      <div className="form-books">

        <input
          type="text"
          placeholder="Cédula Usuario"
          value={devolucion.cedula}
          onChange={(e) =>
            setDevolucion({
              ...devolucion,
              cedula: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="ISBN Libro"
          value={devolucion.isbn}
          onChange={(e) =>
            setDevolucion({
              ...devolucion,
              isbn: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Fecha Entrega"
          onFocus={(e) =>
            e.target.type = "date"
          }
          onBlur={(e) => {
            if (!e.target.value) {
              e.target.type = "text";
            }
          }}
          value={devolucion.fechaEntrega}
          onChange={(e) =>
            setDevolucion({
              ...devolucion,
              fechaEntrega: e.target.value
            })
          }
        />

        <button onClick={devolverLibro}>
          Devolver Libro
        </button>

      </div>

      {/* =========================
          BUSCADOR
      ========================= */}

      <div className="filters">

        <div className="search-box">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Buscar préstamo..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
          />

        </div>

      </div>

      {/* =========================
          TABLA
      ========================= */}

      <div className="table-responsive">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Cédula</th>
              <th>ISBN</th>
              <th>Fecha Préstamo</th>
              <th>Fecha Devolución</th>
              <th>Estado</th>
            </tr>

          </thead>

          <tbody>

            {prestamosActuales.length > 0 ? (

              prestamosActuales.map((prestamo) => (

                <tr key={prestamo.id}>

                  <td>{prestamo.id}</td>

                  <td>{prestamo.cedula}</td>

                  <td>{prestamo.isbn}</td>

                  <td>
                    {prestamo.fechaprestamo
                      ? new Date(
                          prestamo.fechaprestamo
                        ).toLocaleDateString()
                      : "Sin fecha"}
                  </td>

                  <td>
                    {prestamo.fechadevolucion
                      ? new Date(
                          prestamo.fechadevolucion
                        ).toLocaleDateString()
                      : "Sin fecha"}
                  </td>

                  <td>

                    <span
                      className={
                        prestamo.estado === "Devuelto"
                          ? "status available"
                          : "status unavailable"
                      }
                    >
                      {prestamo.estado}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px"
                  }}
                >
                  No hay préstamos registrados
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* =========================
          PAGINACIÓN
      ========================= */}

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

export default Prestamos;