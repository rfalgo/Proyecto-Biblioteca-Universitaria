import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";

export default function Dashboard() {

  // =========================
  // ESTADOS
  // =========================

  const [libros, setLibros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [prestamos, setPrestamos] = useState([]);

  // =========================
  // CARGAR DATOS
  // =========================

  const cargarDatos = async () => {

    try {

      const resLibros = await axios.get(
        "https://proyecto-biblioteca-universitaria.onrender.com/api/libros"
      );

      const resUsuarios = await axios.get(
        "https://proyecto-biblioteca-universitaria.onrender.com/api/usuarios"
      );

      const resPrestamos = await axios.get(
        "https://proyecto-biblioteca-universitaria.onrender.com/api/prestamos"
      );

      setLibros(resLibros.data);
      setUsuarios(resUsuarios.data);
      setPrestamos(resPrestamos.data);

    } catch (error) {

      console.error(error);

      alert("Error al cargar dashboard");

    }

  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // =========================
  // DATOS REALES
  // =========================

  const librosDisponibles = libros.filter(
    libro => libro.disponible
  ).length;

  const prestamosActivos = prestamos.filter(
    prestamo => prestamo.estado === "Prestado"
  ).length;

  return (

    <Layout
      title="📚 Sistema Bibliotecario"
      subtitle="Panel administrativo universitario"
    >

      {/* CARDS */}

      <div className="cards">

        <div className="card">
          <h3>📖 Libros Disponibles</h3>
          <span>{librosDisponibles}</span>
        </div>

        <div className="card">
          <h3>🔄 Préstamos Activos</h3>
          <span>{prestamosActivos}</span>
        </div>

        <div className="card">
          <h3>📚 Total Libros</h3>
          <span>{libros.length}</span>
        </div>

        <div className="card">
          <h3>👥 Usuarios</h3>
          <span>{usuarios.length}</span>
        </div>

      </div>

      {/* TABLA LIBROS */}

      <div className="table-container">

        <div className="table-header">
          <h2>Catálogo de Libros</h2>
        </div>

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>TÍTULO</th>
              <th>AUTOR</th>
              <th>CATEGORÍA</th>
              <th>ISBN</th>
              <th>ESTADO</th>
            </tr>
          </thead>

          <tbody>

            {libros.map((libro) => (

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

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}