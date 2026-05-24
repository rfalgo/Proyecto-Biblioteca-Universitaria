const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.use(cors());
app.use(express.json());

/* ======================================
   SWAGGER
====================================== */

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/* ======================================
   CONEXIÓN POSTGRES RENDER
====================================== */

const pool = new Pool({
  connectionString:
    "postgresql://biblioteca_user:A23vGnM1ZUmMVtnmxOhbVs8A9LmMGE76@dpg-d88rpdegvqtc73bdsdmg-a.virginia-postgres.render.com/biblioteca_bw27",
  ssl: {
    rejectUnauthorized: false
  }
});

/* ======================================
   CREAR TABLAS
====================================== */

const crearTablas = async () => {

  try {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS libros (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255),
        autor VARCHAR(255),
        categoria VARCHAR(255),
        isbn VARCHAR(100) UNIQUE,
        disponible BOOLEAN DEFAULT true
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255),
        correo VARCHAR(255),
        cedula BIGINT UNIQUE,
        rol VARCHAR(100)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS prestamos (
        id SERIAL PRIMARY KEY,
        cedula BIGINT,
        isbn VARCHAR(100),
        fechaPrestamo DATE,
        fechaDevolucion DATE,
        fechaEntrega DATE,
        estado VARCHAR(100)
      )
    `);

    console.log("Tablas creadas correctamente");

  } catch (error) {

    console.error("Error creando tablas", error);

  }

};

crearTablas();

/* ======================================
   LIBROS
====================================== */

/**
 * @swagger
 * /api/libros:
 *   get:
 *     summary: Obtener libros
 *     tags:
 *       - Libros
 *     responses:
 *       200:
 *         description: Lista de libros
 */

// OBTENER LIBROS
app.get("/api/libros", async (req, res) => {

  try {

    const resultado = await pool.query(
      "SELECT * FROM libros ORDER BY id ASC"
    );

    res.json(resultado.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener libros"
    });

  }

});

/**
 * @swagger
 * /api/libros:
 *   post:
 *     summary: Registrar libro
 *     tags:
 *       - Libros
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               categoria:
 *                 type: string
 *               isbn:
 *                 type: string
 *     responses:
 *       200:
 *         description: Libro registrado correctamente
 */

// REGISTRAR LIBRO
app.post("/api/libros", async (req, res) => {

  try {

    const {
      titulo,
      autor,
      categoria,
      isbn
    } = req.body;

    if (
      !titulo ||
      !autor ||
      !categoria ||
      !isbn
    ) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios"
      });
    }

    const resultado = await pool.query(
      `
      INSERT INTO libros
      (titulo, autor, categoria, isbn, disponible)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        titulo,
        autor,
        categoria,
        isbn,
        true
      ]
    );

    res.json({
      mensaje: "Libro registrado correctamente",
      libro: resultado.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al registrar libro"
    });

  }

});

/**
 * @swagger
 * /api/libros/{id}:
 *   delete:
 *     summary: Eliminar libro
 *     tags:
 *       - Libros
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Libro eliminado correctamente
 */

// ELIMINAR LIBRO
app.delete("/api/libros/:id", async (req, res) => {

  try {

    const id = req.params.id;

    await pool.query(
      "DELETE FROM libros WHERE id = $1",
      [id]
    );

    res.json({
      mensaje: "Libro eliminado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar libro"
    });

  }

});

/* ======================================
   USUARIOS
====================================== */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

// OBTENER USUARIOS
app.get("/api/usuarios", async (req, res) => {

  try {

    const resultado = await pool.query(
      "SELECT * FROM usuarios ORDER BY id ASC"
    );

    res.json(resultado.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener usuarios"
    });

  }

});

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Registrar usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               cedula:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 */

