import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {

  const [usuarios, setUsuarios] = useState([]);

  // =========================
  // PAGINACION
  // =========================

  const [paginaActual, setPaginaActual] = useState(1);

  const usuariosPorPagina = 10;

  // =========================
  // BUSCADOR
  // =========================

  const [busqueda, setBusqueda] = useState("");

  // =========================
  // NUEVO USUARIO
  // =========================

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    correo: "",
    cedula: "",
  });

  // =========================
  // CARGAR USUARIOS
  // =========================

  const cargarUsuarios = async () => {

    try {

      const res = await axios.get(
        "https://proyecto-biblioteca-universitaria.onrender.com/api/usuarios"
      );

      setUsuarios(res.data);

    } catch (error) {

      console.error(error);

      alert("Error al cargar usuarios");

    }

  };

  useEffect(() => {

    cargarUsuarios();

  }, []);

  // =========================
  // REGISTRAR USUARIO
  // =========================

  const registrarUsuario = async () => {

    if (
      !nuevoUsuario.nombre ||
      !nuevoUsuario.correo ||
      !nuevoUsuario.cedula
    ) {
      return alert("Complete todos los campos");
    }

    // VALIDAR CEDULA

    if (!/^[0-9]+$/.test(nuevoUsuario.cedula)) {

      return alert(
        "La cédula debe contener solo números"
      );

    }

    try {

      await axios.post(
        "https://proyecto-biblioteca-universitaria.onrender.com/api/usuarios",
        nuevoUsuario
      );

      alert("Usuario registrado correctamente");

      setNuevoUsuario({
        nombre: "",
        correo: "",
        cedula: "",
      });

      cargarUsuarios();

    } catch (error) {

      console.error(error);

      alert("Error al registrar usuario");

    }

  };

  // =========================
  // FILTRAR USUARIOS
  // =========================

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>

      usuario.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase())

      ||

      usuario.correo
        .toLowerCase()
        .includes(busqueda.toLowerCase())

      ||

      usuario.cedula
        .toString()
        .includes(busqueda)

  );

  // =========================
  // PAGINACION
  // =========================

  const indiceUltimoUsuario =
    paginaActual * usuariosPorPagina;

  const indicePrimerUsuario =
    indiceUltimoUsuario - usuariosPorPagina;

  const usuariosPaginados =
    usuariosFiltrados.slice(
      indicePrimerUsuario,
      indiceUltimoUsuario
    );

  const totalPaginas = Math.ceil(
    usuariosFiltrados.length /
    usuariosPorPagina
  );

  return (

    <div className="table-container">

      <div className="table-header">
        <h2>Administración de Usuarios</h2>
      </div>

      {/* FORMULARIO */}

      <div className="form-books">

        <input
          type="text"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={(e) =>
            setNuevoUsuario({
              ...nuevoUsuario,
              nombre: e.target.value
            })
          }
        />

        <input
          type="email"
          placeholder="Correo"
          value={nuevoUsuario.correo}
          onChange={(e) =>
            setNuevoUsuario({
              ...nuevoUsuario,
              correo: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Número de Cédula"
          value={nuevoUsuario.cedula}
          onChange={(e) =>
            setNuevoUsuario({
              ...nuevoUsuario,
              cedula: e.target.value
            })
          }
        />

        <button onClick={registrarUsuario}>
          Registrar Usuario
        </button>

      </div>

      {/* BUSCADOR */}

      <div className="filters">

        <div className="search-box">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Buscar usuario..."
            value={busqueda}
            onChange={(e) => {

              setBusqueda(e.target.value);

              // VOLVER A PAGINA 1
              setPaginaActual(1);

            }}
          />

        </div>

      </div>

      {/* TABLA */}

      <div className="table-responsive">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Cédula</th>
            </tr>

          </thead>

          <tbody>

            {usuariosPaginados.map((usuario) => (

              <tr key={usuario.id}>

                <td>{usuario.id}</td>

                <td>{usuario.nombre}</td>

                <td>{usuario.correo}</td>

                <td>{usuario.cedula}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINACION */}

      <div className="pagination">

        <button
          onClick={() =>
            setPaginaActual(paginaActual - 1)
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
                ? "active-page"
                : ""
            }
            onClick={() =>
              setPaginaActual(index + 1)
            }
          >
            {index + 1}
          </button>

        ))}

        <button
          onClick={() =>
            setPaginaActual(paginaActual + 1)
          }
          disabled={
            paginaActual === totalPaginas
          }
        >
          Siguiente →
        </button>

      </div>

    </div>

  );

}

export default Admin;