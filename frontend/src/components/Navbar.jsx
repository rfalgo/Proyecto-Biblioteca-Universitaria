import { Link, useLocation } from "react-router-dom";

export default function Navbar() {

  const location = useLocation();

  return (

    <aside className="sidebar">

      <div className="logo">

        <h2> Universidad </h2>

        <p>
          📚 Biblioteca Digital
        </p>

      </div>

      <ul>

        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">
            📊 Dashboard
          </Link>
        </li>

        <li className={location.pathname === "/libros" ? "active" : ""}>
          <Link to="/libros">
            📖 Libros
          </Link>
        </li>

        <li className={location.pathname === "/prestamos" ? "active" : ""}>
          <Link to="/prestamos">
            🔄 Préstamos
          </Link>
        </li>

        <li className={location.pathname === "/admin" ? "active" : ""}>
          <Link to="/admin">
            👤 Usuarios
          </Link>
        </li>

      </ul>

    </aside>

  );
}

