# Crear el repositorio en GitHub (una sola vez)

Sigue estos pasos **después** de revisar que no hay secretos en los archivos (`.env` debe estar solo en tu PC, no en el commit).

## 1. Verificar antes de subir

```powershell
cd c:\laragon\www\goaldesk-smart-2026
git status
```

No debe aparecer:

- `backend/.env`
- `frontend/.env`
- `node_modules/`
- `frontend/dist/`

## 2. Inicializar Git (si aún no existe)

```powershell
git init
git add .
git commit -m "docs: preparar repositorio para colaboración en equipo"
```

## 3. Repositorio en GitHub (activo)

- **URL:** https://github.com/Brendavarm/PROYECTO_PORTALAPICES
- **Rama principal:** `main`
- El código del monorepo GoalDesk Smart 2026 ya está publicado ahí.

## 4. Conectar y subir (si clonas en otra PC o es la primera vez)

```powershell
git branch -M main
git remote add origin https://github.com/Brendavarm/PROYECTO_PORTALAPICES.git
git push -u origin main
```

Si el remoto ya existe, usa `git remote set-url origin` en lugar de `git remote add`.

## 5. Invitar compañeros

En GitHub: **Settings → Collaborators → Add people**

Envíales:

- Enlace al repo
- [docs/COMO-EMPEZAR.md](docs/COMO-EMPEZAR.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)

**No envíes** tu archivo `.env`. Cada uno crea el suyo desde `.env.example`.

## 6. Contraseña admin en equipo

Acuerden una contraseña de desarrollo compartida solo por chat privado del grupo, o cada quien usa la suya en su `.env` local.

En producción usen secretos distintos en Render/Vercel.

## 7. Plantillas activas

El repo incluye:

- Plantilla de **Pull Request**
- Issues de **bug** y **mejora**

Aparecen solas al crear PR o Issue en GitHub.

## URL del repo en el proyecto

`package.json` → `repository.url` apunta a `https://github.com/Brendavarm/PROYECTO_PORTALAPICES.git`.
