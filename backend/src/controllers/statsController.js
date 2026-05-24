import prisma from '../lib/prisma.js';

export async function getStats(req, res) {
  try {
    const [totalPedidos, pedidos, personalizaciones, usuarios] = await Promise.all([
      prisma.pedido.count(),
      prisma.pedido.findMany({ include: { usuario: true } }),
      prisma.personalizacion.findMany(),
      prisma.usuario.findMany({ include: { pedidos: true } }),
    ]);

    const ingresosEstimados = pedidos.reduce((sum, p) => sum + p.precio, 0);
    const ventasTotales = pedidos.filter((p) => p.estado === 'entregado').length;

    const seleccionCount = {};
    personalizaciones.forEach((p) => {
      seleccionCount[p.seleccion_favorita] =
        (seleccionCount[p.seleccion_favorita] || 0) + 1;
    });

    const colorCount = {};
    personalizaciones.forEach((p) => {
      colorCount[p.color] = (colorCount[p.color] || 0) + 1;
    });

    const carreraCount = {};
    usuarios.forEach((u) => {
      const pedidosCarrera = u.pedidos.length;
      if (pedidosCarrera > 0) {
        carreraCount[u.carrera] = (carreraCount[u.carrera] || 0) + pedidosCarrera;
      }
    });

    const estadoCount = {};
    pedidos.forEach((p) => {
      estadoCount[p.estado] = (estadoCount[p.estado] || 0) + 1;
    });

    const toSortedArray = (obj) =>
      Object.entries(obj)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    res.json({
      totalPedidos,
      ingresosEstimados: Math.round(ingresosEstimados * 100) / 100,
      ventasTotales,
      totalUsuarios: usuarios.length,
      seleccionesPopulares: toSortedArray(seleccionCount),
      coloresPopulares: toSortedArray(colorCount),
      carrerasPopulares: toSortedArray(carreraCount),
      pedidosPorEstado: toSortedArray(estadoCount),
      pedidosRecientes: pedidos.slice(0, 10),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
