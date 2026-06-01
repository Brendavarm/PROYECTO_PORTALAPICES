import { calcularPrecioPedido, PRECIOS_PLUS, PRECIO_BASE_PORTALAPICERO } from './precios.js';
import {
  COLORES,
  EXTRAS_CATALOGO,
  MUNDIAL_META,
  PRODUCTO_INFO,
  buscarSelecciones,
  resolveColorId,
  resolveSeleccion,
} from './catalogData.js';
import { crearPedidoPersonalizado, consultarPedidosPorCorreo } from '../services/pedidoService.js';

export const TOOL_DEFINITIONS = [
  {
    type: 'function',
    function: {
      name: 'info_producto',
      description: 'Información del producto GoalDesk Portalapicero, qué incluye y precio base.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'listar_colores',
      description: 'Lista los colores de filamento disponibles para personalizar.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'listar_extras',
      description: 'Lista los extras plus opcionales con precios.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'calcular_precio',
      description: 'Calcula el precio total en bolivianos (Bs) según extras seleccionados.',
      parameters: {
        type: 'object',
        properties: {
          extras: {
            type: 'array',
            items: {
              type: 'string',
              enum: Object.keys(PRECIOS_PLUS),
            },
            description: 'IDs de extras plus a sumar',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'buscar_seleccion',
      description: 'Busca selecciones nacionales del Mundial 2026 por nombre parcial.',
      parameters: {
        type: 'object',
        properties: {
          consulta: { type: 'string', description: 'Texto a buscar, ej. Argentina, Brasil' },
        },
        required: ['consulta'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'info_mundial',
      description: 'Datos generales de la Copa Mundial FIFA 2026.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'crear_pedido',
      description:
        'Registra un pedido real en la base de datos. Solo usar cuando tengas nombre, correo, color y selección confirmados por el usuario.',
      parameters: {
        type: 'object',
        properties: {
          nombre: { type: 'string' },
          correo: { type: 'string', description: 'Correo electrónico válido del cliente' },
          color: {
            type: 'string',
            description: 'ID de color: dorado, azul, blanco, negro o verde',
          },
          seleccion_favorita: {
            type: 'string',
            description: 'Nombre oficial de la selección, ej. Argentina',
          },
          carrera: { type: 'string', description: 'Carrera universitaria del cliente' },
          extras: {
            type: 'array',
            items: { type: 'string', enum: Object.keys(PRECIOS_PLUS) },
          },
        },
        required: ['nombre', 'correo', 'color', 'seleccion_favorita'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'consultar_pedidos',
      description: 'Consulta pedidos previos de un cliente por su correo electrónico.',
      parameters: {
        type: 'object',
        properties: {
          correo: { type: 'string' },
        },
        required: ['correo'],
      },
    },
  },
];

const VALID_EXTRA_IDS = new Set(Object.keys(PRECIOS_PLUS));

function sanitizeExtras(extras) {
  if (!Array.isArray(extras)) return [];
  return extras.filter((id) => VALID_EXTRA_IDS.has(id));
}

export async function executeChatTool(name, args = {}) {
  switch (name) {
    case 'info_producto':
      return {
        ok: true,
        producto: PRODUCTO_INFO,
        precio_base: PRECIO_BASE_PORTALAPICERO,
      };

    case 'listar_colores':
      return { ok: true, colores: COLORES };

    case 'listar_extras':
      return { ok: true, extras: EXTRAS_CATALOGO, precio_base: PRECIO_BASE_PORTALAPICERO };

    case 'calcular_precio': {
      const extras = sanitizeExtras(args.extras);
      const total = calcularPrecioPedido(extras);
      const detalle = extras.map((id) => {
        const item = EXTRAS_CATALOGO.find((e) => e.id === id);
        return { id, label: item?.label, precio: PRECIOS_PLUS[id] };
      });
      return {
        ok: true,
        precio_base: PRECIO_BASE_PORTALAPICERO,
        extras: detalle,
        total,
        moneda: 'BOB',
      };
    }

    case 'buscar_seleccion': {
      const resultados = buscarSelecciones(args.consulta || '');
      return { ok: true, consulta: args.consulta, resultados, total: resultados.length };
    }

    case 'info_mundial':
      return { ok: true, mundial: MUNDIAL_META };

    case 'crear_pedido': {
      const colorId = resolveColorId(args.color) || args.color;
      const seleccion = resolveSeleccion(args.seleccion_favorita) || args.seleccion_favorita;
      const extras = sanitizeExtras(args.extras);

      if (!resolveColorId(colorId)) {
        return {
          ok: false,
          error: `Color inválido. Usa: ${COLORES.map((c) => c.id).join(', ')}`,
        };
      }
      if (!resolveSeleccion(seleccion)) {
        return {
          ok: false,
          error: 'Selección no válida. Usa buscar_seleccion para confirmar el nombre oficial.',
        };
      }
      if (!args.correo?.includes('@')) {
        return { ok: false, error: 'Correo electrónico inválido.' };
      }

      const { pedido, personalizacion, usuario } = await crearPedidoPersonalizado({
        nombre: args.nombre.trim(),
        correo: args.correo.trim().toLowerCase(),
        carrera: args.carrera,
        color: colorId,
        seleccion_favorita: seleccion,
        texto_personalizado: args.nombre.trim(),
        extras,
      });

      return {
        ok: true,
        pedido_id: pedido.id,
        precio: pedido.precio,
        estado: pedido.estado,
        cliente: usuario.nombre,
        color: colorId,
        seleccion,
        extras,
        personalizacion_id: personalizacion.id,
      };
    }

    case 'consultar_pedidos': {
      const data = await consultarPedidosPorCorreo(args.correo?.trim().toLowerCase());
      return { ok: true, ...data };
    }

    default:
      return { ok: false, error: `Herramienta desconocida: ${name}` };
  }
}

export const TOOL_LABELS = {
  info_producto: 'Info producto',
  listar_colores: 'Colores',
  listar_extras: 'Extras',
  calcular_precio: 'Calcular precio',
  buscar_seleccion: 'Buscar selección',
  info_mundial: 'Mundial 2026',
  crear_pedido: 'Crear pedido',
  consultar_pedidos: 'Consultar pedidos',
};
