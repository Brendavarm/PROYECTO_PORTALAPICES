import prisma from '../lib/prisma.js';

const PRECIOS_MODELO = {
  classic: 50,
  pro: 60,
  elite: 70,
};

export async function createPersonalizacion(req, res) {
  try {
    const {
      nombre,
      correo,
      carrera,
      color,
      seleccion_favorita,
      texto_personalizado,
      modelo,
    } = req.body;

    if (!nombre || !correo || !color || !seleccion_favorita || !modelo) {
      return res.status(400).json({
        error: 'nombre, correo, color, seleccion_favorita y modelo son requeridos',
      });
    }

    const usuario = await prisma.usuario.upsert({
      where: { correo },
      update: {
        nombre,
        carrera: carrera || 'Ingeniería de Sistemas',
      },
      create: {
        nombre,
        correo,
        carrera: carrera || 'Ingeniería de Sistemas',
      },
    });

    const personalizacion = await prisma.personalizacion.create({
      data: {
        usuario_id: usuario.id,
        color,
        seleccion_favorita,
        texto_personalizado: texto_personalizado || nombre,
        modelo,
      },
    });

    const precio = PRECIOS_MODELO[modelo] || 50;

    const pedido = await prisma.pedido.create({
      data: {
        usuario_id: usuario.id,
        personalizacion_id: personalizacion.id,
        precio,
        estado: 'pendiente',
      },
    });

    res.status(201).json({
      usuario,
      personalizacion,
      pedido,
      message: 'Personalización y pedido registrados exitosamente',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPersonalizaciones(req, res) {
  try {
    const items = await prisma.personalizacion.findMany({
      include: { usuario: true },
      orderBy: { fecha: 'desc' },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
