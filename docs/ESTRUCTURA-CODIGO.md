# Estructura del código

Árbol simplificado de lo que más vas a tocar.

```
goaldesk-smart-2026/
├── README.md                 # Resumen del proyecto
├── CONTRIBUTING.md           # Cómo colaborar en GitHub
├── package.json              # Scripts raíz (túnel, atajos dev)
├── docs/                     # Toda la documentación
│
├── frontend/
│   ├── public/images/        # Ilustraciones SVG (covers, producto)
│   ├── src/
│   │   ├── App.jsx           # Rutas principales
│   │   ├── main.jsx          # Entrada React + Router + tema
│   │   ├── index.css         # Estilos globales
│   │   ├── pages/            # Pantallas por URL
│   │   │   ├── LandingPage.jsx
│   │   │   ├── MundialHubPage.jsx
│   │   │   ├── CatalogPage.jsx
│   │   │   ├── CustomizerPage.jsx
│   │   │   ├── QRPage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx, Footer.jsx
│   │   │   ├── admin/        # Panel gestión (layout, login, gráficos)
│   │   │   ├── mundial/      # Contenido Copa 2026
│   │   │   ├── motion/       # Animaciones (Framer Motion)
│   │   │   └── ui/           # MediaImage, EditorialCard, iconos
│   │   ├── data/
│   │   │   ├── constants.js  # Precios, colores, curiosidades FIFA
│   │   │   ├── mundial2026.js
│   │   │   └── siteImages.js # Rutas de imágenes locales
│   │   ├── services/api.js   # Axios + token admin
│   │   ├── hooks/            # useQrBaseUrl, etc.
│   │   └── utils/            # Moneda BOB, URLs
│   ├── vite.config.js        # Proxy /api → backend, host 0.0.0.0
│   └── .env.example
│
└── backend/
    ├── prisma/
    │   ├── schema.prisma     # Modelo de datos
    │   └── seed.js           # Datos iniciales
    ├── src/
    │   ├── server.js
    │   ├── routes/index.js
    │   ├── controllers/
    │   ├── middleware/requireAdmin.js
    │   └── lib/network.js    # IP local para QR
    └── .env.example
```

## Dónde cambiar cosas habituales

| Quiero cambiar… | Archivo(s) |
|-----------------|------------|
| Precios Básico / Pro / Elite | `frontend/src/data/constants.js`, `backend/prisma/seed.js`, `personalizacionesController.js` |
| Textos de la página de inicio | `frontend/src/pages/LandingPage.jsx` |
| Info del Mundial (48 equipos, sedes) | `frontend/src/data/mundial2026.js` |
| Imagen del producto en hero | `frontend/public/images/covers/product-hero.svg` |
| Formulario de pedido | `frontend/src/pages/CustomizerPage.jsx` |
| API nueva | `backend/src/routes/index.js` + nuevo controlador |
| Tablas / campos en BD | `backend/prisma/schema.prisma` → luego `npm run db:push` |
| Estilos / colores del sitio | `frontend/src/index.css` (variables `:root`) |
| Estilos solo del admin | Clases `.admin-shell` en `index.css` + `components/admin/` |
| Contraseña admin | `backend/.env` → `ADMIN_PASSWORD` |

## Convenciones del equipo

- **Idioma UI:** español (Bolivia, moneda BOB).
- **Componentes:** PascalCase (`EditorialCard.jsx`).
- **Hooks:** prefijo `use` (`useQrBaseUrl.js`).
- **API:** prefijo `/api` en todas las rutas del backend.
- **Estilos:** Tailwind en JSX + clases propias en `index.css` para layout grande.
- **No subir** `.env`, `node_modules` ni `frontend/dist` (ver `.gitignore`).
