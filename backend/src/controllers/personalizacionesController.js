import prisma from '../lib/prisma.js';
import { crearPedidoPersonalizado } from '../services/pedidoService.js';

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

    const { usuario, personalizacion, pedido } = await crearPedidoPersonalizado({
      nombre,
      correo,
      carrera,
      color,
      seleccion_favorita,
      texto_personalizado,
      modelo,
      extras,
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
