import { PRODUCTO_BASE, PLUS_OPCIONES } from '../data/constants';

/** Precio total en Bs: base + extras seleccionados */
export function calcularPrecio(extras = []) {
  const ids = Array.isArray(extras) ? extras : [];
  const sumaPlus = ids.reduce((sum, id) => {
    const opt = PLUS_OPCIONES.find((o) => o.id === id);
    return sum + (opt?.price ?? 0);
  }, 0);
  return PRODUCTO_BASE.price + sumaPlus;
}

export function etiquetaExtras(extras = []) {
  if (!extras.length) return 'Configuración estándar';
  return extras
    .map((id) => PLUS_OPCIONES.find((o) => o.id === id)?.label ?? id)
    .join(', ');
}

export function parseExtras(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
