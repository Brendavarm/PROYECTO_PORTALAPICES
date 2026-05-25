import prisma from '../lib/prisma.js';
import { calcularPrecioPedido, parseExtras } from '../lib/precios.js';

const MODELO_UNICO = 'portalapicero';

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
      extras,
    } = req.body;

    if (!nombre || !correo || !color || !seleccion_favorita) {
      return res.status(400).json({
        error: 'nombre, correo, color y seleccion_favorita son requeridos',
      });
    }

    const extrasList = parseExtras(extras);
    const extrasJson = JSON.stringify(extrasList);

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
        modelo: modelo || MODELO_UNICO,
        extras: extrasJson,
      },
    });

    const precio = calcularPrecioPedido(extrasList);

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
