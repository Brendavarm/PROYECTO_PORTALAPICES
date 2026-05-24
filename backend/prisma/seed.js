import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CARRERAS = [
  'Ingeniería de Sistemas',
  'Ingeniería Industrial',
  'Administración de Empresas',
  'Diseño Gráfico',
  'Marketing',
];

const SELECCIONES = ['Argentina', 'Brasil', 'España', 'México', 'Estados Unidos', 'Alemania'];
const COLORES = ['dorado', 'azul', 'blanco', 'negro', 'verde'];
const MODELOS = ['classic', 'pro', 'elite'];

async function main() {
  await prisma.pedido.deleteMany();
  await prisma.personalizacion.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.producto.deleteMany();

  const productos = await Promise.all([
    prisma.producto.create({
      data: {
        nombre: 'GoalDesk Básico',
        descripcion: 'Organizador temática Mundial - plan de entrada',
        precio: 50,
        stock: 50,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: 'GoalDesk Pro',
        descripcion: 'Soporte celular reforzado + compartimentos premium',
        precio: 60,
        stock: 35,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: 'GoalDesk Elite',
        descripcion: 'Edición limitada con grabado láser personalizado',
        precio: 70,
        stock: 20,
      },
    }),
  ]);

  const estados = ['pendiente', 'imprimiendo', 'entregado'];
  const precios = [50, 60, 70];

  for (let i = 0; i < 24; i++) {
    const usuario = await prisma.usuario.create({
      data: {
        nombre: `Estudiante ${i + 1}`,
        correo: `estudiante${i + 1}@unifranz.edu.bo`,
        carrera: CARRERAS[i % CARRERAS.length],
      },
    });

    const color = COLORES[i % COLORES.length];
    const seleccion = SELECCIONES[i % SELECCIONES.length];
    const modelo = MODELOS[i % MODELOS.length];

    const personalizacion = await prisma.personalizacion.create({
      data: {
        usuario_id: usuario.id,
        color,
        seleccion_favorita: seleccion,
        texto_personalizado: usuario.nombre.split(' ')[1] || 'UNIFRANZ',
        modelo,
      },
    });

    await prisma.pedido.create({
      data: {
        usuario_id: usuario.id,
        personalizacion_id: personalizacion.id,
        precio: precios[i % precios.length],
        estado: estados[i % estados.length],
      },
    });

    if (i % 4 === 0) {
      const extraPers = await prisma.personalizacion.create({
        data: {
          usuario_id: usuario.id,
          color: COLORES[(i + 2) % COLORES.length],
          seleccion_favorita: SELECCIONES[(i + 1) % SELECCIONES.length],
          texto_personalizado: `${usuario.nombre} v2`,
          modelo: MODELOS[(i + 1) % MODELOS.length],
        },
      });
      await prisma.pedido.create({
        data: {
          usuario_id: usuario.id,
          personalizacion_id: extraPers.id,
          precio: precios[(i + 1) % precios.length],
          estado: 'pendiente',
        },
      });
    }
  }

  console.log(`Seed completado: ${productos.length} productos, 24 usuarios con pedidos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
