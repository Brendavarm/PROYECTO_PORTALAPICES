export const COLORES = [
  { id: 'dorado', label: 'Dorado Premium' },
  { id: 'azul', label: 'Azul Profundo' },
  { id: 'blanco', label: 'Blanco Clásico' },
  { id: 'negro', label: 'Negro Elite' },
  { id: 'verde', label: 'Verde Cancha' },
];

export const CARRERAS = [
  'Ingeniería de Sistemas',
  'Ingeniería Industrial',
  'Administración de Empresas',
  'Diseño Gráfico',
  'Marketing',
  'Ingeniería Civil',
  'Contaduría Pública',
];

export const EXTRAS_CATALOGO = [
  { id: 'compartimiento_extra', label: '+1 compartimiento', price: 10 },
  { id: 'dos_compartimientos_extra', label: '+2 compartimentos', price: 18 },
  { id: 'grabado_destacado', label: 'Grabado destacado en base', price: 8 },
  { id: 'soporte_celular_ancho', label: 'Soporte celular ancho', price: 6 },
];

export const MUNDIAL_META = {
  name: 'Copa Mundial de la FIFA 2026',
  hosts: ['Estados Unidos', 'México', 'Canadá'],
  startDate: '11 de junio de 2026',
  endDate: '19 de julio de 2026',
  totalTeams: 48,
  totalMatches: 104,
  totalStadiums: 16,
};

export const SELECCIONES_NOMBRES = [
  'Alemania', 'Arabia Saudita', 'Argentina', 'Argelia', 'Australia', 'Austria',
  'Bélgica', 'Bosnia y Herzegovina', 'Brasil', 'Cabo Verde', 'Canadá', 'Chequia',
  'Colombia', 'Corea del Sur', 'Costa de Marfil', 'Croacia', 'Curazao', 'Ecuador',
  'Egipto', 'Escocia', 'España', 'Estados Unidos', 'Francia', 'Ghana', 'Haití',
  'Inglaterra', 'Irak', 'Irán', 'Japón', 'Jordania', 'Marruecos', 'México',
  'Nueva Zelanda', 'Noruega', 'Panamá', 'Paraguay', 'Países Bajos', 'Portugal',
  'Qatar', 'Rep. Dem. del Congo', 'Senegal', 'Sudáfrica', 'Suecia', 'Suiza',
  'Turquía', 'Túnez', 'Uruguay', 'Uzbekistán',
];

export const PRODUCTO_INFO = {
  id: 'portalapicero',
  name: 'GoalDesk Portalapicero',
  priceBase: 50,
  description:
    'Organizador de escritorio impreso en 3D con forma de balón, soporte para celular, compartimentos para lapiceros y base UNIFRANZ · Ingeniería de Sistemas. Temática Copa Mundial FIFA 2026.',
};

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
}

export function resolveColorId(input) {
  if (!input) return null;
  const n = normalize(input);
  const byId = COLORES.find((c) => c.id === n);
  if (byId) return byId.id;
  const byLabel = COLORES.find((c) => normalize(c.label).includes(n) || n.includes(normalize(c.label)));
  return byLabel?.id ?? null;
}

export function resolveSeleccion(nombre) {
  if (!nombre) return null;
  const n = normalize(nombre);
  const exact = SELECCIONES_NOMBRES.find((s) => normalize(s) === n);
  if (exact) return exact;
  return SELECCIONES_NOMBRES.find((s) => normalize(s).includes(n) || n.includes(normalize(s))) ?? null;
}

export function buscarSelecciones(query, limit = 8) {
  const n = normalize(query);
  if (!n) return SELECCIONES_NOMBRES.slice(0, limit);
  return SELECCIONES_NOMBRES.filter((s) => normalize(s).includes(n)).slice(0, limit);
}
