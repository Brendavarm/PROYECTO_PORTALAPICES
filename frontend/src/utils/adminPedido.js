import { PRODUCTO_BASE, PLUS_OPCIONES } from '../data/constants';
import { calcularPrecio, etiquetaExtras, parseExtras } from './producto';

/** Pedidos creados antes del modelo único (migración visual en admin) */
const LEGACY_MODELO = {
  classic: { label: 'Legado: paquete Básico', plus: 0 },
  pro: { label: 'Legado: paquete Pro (+Bs 10)', plus: 10 },
  elite: { label: 'Legado: paquete Elite (+Bs 20)', plus: 20 },
};

export function resumenPedidoAdmin(personalizacion, precioPedido) {
  const extras = parseExtras(personalizacion?.extras);
  const base = PRODUCTO_BASE.price;
  const total = Number(precioPedido) || base;

  if (extras.length > 0) {
    const plus = calcularPrecio(extras) - base;
    return {
      producto: PRODUCTO_BASE.name,
      extrasLabel: etiquetaExtras(extras),
      precioLinea: plus > 0 ? `Base ${base} + plus ${plus}` : `Base ${base}`,
      legacy: false,
    };
  }

  const modelo = personalizacion?.modelo;
  if (modelo && modelo !== PRODUCTO_BASE.id && LEGACY_MODELO[modelo]) {
    const leg = LEGACY_MODELO[modelo];
    return {
      producto: PRODUCTO_BASE.name,
      extrasLabel: leg.label,
      precioLinea: `Base ${base} + ${leg.plus} (dato antiguo; ejecuta seed nuevo)`,
      legacy: true,
    };
  }

  const diff = Math.max(0, total - base);
  return {
    producto: PRODUCTO_BASE.name,
    extrasLabel: diff > 0 ? `Plus no registrado (+Bs ${diff})` : 'Configuración estándar',
    precioLinea: diff > 0 ? `Base ${base} + ${diff}` : `Base ${base}`,
    legacy: diff > 0,
  };
}

export function inferirExtrasDesdePrecio(precioPedido) {
  const diff = Math.round(Number(precioPedido) - PRODUCTO_BASE.price);
  if (diff <= 0) return [];

  const match = PLUS_OPCIONES.find((o) => o.price === diff);
  if (match) return [match.id];

  const combo = [];
  let rest = diff;
  const sorted = [...PLUS_OPCIONES].sort((a, b) => b.price - a.price);
  for (const opt of sorted) {
    while (rest >= opt.price) {
      combo.push(opt.id);
      rest -= opt.price;
    }
  }
  return rest === 0 ? combo : [];
}
