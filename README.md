# GoalDesk Smart 2026

Sistema web full stack para el emprendimiento de **Ingeniería de Sistemas — UNIFRANZ**.

Organizador de escritorio impreso en 3D con temática **Copa Mundial FIFA 2026**: catálogo, personalización de pedidos, código QR y panel de gestión.

**Repositorio:** [github.com/Brendavarm/PROYECTO_PORTALAPICES](https://github.com/Brendavarm/PROYECTO_PORTALAPICES)

---

## Inicio rápido

| Paso | Acción |
|------|--------|
| 1 | Clonar el repo e instalar dependencias (ver abajo) |
| 2 | Crear BD PostgreSQL `goaldesk_smart_2026` |
| 3 | Configurar `backend/.env` y `frontend/.env` desde los `.env.example` |
| 4 | Terminal 1: `cd backend && npm run db:push && npm run db:seed && npm run dev` |
| 5 | Terminal 2: `cd frontend && npm run dev` |
| 6 | Abrir `http://localhost:5173` |

Guía detallada para el equipo: **[docs/COMO-EMPEZAR.md](docs/COMO-EMPEZAR.md)**

---

## Documentación

| Enlace | Contenido |
|--------|-----------|
| [docs/README.md](docs/README.md) | Índice de toda la documentación |
| [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) | Frontend ↔ API ↔ PostgreSQL |
| [docs/ESTRUCTURA-CODIGO.md](docs/ESTRUCTURA-CODIGO.md) | Carpetas y archivos importantes |
| [docs/CONFIGURACION.md](docs/CONFIGURACION.md) | Variables de entorno |
| [docs/FLUJO-DE-DATOS.md](docs/FLUJO-DE-DATOS.md) | Pedidos y panel admin |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Cómo colaborar en GitHub |
| [docs/PUBLICAR-EN-INTERNET.md](docs/PUBLICAR-EN-INTERNET.md) | Túnel, Vercel, Render |

---

## Arquitectura

```text
frontend/   React + Vite (:5173)
     │  proxy /api
     ▼
backend/    Express (:5000) + Prisma
     ▼
PostgreSQL  goaldesk_smart_2026
```

---

## Estructura del repositorio

```text
goaldesk-smart-2026/
├── frontend/     Interfaz web (público + /admin)
├── backend/      API REST y base de datos
├── docs/         Guías del equipo
├── package.json  Scripts raíz (túnel, atajos)
└── README.md
```

---

## Stack

| Capa | Tecnologías |
|------|-------------|
| Frontend | React 19, Vite, Tailwind CSS 4, Framer Motion, Chart.js, React Router |
| Backend | Node.js, Express 5, Prisma |
| Base de datos | PostgreSQL |

---

## Rutas de la aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal y producto |
| `/mundial` | Centro informativo Copa 2026 |
| `/catalogo` | Modelos y precios (BOB) |
| `/personalizar` | Formulario de pedido |
| `/qr` | Código QR del emprendimiento |
| `/admin` | Gestión (pedidos, clientes, ingresos) — requiere contraseña |

---

## API (resumen)

Base: `http://localhost:5000/api`

| Método | Ruta | Auth |
|--------|------|------|
| GET | `/health` | No |
| POST | `/personalizaciones` | No (crea pedido) |
| GET | `/productos` | No |
| POST | `/admin/login` | No |
| GET | `/stats`, `/pedidos`, `/usuarios` | Admin |
| PATCH | `/pedidos/:id/estado` | Admin |

Rutas con candado requieren header `Authorization: Bearer <ADMIN_TOKEN>` tras iniciar sesión.

---

## Instalación completa

### Backend

```powershell
cd backend
copy .env.example .env
# Editar DATABASE_URL, ADMIN_PASSWORD, ADMIN_TOKEN
npm install
npm run db:push
npm run db:seed
npm run dev
```

### Frontend

```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

### Scripts desde la raíz

```powershell
npm run dev:backend
npm run dev:frontend
npm run tunnel:cloudflare   # demo pública temporal
```

---

## Panel administrador

En `backend/.env`:

```env
ADMIN_PASSWORD=tu_contraseña_desarrollo
ADMIN_TOKEN=un_secreto_largo_aleatorio
```

Entra en `/admin` con la contraseña. **No compartas** el token ni subas `.env` al repositorio.

---

## Modelo de datos

- **Usuario** — quien personaliza y pide
- **Personalizacion** — color, selección, modelo, texto
- **Pedido** — precio, estado (`pendiente` | `imprimiendo` | `entregado`)
- **Producto** — catálogo (Básico Bs 50, Pro Bs 60, Elite Bs 70)

Esquema: `backend/prisma/schema.prisma`

---

## Colaborar

Lee **[CONTRIBUTING.md](CONTRIBUTING.md)** antes de abrir un Pull Request.

1. Crea rama `feature/tu-tema`
2. Cambios pequeños y probados
3. PR hacia `main` con descripción y pasos para probar

---

## Proyecto académico

**Universidad:** UNIFRANZ  
**Carrera:** Ingeniería de Sistemas  
**Año:** 2026  

Licencia: uso académico del emprendimiento — ver repositorio para detalles del equipo.
