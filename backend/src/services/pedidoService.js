import prisma from '../lib/prisma.js';
import {
  calcularPrecioPedido,
  parseExtras,
  EXTRAS_LABELS,
  PRECIOS_PLUS,
} from '../lib/precios.js';

const EXTRAS_VALIDOS = new Set(Object.keys(PRECIOS_PLUS));

function normalizarExtras(extras) {
  return parseExtras(extras).filter((id) => EXTRAS_VALIDOS.has(id));
}

const MODELO_UNICO = 'portalapicero';

export async function crearPedidoPersonalizado({
  nombre,
  correo,
  carrera,
  color,
  seleccion_favorita,
  texto_personalizado,
  modelo,
  extras,
}) {
  if (!nombre || !correo || !color || !seleccion_favorita) {
    throw new Error('nombre, correo, color y seleccion_favorita son requeridos');
  }

  const extrasList = normalizarExtras(extras);
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

  return { usuario, personalizacion, pedido, extrasList };
}

export async function consultarPedidosPorCorreo(correo) {
  const usuario = await prisma.usuario.findUnique({
    where: { correo },
    include: {
      pedidos: {
        include: { personalizacion: true },
        orderBy: { fecha: 'desc' },
        take: 5,
      },
    },
  });

  if (!usuario) {
    return { found: false, pedidos: [] };
  }

  return {
    found: true,
    nombre: usuario.nombre,
    pedidos: usuario.pedidos.map((p) => ({
      id: p.id,
      precio: p.precio,
      estado: p.estado,
      fecha: p.fecha,
      color: p.personalizacion?.color,
      seleccion: p.personalizacion?.seleccion_favorita,
      extras: parseExtras(p.personalizacion?.extras).map((id) => EXTRAS_LABELS[id] || id),
    })),
  };
}
