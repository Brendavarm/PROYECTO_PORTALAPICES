# Publicar GoalDesk para que cualquiera entre (otra WiFi, datos móviles)

Tu ingeniero **no puede** usar `localhost` ni solo la IP `192.168.x.x`. Necesitas una **URL pública en internet**.

## ¿Qué opción usar?

| Opción | Cuándo | URL fija | Dificultad |
|--------|--------|----------|------------|
| **A. Cloudflare Tunnel** | Presentación esta semana | No (cambia al cerrar) | Fácil |
| **B. Vercel + Render + Neon** | Proyecto final / QR impreso | Sí | Media |

**Recomendación:** usa **A hoy** para mostrar al ingeniero; luego **B** para dejar el link en el informe.

---

## Opción A — Túnel Cloudflare (15 minutos, gratis)

Mientras tu PC esté encendida con backend + frontend + túnel, **cualquier persona con el link** puede entrar.

### 1. Instalar cloudflared (una vez)

En PowerShell (como administrador si hace falta):

```powershell
winget install --id Cloudflare.cloudflared -e
```

Cierra y abre la terminal. Verifica:

```powershell
cloudflared --version
```

### 2. Arrancar el proyecto (2 terminales)

```powershell
cd c:\laragon\www\goaldesk-smart-2026\backend
npm run dev
```

```powershell
cd c:\laragon\www\goaldesk-smart-2026\frontend
npm run dev
```

### 3. Abrir el túnel (3ª terminal)

```powershell
cd c:\laragon\www\goaldesk-smart-2026
npm run tunnel:cloudflare
```

Verás una línea como:

```text
https://algo-random.trycloudflare.com
```

**Copia esa URL** (con `https://`).

### 4. Configurar el QR y reiniciar backend

En `backend\.env` agrega o edita:

```env
PUBLIC_APP_URL=https://algo-random.trycloudflare.com
```

Guarda y **reinicia** el backend (`Ctrl+C` y otra vez `npm run dev`).

Abre en el PC: `http://localhost:5173/qr` — el QR debe mostrar tu URL `trycloudflare.com`.

### 5. Probar como tu ingeniero

En el celular **con datos móviles** (sin tu WiFi), abre la misma URL. Si carga, listo.

**Envía a tu ingeniero:** la URL de Cloudflare + contraseña admin si debe revisar el panel.

### Notas opción A

- Si cierras la terminal del túnel, el link deja de funcionar.
- Cada vez que abres el túnel puede cambiar la URL → actualiza `PUBLIC_APP_URL` y reinicia backend.
- Alternativa sin instalar: `npm run tunnel:lt` (localtunnel; a veces es más lento).

---

## Opción B — Nube (link fijo, ideal para el proyecto)

Stack recomendado (planes gratis):

1. **Neon** — PostgreSQL en la nube  
2. **Render** — API Express  
3. **Vercel** — sitio React  

### Paso 1: Base de datos en Neon

1. Entra en [neon.tech](https://neon.tech) y crea cuenta.  
2. Crea proyecto → copia **Connection string** (PostgreSQL).  
3. Ejemplo: `postgresql://usuario:pass@ep-xxx.neon.tech/neondb?sslmode=require`

### Paso 2: API en Render

1. Sube el proyecto a **GitHub** (si aún no está).  
2. [render.com](https://render.com) → **New Web Service** → conecta el repo.  
3. Configuración:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npx prisma generate && npx prisma db push`
   - **Start Command:** `npm start`
4. Variables de entorno en Render:

| Variable | Valor |
|----------|--------|
| `DATABASE_URL` | Tu connection string de Neon |
| `NODE_ENV` | `production` |
| `ADMIN_PASSWORD` | Tu contraseña |
| `ADMIN_TOKEN` | Un token largo secreto |
| `FRONTEND_URL` | La URL de Vercel (paso 3), ej. `https://goaldesk.vercel.app` |
| `PUBLIC_APP_URL` | La misma URL de Vercel |

5. Despliega. Copia la URL de Render, ej. `https://goaldesk-api.onrender.com`

6. En Render → **Shell** o local con `DATABASE_URL` de Neon:

```bash
npm run db:seed
```

### Paso 3: Frontend en Vercel

1. [vercel.com](https://vercel.com) → **Add New Project** → importa el repo.  
2. **Root Directory:** `frontend`  
3. Variables de entorno:

| Variable | Valor |
|----------|--------|
| `VITE_API_URL` | `https://goaldesk-api.onrender.com/api` |
| `VITE_APP_URL` | `https://tu-proyecto.vercel.app` (la da Vercel al desplegar) |
| `VITE_INSTAGRAM_URL` / `VITE_TIKTOK_URL` | @goaldesk_franz (oficial) |

4. Deploy.  
5. Vuelve a Render y actualiza `FRONTEND_URL` y `PUBLIC_APP_URL` con la URL real de Vercel. Redeploy API si hace falta.

### Paso 4: QR definitivo

Abre `https://tu-proyecto.vercel.app/qr` — el QR ya es público para siempre (sin tu PC encendida).

---

## Resumen para tu ingeniero

- **WiFi local:** `http://192.168.x.x:5173`  
- **Túnel temporal:** `https://xxxx.trycloudflare.com`  
- **Producción:** `https://tu-proyecto.vercel.app`

---

## Problemas frecuentes

| Problema | Solución |
|----------|----------|
| QR sigue con localhost | Pon `PUBLIC_APP_URL` en `backend/.env` y reinicia backend |
| Celular no carga el túnel | Backend y frontend deben estar activos; túnel abierto |
| API error en Vercel | Revisa `VITE_API_URL` apunta a Render con `/api` al final |
| Render dormido (free) | Primera visita tarda ~30 s en despertar |
