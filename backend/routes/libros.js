const express = require("express");

const router = express.Router();

let libros = [
  {
    id: 1,
    titulo: "Clean Code",
    autor: "Robert Martin",
    categoria: "Programación",
    tiempoPrestamo: 15,
    disponible: true
  },
  {
    id: 2,
    titulo: "Humor Moderno",
    autor: "Jon Duckett",
    categoria: "Humor",
    tiempoPrestamo: 10,
    disponible: false
  }
];

/**
 * @swagger
 * /api/libros:
 *   get:
 *     summary: Obtener lista de libros
 *     responses:
 *       200:
 *         description: Lista de libros
 */

router.get("/", (req, res) => {
  res.json(libros);
});

/**
 * @swagger
 * /api/libros:
 *   post:
 *     summary: Registrar un libro
 */

router.post("/", (req, res) => {
  const {
    titulo,
    autor,
    categoria,
    tiempoPrestamo
  } = req.body;

  const nuevoLibro = {
    id: libros.length + 1,
    titulo,
    autor,
    categoria,
    tiempoPrestamo,
    disponible: true
  };

  libros.push(nuevoLibro);

  res.status(201).json(nuevoLibro);
});

module.exports = router;