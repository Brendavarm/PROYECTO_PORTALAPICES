# Configuración (variables de entorno)

Copia siempre desde `.env.example`. **Nunca** subas `.env` a GitHub.

## Backend — `backend/.env`

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `DATABASE_URL` | Sí | Conexión PostgreSQL. Ejemplo Laragon: `postgresql://postgres:TU_PASS@localhost:5432/goaldesk_smart_2026?schema=public` |
| `PORT` | No (default 5000) | Puerto del API |
| `HOST` | No | `0.0.0.0` permite acceso desde otra máquina en la red |
| `FRONTEND_URL` | Recomendada | Origen permitido en CORS (ej. `http://localhost:5173`) |
| `PUBLIC_APP_URL` | Para QR en internet | URL pública del frontend (túnel Cloudflare o Vercel) |
| `ADMIN_PASSWORD` | Sí | Contraseña que escribe el usuario en `/admin` |
| `ADMIN_TOKEN` | Sí | Secreto que devuelve el API tras login; debe ser largo y aleatorio |

## Frontend — `frontend/.env`

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `VITE_API_URL` | Sí en dev | Usar `/api` para que Vite haga proxy al backend |
| `VITE_APP_URL` | Opcional | URL base para generar QR (IP local o dominio público) |
| `VITE_INSTAGRAM_URL` | Opcional | Instagram oficial (default: @goaldesk_franz) |
| `VITE_TIKTOK_URL` | Opcional | TikTok oficial (default: @goaldesk_franz) |
| `VITE_SOCIAL_URL` | Opcional | Alias legado de Instagram |

## Ejemplo mínimo para desarrollo local

**backend/.env**

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/goaldesk_smart_2026?schema=public"
PORT=5000
HOST=0.0.0.0
FRONTEND_URL=http://localhost:5173
ADMIN_PASSWORD=goaldesk2026
ADMIN_TOKEN=cambiar-por-un-token-largo-en-produccion
```

**frontend/.env**

```env
VITE_API_URL=/api
VITE_INSTAGRAM_URL=https://www.instagram.com/goaldesk_franz
VITE_TIKTOK_URL=https://www.tiktok.com/@goaldesk_franz
```

## Producción

- Genera `ADMIN_PASSWORD` y `ADMIN_TOKEN` nuevos.
- En Neon/Render/Vercel configura las mismas variables en el panel del proveedor.
- `PUBLIC_APP_URL` debe ser la URL final del frontend (HTTPS).
