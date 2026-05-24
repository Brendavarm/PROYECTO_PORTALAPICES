# Seguridad

## No subir al repositorio

- `backend/.env` y `frontend/.env`
- Contraseñas reales de PostgreSQL
- `ADMIN_PASSWORD` y `ADMIN_TOKEN` de producción
- Claves de API o tokens de túneles

Usa siempre `.env.example` como plantilla.

## Desarrollo

- Cambia `ADMIN_TOKEN` por un valor largo y aleatorio en cada entorno.
- En producción (Render/Vercel) configura variables en el panel del proveedor, no en el código.

## Reportar un problema

Si encuentras una fuga de credenciales en el historial de Git, avisa al líder del equipo de inmediato y rota contraseñas/tokens.
