const express = require("express");

const router = express.Router();

let prestamos = [];

/**
 * ======================================
 * OBTENER PRÉSTAMOS
 * ======================================
 */

router.get("/", (req, res) => {
  res.json(prestamos);
});

/**
 * ======================================
 * REGISTRAR PRÉSTAMO
 * ======================================
 */

router.post("/", (req, res) => {

  const {
    cedula,
    isbn,
    fechaPrestamo,
    fechaDevolucion
  } = req.body;

  // VALIDAR CAMPOS

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

  const nuevoPrestamo = {
    id: prestamos.length + 1,
    cedula: Number(cedula),
    isbn,
    fechaPrestamo,
    fechaDevolucion,
    estado: "Prestado"
  };

  prestamos.push(nuevoPrestamo);

  res.json({
    mensaje: "Préstamo registrado correctamente",
    prestamo: nuevoPrestamo
  });

});

module.exports = router;