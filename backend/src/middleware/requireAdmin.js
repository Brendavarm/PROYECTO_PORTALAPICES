export function requireAdmin(req, res, next) {
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    console.warn('ADMIN_TOKEN no configurado — rutas admin desprotegidas');
    return next();
  }

  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

  if (token === adminToken) {
    return next();
  }

  return res.status(401).json({ error: 'Acceso no autorizado. Inicia sesión en el panel admin.' });
}
