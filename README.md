# 🍕 Pizzería Mamma Mia

Proyecto **full-stack** de una pizzería con catálogo de pizzas, carrito de compras y autenticación de usuarios basada en JWT.

El frontend consume una API REST propia que gestiona usuarios, pizzas y un checkout simulado, con protección de rutas mediante tokens JWT.

---

## ✨ Funcionalidades

-  **Catálogo de pizzas** con vista de detalle por pizza.
-  **Carrito de compras** con gestión de cantidades y total (Context API).
-  **Autenticación JWT** — registro, login y perfil de usuario (`/api/auth/me`).
-  **Checkout simulado** protegido con token Bearer.
-  Rutas públicas y privadas con React Router (Login, Register, Profile, Cart, 404).
-  Notificaciones con `react-hot-toast` e íconos con `lucide-react`.

---

##  Stack tecnológico

### Frontend (`/frontend`)

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | Librería de UI |
| [React Router 8](https://reactrouter.com/) | Enrutamiento SPA |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilos utility-first |
| [Vite 8](https://vite.dev/) | Bundler y dev server |
| [lucide-react](https://lucide.dev/) | Íconos |
| [react-hot-toast](https://react-hot-toast.com/) | Notificaciones toast |
| [@vercel/analytics](https://vercel.com/docs/analytics) | Analíticas de despliegue |

Gestión de estado global con **React Context** (`Cart`, `User`, `Pizzas`).

### Backend (`/backend`)

| Tecnología | Uso |
|---|---|
| [Node.js](https://nodejs.org/) | Entorno de ejecución |
| [Express 4](https://expressjs.com/) | Framework web / API REST |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | Autenticación JWT |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | Manejo de cookies |
| [cors](https://github.com/expressjs/cors) | Control de orígenes permitidos |
| [dotenv](https://github.com/motdotla/dotenv) | Variables de entorno |
| [nanoid](https://github.com/ai/nanoid) | Generación de IDs |
| [node:crypto](https://nodejs.org/api/crypto.html) | Hash de contraseñas con scrypt |
| [nodemon](https://nodemon.io/) | Recarga automática en desarrollo |

Persistencia mediante **archivos JSON** (`db/*.json`) — sin base de datos. Arquitectura por capas: `routes → controllers → models → middlewares`.

> 🔐 Las contraseñas **nunca se guardan en texto plano**: se hashean con `scrypt` (salt aleatoria por usuario y comparación en tiempo constante). Cuenta demo incluida en el repo: `test@example.com` / `123123`.

---

## Estructura del proyecto

```
pizzeria/
├── frontend/
│   └── src/
│       ├── components/   # Navbar, Footer, CardPizza, Header
│       ├── contexts/     # Cart, User, Pizzas
│       ├── pages/        # Home, Pizza, Cart, Login, Register, Profile, NotFound
│       ├── App.jsx
│       └── main.jsx
└── backend/
    ├── controllers/
    ├── middlewares/      # Verificación de token JWT
    ├── models/           # Persistencia en JSON
    ├── routes/
    ├── utils/
    └── index.js
```

---

## Instalación y ejecución

Requisitos: **Node.js ≥ 18**

### Backend

```bash
cd backend
npm install
npm run dev
```

El servidor corre por defecto en `http://localhost:5000`.

Variables de entorno (`.env`):

```env
PORT=5000
FRONTEND_URL=http://localhost:5173   # Orígenes permitidos por CORS (separar varios con comas)
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

La app corre por defecto en `http://localhost:5173`.

Variables de entorno (`.env`):

```env
VITE_API_URL=http://localhost:5000
```

---

## API Endpoints

### Auth

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/auth/register` | Registro de usuario |
| `POST` | `/api/auth/login` | Login — devuelve token JWT |
| `GET` | `/api/auth/me` | Perfil del usuario autenticado 🔒 |

### Pizzas

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/pizzas` | Listar pizzas |
| `GET` | `/api/pizzas/:id` | Detalle de una pizza |

### Checkout

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/checkouts` | Procesar compra (simulada) 🔒 |

 *Requiere header `Authorization: Bearer <token>`*

---

##  Licencia

ISC
