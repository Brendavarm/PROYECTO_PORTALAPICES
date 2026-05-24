import prisma from '../lib/prisma.js';

export async function getUsuarios(req, res) {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        personalizaciones: {
          orderBy: { fecha: 'desc' },
          include: { pedido: true },
        },
        pedidos: {
          orderBy: { fecha: 'desc' },
          include: { personalizacion: true },
        },
        _count: { select: { pedidos: true, personalizaciones: true } },
      },
      orderBy: { fecha_registro: 'desc' },
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createUsuario(req, res) {
  try {
    const { nombre, correo, carrera } = req.body;
    if (!nombre || !correo || !carrera) {
      return res.status(400).json({ error: 'nombre, correo y carrera son requeridos' });
    }
    const usuario = await prisma.usuario.upsert({
      where: { correo },
      update: { nombre, carrera },
      create: { nombre, correo, carrera },
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
