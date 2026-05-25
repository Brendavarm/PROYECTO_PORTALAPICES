const PRECIO_BASE = 50;

export const PRECIO_BASE_PORTALAPICERO = PRECIO_BASE;

export const PRECIOS_PLUS = {
  compartimiento_extra: 10,
  dos_compartimientos_extra: 18,
  grabado_destacado: 8,
  soporte_celular_ancho: 6,
};

/** Etiquetas para admin y reportes */
export const EXTRAS_LABELS = {
  estandar: 'Configuración estándar',
  compartimiento_extra: '+1 compartimiento',
  dos_compartimientos_extra: '+2 compartimentos',
  grabado_destacado: 'Grabado destacado',
  soporte_celular_ancho: 'Soporte celular ancho',
};

export function parseExtras(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function calcularPrecioPedido(extrasInput) {
  const extras = parseExtras(extrasInput);
  const suma = extras.reduce((acc, id) => acc + (PRECIOS_PLUS[id] ?? 0), 0);
  return PRECIO_BASE + suma;
}
