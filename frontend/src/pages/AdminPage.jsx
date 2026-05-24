import Layout from "../components/Layout";
import Admin from "../components/Admin";

export default function AdminPage() {

  return (

    <Layout
      title="👤 Gestión de Usuarios"
      subtitle="Gestión y registro de usuarios del sistema"
    >

      <Admin />

    </Layout>

  );
}