// REGISTRAR USUARIO
app.post("/api/usuarios", async (req, res) => {

  try {

    const {
      nombre,
      correo,
      cedula
    } = req.body;

    if (
      !nombre ||
      !correo ||
      !cedula
    ) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios"
      });
    }

    const resultado = await pool.query(
      `
      INSERT INTO usuarios
      (nombre, correo, cedula, rol)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        nombre,
        correo,
        cedula,
        "Estudiante"
      ]
    );

    res.json({
      mensaje: "Usuario registrado correctamente",
      usuario: resultado.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al registrar usuario"
    });

  }

});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 */

// ELIMINAR USUARIO
app.delete("/api/usuarios/:id", async (req, res) => {

  try {

    const id = req.params.id;

    await pool.query(
      "DELETE FROM usuarios WHERE id = $1",
      [id]
    );

    res.json({
      mensaje: "Usuario eliminado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar usuario"
    });

  }

});

/* ======================================
   PRESTAMOS
====================================== */

/**
 * @swagger
 * /api/prestamos:
 *   get:
 *     summary: Obtener préstamos
 *     tags:
 *       - Prestamos
 *     responses:
 *       200:
 *         description: Lista de préstamos
 */

// OBTENER PRESTAMOS
app.get("/api/prestamos", async (req, res) => {

  try {

    const resultado = await pool.query(
      "SELECT * FROM prestamos ORDER BY id ASC"
    );

    res.json(resultado.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener préstamos"
    });

  }

});

/**
 * @swagger
 * /api/prestamos:
 *   post:
 *     summary: Registrar préstamo
 *     tags:
 *       - Prestamos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cedula:
 *                 type: integer
 *               isbn:
 *                 type: string
 *               fechaPrestamo:
 *                 type: string
 *               fechaDevolucion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Préstamo registrado correctamente
 */

// REGISTRAR PRESTAMO
app.post("/api/prestamos", async (req, res) => {

  try {

    const {
      cedula,
      isbn,
      fechaPrestamo,
      fechaDevolucion
    } = req.body;

    if (
      !cedula ||
      !isbn ||
      !fechaPrestamo ||
      !fechaDevolucion
    ) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios"
      });
    }

    const usuario = await pool.query(
      `
      SELECT * FROM usuarios
      WHERE cedula = $1
      `,
      [cedula]
    );

    if (usuario.rows.length === 0) {

      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });

    }

    const libro = await pool.query(
      `
      SELECT * FROM libros
      WHERE isbn = $1
      `,
      [isbn]
    );

    if (libro.rows.length === 0) {

      return res.status(404).json({
        mensaje: "Libro no encontrado"
      });

    }

    if (!libro.rows[0].disponible) {

      return res.status(400).json({
        mensaje: "Libro no disponible"
      });

    }

    const resultado = await pool.query(
      `
      INSERT INTO prestamos
      (
        cedula,
        isbn,
        fechaPrestamo,
        fechaDevolucion,
        estado
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        cedula,
        isbn,
        fechaPrestamo,
        fechaDevolucion,
        "Prestado"
      ]
    );

    await pool.query(
      `
      UPDATE libros
      SET disponible = false
      WHERE isbn = $1
      `,
      [isbn]
    );

    res.json({
      mensaje: "Préstamo registrado correctamente",
      prestamo: resultado.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al registrar préstamo"
    });

  }

});

/* ======================================
   DEVOLVER LIBRO
====================================== */

/**
 * @swagger
 * /api/prestamos/devolver:
 *   put:
 *     summary: Devolver libro
 *     tags:
 *       - Prestamos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cedula:
 *                 type: integer
 *               isbn:
 *                 type: string
 *               fechaEntrega:
 *                 type: string
 *     responses:
 *       200:
 *         description: Libro devuelto correctamente
 */

app.put("/api/prestamos/devolver", async (req, res) => {

  try {

    const {
      cedula,
      isbn,
      fechaEntrega
    } = req.body;

    if (
      !cedula ||
      !isbn ||
      !fechaEntrega
    ) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios"
      });
    }

    const resultadoPrestamo = await pool.query(
      `
      SELECT * FROM prestamos
      WHERE cedula = $1
      AND isbn = $2
      AND estado = 'Prestado'
      `,
      [
        cedula,
        isbn
      ]
    );

    if (resultadoPrestamo.rows.length === 0) {

      return res.status(404).json({
        mensaje: "Préstamo no encontrado"
      });

    }

    await pool.query(
      `
      UPDATE prestamos
      SET
        estado = 'Devuelto',
        fechaEntrega = $1
      WHERE cedula = $2
      AND isbn = $3
      AND estado = 'Prestado'
      `,
      [
        fechaEntrega,
        cedula,
        isbn
      ]
    );

    await pool.query(
      `
      UPDATE libros
      SET disponible = true
      WHERE isbn = $1
      `,
      [isbn]
    );

    res.json({
      mensaje: "Libro devuelto correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al devolver libro"
    });

  }

});

/* ======================================
   SERVIDOR
====================================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
