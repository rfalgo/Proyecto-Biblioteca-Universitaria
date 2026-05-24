# 📚 Sistema de Gestión Bibliotecaria

Sistema web desarrollado para la administración de libros, usuarios y préstamos de una biblioteca universitaria.

---

# 🚀 Tecnologías utilizadas

## Backend
- Node.js
- Express.js
- PostgreSQL
- Swagger UI
- CORS

## Frontend
- React
- Vite
- React Router DOM
- Axios

## Base de Datos
- PostgreSQL Render

---

# 📂 Estructura del Proyecto

```bash
GESTION-BIBLIOTECA/
├── backend/
│   ├── routes/
│   │   ├── libros.js
│   │   ├── prestamos.js
│   │   └── usuarios.js
│   ├── swagger/
│   │   └── swagger.js
│   ├── db.js
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── LibroList.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Prestamos.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── AdminPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Libros.jsx
│   │   │   └── PrestamosPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── routes.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# ⚙️ Instalación Local

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/rfalgo/Proyecto-Biblioteca-Universitaria.git
```

---

## 2️⃣ Entrar al proyecto

```bash
cd gestion-biblioteca
```

---

# 🔧 Configuración Backend

## Entrar al backend

```bash
cd backend
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar servidor

```bash
npm start
```

Servidor disponible en:

```bash
http://localhost:3000
```

---

# 🎨 Configuración Frontend

## Entrar al frontend

```bash
cd frontend
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar aplicación

```bash
npm run dev
```

Frontend disponible en:

```bash
Local:   http://localhost:5173/
Network: http://192.168.2.3:5173/
```

---

# 🗄️ Base de Datos

El proyecto utiliza PostgreSQL alojado en Render.

## Tablas principales

- libros
- usuarios
- prestamos

---

# 📘 Swagger API

Swagger permite probar todos los endpoints de la API REST.

## Ruta Swagger

```bash
http://localhost:3000/api-docs
```

---

# 📚 Endpoints Principales

## Libros

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/libros | Obtener libros |
| POST | /api/libros | Registrar libro |
| DELETE | /api/libros/:id | Eliminar libro |

---

## Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/usuarios | Obtener usuarios |
| POST | /api/usuarios | Registrar usuario |
| DELETE | /api/usuarios/:id | Eliminar usuario |

---

## Préstamos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/prestamos | Obtener préstamos |
| POST | /api/prestamos | Registrar préstamo |
| PUT | /api/prestamos/devolver | Devolver libro |

---

# ✅ Funcionalidades

- CRUD de libros
- CRUD de usuarios
- Gestión de préstamos
- Devolución de libros
- Validación de disponibilidad
- Persistencia en PostgreSQL
- API REST
- Swagger Documentation
- Frontend React
- Backend Express

---

# ☁️ Despliegue

## Backend Render

```bash
https://proyecto-biblioteca-universitaria.onrender.com
```

## Swagger Render

```bash
https://proyecto-biblioteca-universitaria.onrender.com/api-docs
```

## Frontend Render

```bash
https://proyecto-biblioteca-universitaria-1.onrender.com
```
