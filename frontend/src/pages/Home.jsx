import Layout from "../components/Layout";

export default function Home() {

  return (

    <Layout
      title="Sistema Bibliotecario"
      subtitle="Panel principal universitario"
    >

      {/* TARJETAS */}

      <div className="cards">

        <div className="card">
          <h3>Libros Registrados</h3>
          <span>320</span>
        </div>

        <div className="card">
          <h3>Usuarios Registrados</h3>
          <span>150</span>
        </div>

        <div className="card">
          <h3>Préstamos Activos</h3>
          <span>45</span>
        </div>

        <div className="card">
          <h3>Libros Disponibles</h3>
          <span>275</span>
        </div>

      </div>

      {/* INFORMACIÓN */}

      <div className="table-container">

        <div className="table-header">
          <h2>Información General</h2>
        </div>

        <p>
          Plataforma moderna para la gestión de libros,
          usuarios y préstamos universitarios.
        </p>

        <br />

        <table>

          <thead>
            <tr>
              <th>Módulo</th>
              <th>Descripción</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Libros</td>
              <td>
                Registro y administración de libros disponibles
                en la biblioteca.
              </td>
            </tr>

            <tr>
              <td>Usuarios</td>
              <td>
                Registro de estudiantes y usuarios del sistema.
              </td>
            </tr>

            <tr>
              <td>Préstamos</td>
              <td>
                Control de préstamos y devoluciones de libros.
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </Layout>

  );
}