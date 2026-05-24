import prisma from '../lib/prisma.js';

export async function getProductos(req, res) {
  try {
    const productos = await prisma.producto.findMany({
      orderBy: { precio: 'asc' },
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
