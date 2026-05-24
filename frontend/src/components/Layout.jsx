import Navbar from "./Navbar";

export default function Layout({
  title,
  subtitle,
  children
}) {

  return (

    <div className="app">

      <Navbar />

      <main className="main">

        <div className="topbar">

        <div
          style={{
            width: "100%",
            textAlign: "center"
          }}
        >
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        </div>

        <div className="content-container">
          {children}
        </div>

      </main>

    </div>

  );
}