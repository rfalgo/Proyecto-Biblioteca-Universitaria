const express = require("express");

const router = express.Router();

/* ======================================
   BASE DE DATOS TEMPORAL
====================================== */

let usuarios = [
  {
    id: 1,
    nombre: "Juan Pérez",
    correo: "juan@universidad.edu",
    cedula: 1002456789,
    rol: "Estudiante"
  }
];

/* ======================================
   OBTENER USUARIOS
====================================== */

router.get("/", (req, res) => {
  res.json(usuarios);
});

/* ======================================
   REGISTRAR USUARIO
====================================== */

router.post("/", (req, res) => {

  const {
    nombre,
    correo,
    cedula
  } = req.body;

  // VALIDAR CAMPOS
  if (
    !nombre ||
    !correo ||
    !cedula
  ) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios"
    });
  }

  // VALIDAR CÉDULA NUMÉRICA
  if (isNaN(cedula)) {
    return res.status(400).json({
      mensaje: "La cédula debe ser numérica"
    });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    correo,
    cedula: Number(cedula),
    rol: "Estudiante"
  };

  usuarios.push(nuevoUsuario);

  res.json({
    mensaje: "Usuario registrado correctamente",
    usuario: nuevoUsuario
  });

});

/* ======================================
   ELIMINAR USUARIO
====================================== */

router.delete("/:id", (req, res) => {

  const id = Number(req.params.id);

  usuarios = usuarios.filter(
    usuario => usuario.id !== id
  );

  res.json({
    mensaje: "Usuario eliminado correctamente"
  });

});

module.exports = router;