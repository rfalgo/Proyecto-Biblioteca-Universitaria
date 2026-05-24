import Layout from "../components/Layout";
import Prestamos from "../components/Prestamos";

export default function PrestamosPage() {

  return (

    <Layout
      title="🔄Gestión de Préstamos"
      subtitle="Registro y control de préstamos universitarios"
    >

      <Prestamos />
      
    </Layout>

  );

}