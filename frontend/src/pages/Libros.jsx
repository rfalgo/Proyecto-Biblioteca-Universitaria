import Layout from "../components/Layout";
import LibroList from "../components/LibroList";

export default function Libros() {

  return (

    <Layout
      title="📖 Gestión de Libros"
      subtitle="Registro y administración de libros"
    >

      <LibroList />

    </Layout>

  );

}