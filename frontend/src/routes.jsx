import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Libros from "./pages/Libros";
import PrestamosPage from "./pages/PrestamosPage";
import AdminPage from "./pages/AdminPage";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* DASHBOARD */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* LIBROS */}
        <Route
          path="/libros"
          element={<Libros />}
        />

        {/* PRÉSTAMOS */}
        <Route
          path="/prestamos"
          element={<PrestamosPage />}
        />

        {/* ADMINISTRACIÓN */}
        <Route
          path="/admin"
          element={<AdminPage />}
        />

      </Routes>

    </BrowserRouter>

  );

}