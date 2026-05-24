import prisma from '../lib/prisma.js';

export async function getPedidos(req, res) {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        usuario: true,
        personalizacion: true,
      },
      orderBy: { fecha: 'desc' },
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updatePedidoEstado(req, res) {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const estadosValidos = ['pendiente', 'imprimiendo', 'entregado'];

    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        error: `Estado inválido. Use: ${estadosValidos.join(', ')}`,
      });
    }

    const pedido = await prisma.pedido.update({
      where: { id: parseInt(id, 10) },
      data: { estado },
      include: {
        usuario: true,
        personalizacion: true,
      },
    });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
