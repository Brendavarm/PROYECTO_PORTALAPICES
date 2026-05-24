# Cómo empezar (compañeros del equipo)

Guía para levantar el proyecto en **Windows con Laragon** (o Node + PostgreSQL en cualquier SO).

## Requisitos

- **Node.js 18+** (recomendado 20 LTS)
- **PostgreSQL** en ejecución
- **npm** (viene con Node)
- Opcional: [Laragon](https://laragon.org/) con PostgreSQL activo

## 1. Clonar el repositorio

```bash
git clone https://github.com/Brendavarm/PROYECTO_PORTALAPICES.git
cd PROYECTO_PORTALAPICES
```

## 2. Base de datos

En pgAdmin, HeidiSQL o consola SQL:

```sql
CREATE DATABASE goaldesk_smart_2026;
```

Anota usuario y contraseña de PostgreSQL (en Laragon suele ser `postgres` + tu contraseña).

## 3. Backend (API)

```powershell
cd backend
copy .env.example .env
```

Edita `backend/.env`:

- `DATABASE_URL` — con tu usuario, contraseña y nombre de BD
- `ADMIN_PASSWORD` — contraseña del panel `/admin` (solo para desarrollo)
- `ADMIN_TOKEN` — texto largo aleatorio (no lo compartas en público)

Luego:

```powershell
npm install
npm run db:push
npm run db:seed
npm run dev
```

Comprueba: abre `http://localhost:5000/api/health` — debe responder JSON con `status: "ok"`.

## 4. Frontend (web)

**Otra terminal:**

```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

Abre: `http://localhost:5173`

El frontend usa `VITE_API_URL=/api` y Vite redirige las peticiones al backend en el puerto 5000.

## 5. Probar el flujo completo

1. Inicio → explorar Mundial → Catálogo  
2. **Personalizar** → llenar formulario → confirmar pedido  
3. **Admin** → contraseña de `ADMIN_PASSWORD` → ver pedidos y estadísticas  

## Comandos útiles

| Comando | Dónde | Qué hace |
|---------|-------|----------|
| `npm run dev` | `backend/` | API con recarga automática |
| `npm run dev` | `frontend/` | Sitio en puerto 5173 |
| `npm run db:seed` | `backend/` | Datos de prueba y productos |
| `npm run db:studio` | `backend/` | Ver tablas en el navegador (Prisma Studio) |
| `npm run dev:backend` | raíz | Atajo al backend |
| `npm run dev:frontend` | raíz | Atajo al frontend |

## Problemas frecuentes

**“No se pudo cargar datos del servidor” en admin**  
→ El backend no está corriendo o `DATABASE_URL` es incorrecta.

**Pedido no se guarda**  
→ Revisa consola del backend; ejecuta `npm run db:push` y `npm run db:seed`.

**QR no abre en el celular**  
→ No uses `localhost` en el móvil. Lee [PUBLICAR-EN-INTERNET.md](./PUBLICAR-EN-INTERNET.md).

**Puerto 5000 ocupado**  
→ Cambia `PORT` en `backend/.env` y el proxy en `frontend/vite.config.js`.

## Siguiente lectura

- [ESTRUCTURA-CODIGO.md](./ESTRUCTURA-CODIGO.md) — dónde modificar cada cosa  
- [CONTRIBUTING.md](../CONTRIBUTING.md) — reglas para subir cambios al repo  
