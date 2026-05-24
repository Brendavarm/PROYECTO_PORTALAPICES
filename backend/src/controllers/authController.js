export async function adminLogin(req, res) {
  try {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminToken = process.env.ADMIN_TOKEN;

    if (!password || typeof password !== 'string' || !password.trim()) {
      return res.status(400).json({
        error: 'Escribe tu contraseña para poder iniciar sesión.',
      });
    }

    if (!adminPassword || !adminToken) {
      return res.status(503).json({
        error:
          'El inicio de sesión no está disponible ahora. Pide ayuda a quien configuró GoalDesk.',
      });
    }

    if (password !== adminPassword) {
      return res.status(401).json({
        error: 'La contraseña no es correcta. Revísala e inténtalo otra vez.',
      });
    }

    res.json({
      token: adminToken,
      message: 'Sesión admin iniciada',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
