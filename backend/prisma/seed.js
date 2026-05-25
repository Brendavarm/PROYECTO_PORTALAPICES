import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CARRERAS = [
  'Ingeniería de Sistemas',
  'Ingeniería Industrial',
  'Administración de Empresas',
  'Diseño Gráfico',
  'Marketing',
];

const SELECCIONES = [
  'Argentina', 'Brasil', 'Colombia', 'Ecuador', 'Paraguay', 'Uruguay',
  'México', 'Estados Unidos', 'Canadá', 'España', 'Francia', 'Alemania',
  'Japón', 'Marruecos', 'Portugal', 'Inglaterra',
];

const COLORES = ['dorado', 'azul', 'blanco', 'negro', 'verde'];

const EXTRAS_POOL = [
  [],
  ['compartimiento_extra'],
  ['dos_compartimientos_extra'],
  ['compartimiento_extra', 'grabado_destacado'],
  ['soporte_celular_ancho'],
  ['grabado_destacado'],
  ['compartimiento_extra', 'soporte_celular_ancho'],
];

/** Clientes simulados — nombres completos y texto para grabado en el portalapicero */
const PERSONAS = [
  { nombre: 'María Fernanda Quispe', grabado: 'MARÍA F.' },
  { nombre: 'Carlos Eduardo Mamani', grabado: 'CARLOS M.' },
  { nombre: 'Ana Lucía Vargas', grabado: 'ANA LUCÍA' },
  { nombre: 'Diego Armando Rojas', grabado: 'DIEGO R.' },
  { nombre: 'Valentina Soto Mercado', grabado: 'VALENTINA' },
  { nombre: 'José Luis Condori', grabado: 'JOSÉ LUIS' },
  { nombre: 'Camila Andrea Pérez', grabado: 'CAMILA' },
  { nombre: 'Rodrigo Alejandro Flores', grabado: 'RODRIGO' },
  { nombre: 'Sofía Isabel Aguilar', grabado: 'SOFÍA A.' },
  { nombre: 'Miguel Ángel Gutierrez', grabado: 'MIGUEL' },
  { nombre: 'Luciana Paz Herrera', grabado: 'LUCIANA' },
  { nombre: 'Fernando Choque', grabado: 'FER CHOQUE' },
  { nombre: 'Gabriela Montaño', grabado: 'GABY' },
  { nombre: 'Andrés Felipe Castro', grabado: 'ANDRÉS C.' },
  { nombre: 'Daniela Estefany Lima', grabado: 'DANIELA' },
  { nombre: 'Pablo Sebastián Vera', grabado: 'PABLO V.' },
  { nombre: 'Isabella Morales', grabado: 'ISA MORALES' },
  { nombre: 'Renato Villca', grabado: 'RENATO' },
  { nombre: 'Natalia Jiménez', grabado: 'NATY' },
  { nombre: 'Hugo Marcelo Sandoval', grabado: 'HUGO S.' },
  { nombre: 'Elena Patricia Bustillos', grabado: 'ELENA P.' },
  { nombre: 'Mateo Delgadillo', grabado: 'MATEO' },
  { nombre: 'Jimena Salazar', grabado: 'JIMENA' },
  { nombre: 'Óscar Iván Peña', grabado: 'ÓSCAR PEÑA' },
];

function precioDesdeExtras(extras) {
  const map = {
    compartimiento_extra: 10,
    dos_compartimientos_extra: 18,
    grabado_destacado: 8,
    soporte_celular_ancho: 6,
  };
  return 50 + extras.reduce((s, id) => s + (map[id] ?? 0), 0);
}

function correoUnifranz(nombreCompleto, indice) {
  const sinAcentos = nombreCompleto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const partes = sinAcentos.replace(/[^a-z\s]/g, '').trim().split(/\s+/).filter(Boolean);
  const local =
    partes.length >= 2 ? `${partes[0]}.${partes[partes.length - 1]}` : partes[0] || 'alumno';
  return `${local}${indice}@unifranz.edu.bo`;
}

async function main() {
  await prisma.pedido.deleteMany();
  await prisma.personalizacion.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.producto.deleteMany();

  await prisma.producto.create({
    data: {
      nombre: 'GoalDesk Portalapicero',
      descripcion:
        'Organizador balón con soporte para celular, compartimentos estándar y base UNIFRANZ. Extras plus en el pedido.',
      precio: 50,
      stock: 40,
    },
  });

  const estados = ['pendiente', 'imprimiendo', 'entregado'];

  for (let i = 0; i < PERSONAS.length; i++) {
    const persona = PERSONAS[i];
    const usuario = await prisma.usuario.create({
      data: {
        nombre: persona.nombre,
        correo: correoUnifranz(persona.nombre, i + 1),
        carrera: CARRERAS[i % CARRERAS.length],
      },
    });

    const color = COLORES[i % COLORES.length];
    const seleccion = SELECCIONES[i % SELECCIONES.length];
    const extras = EXTRAS_POOL[i % EXTRAS_POOL.length];
    const extrasJson = JSON.stringify(extras);

    const personalizacion = await prisma.personalizacion.create({
      data: {
        usuario_id: usuario.id,
        color,
        seleccion_favorita: seleccion,
        texto_personalizado: persona.grabado,
        modelo: 'portalapicero',
        extras: extrasJson,
      },
    });

    await prisma.pedido.create({
      data: {
        usuario_id: usuario.id,
        personalizacion_id: personalizacion.id,
        precio: precioDesdeExtras(extras),
        estado: estados[i % estados.length],
      },
    });
  }

  // Simulación extra: diseños guardados sin pedido (clientes explorando el personalizador)
  const exploradores = [
    { nombre: 'Ricardo Tomás Guzmán', grabado: 'RICARDO', carrera: 'Ingeniería de Sistemas' },
    { nombre: 'Patricia Alejandra Oropeza', grabado: 'PATY O.', carrera: 'Diseño Gráfico' },
  ];

  for (let j = 0; j < exploradores.length; j++) {
    const ex = exploradores[j];
    const usuario = await prisma.usuario.create({
      data: {
        nombre: ex.nombre,
        correo: correoUnifranz(ex.nombre, 100 + j),
        carrera: ex.carrera,
      },
    });

    await prisma.personalizacion.create({
      data: {
        usuario_id: usuario.id,
        color: COLORES[(j + 2) % COLORES.length],
        seleccion_favorita: SELECCIONES[(j + 5) % SELECCIONES.length],
        texto_personalizado: ex.grabado,
        modelo: 'portalapicero',
        extras: JSON.stringify(['compartimiento_extra']),
      },
    });
  }

  console.log(
    `Seed completado: 1 producto, ${PERSONAS.length} pedidos con nombres reales, ${exploradores.length} diseños sin pedido.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
