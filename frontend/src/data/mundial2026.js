/** Datos del Mundial FIFA 2026 — Copa de 48 selecciones en Norteamérica */

import { MUNDIAL_SECTION_IMAGES } from './siteImages';

export const MUNDIAL_META = {
  name: 'Copa Mundial de la FIFA 2026',
  shortName: 'Mundial 2026',
  hosts: ['Estados Unidos', 'México', 'Canadá'],
  startDate: '11 de junio de 2026',
  endDate: '19 de julio de 2026',
  totalTeams: 48,
  totalMatches: 104,
  totalStadiums: 16,
  slogan: 'We Are 26',
};

export const MUNDIAL_TOPICS = [
  {
    id: 'resumen',
    label: 'Resumen',
    icon: 'ball',
    teaser: 'Lo esencial del torneo en un vistazo.',
    image: MUNDIAL_SECTION_IMAGES.resumen,
  },
  {
    id: 'equipos',
    label: 'Clasificados',
    icon: 'users',
    teaser: 'Las 48 selecciones por confederación.',
    image: MUNDIAL_SECTION_IMAGES.equipos,
  },
  {
    id: 'formato',
    label: 'Formato',
    icon: 'chart',
    teaser: 'Cómo se juega la fase de grupos y las eliminatorias.',
    image: MUNDIAL_SECTION_IMAGES.formato,
  },
  {
    id: 'fechas',
    label: 'Fechas',
    icon: 'check',
    teaser: 'Calendario y momentos clave del torneo.',
    image: MUNDIAL_SECTION_IMAGES.fechas,
  },
  {
    id: 'sedes',
    label: 'Sedes',
    icon: 'box',
    teaser: 'Los 16 estadios en 3 países.',
    image: MUNDIAL_SECTION_IMAGES.sedes,
  },
  {
    id: 'historia',
    label: 'Historia',
    icon: 'shield',
    teaser: 'Récords, campeones y datos históricos.',
    image: MUNDIAL_SECTION_IMAGES.historia,
  },
  {
    id: 'debutantes',
    label: 'Debutantes',
    icon: 'link',
    teaser: 'Países que van por primera vez.',
    image: MUNDIAL_SECTION_IMAGES.debutantes,
  },
  {
    id: 'curiosidades',
    label: 'Curiosidades',
    icon: 'palette',
    teaser: 'Más de 25 datos para sorprenderte.',
    image: MUNDIAL_SECTION_IMAGES.curiosidades,
  },
];

export const QUALIFIED_TEAMS = [
  {
    id: 'host',
    name: 'Anfitriones',
    slots: 3,
    note: 'Clasificados automáticamente por ser sedes del torneo.',
    teams: [
      { name: 'Canadá', flag: '🇨🇦', debut: false },
      { name: 'México', flag: '🇲🇽', debut: false },
      { name: 'Estados Unidos', flag: '🇺🇸', debut: false },
    ],
  },
  {
    id: 'uefa',
    name: 'UEFA (Europa)',
    slots: 16,
    note: 'La confederación con más cupos en esta edición.',
    teams: [
      { name: 'Alemania', flag: '🇩🇪' },
      { name: 'Austria', flag: '🇦🇹' },
      { name: 'Bélgica', flag: '🇧🇪' },
      { name: 'Bosnia y Herzegovina', flag: '🇧🇦', debut: true },
      { name: 'Croacia', flag: '🇭🇷' },
      { name: 'Chequia', flag: '🇨🇿' },
      { name: 'España', flag: '🇪🇸' },
      { name: 'Francia', flag: '🇫🇷' },
      { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { name: 'Noruega', flag: '🇳🇴' },
      { name: 'Países Bajos', flag: '🇳🇱' },
      { name: 'Portugal', flag: '🇵🇹' },
      { name: 'Escocia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
      { name: 'Suiza', flag: '🇨🇭' },
      { name: 'Suecia', flag: '🇸🇪' },
      { name: 'Turquía', flag: '🇹🇷' },
    ],
  },
  {
    id: 'afc',
    name: 'AFC (Asia)',
    slots: 9,
    note: 'Incluye a Australia, que compite en la confederación asiática.',
    teams: [
      { name: 'Arabia Saudita', flag: '🇸🇦' },
      { name: 'Australia', flag: '🇦🇺' },
      { name: 'Corea del Sur', flag: '🇰🇷' },
      { name: 'Irak', flag: '🇮🇶' },
      { name: 'Irán', flag: '🇮🇷' },
      { name: 'Japón', flag: '🇯🇵' },
      { name: 'Jordania', flag: '🇯🇴', debut: true },
      { name: 'Qatar', flag: '🇶🇦' },
      { name: 'Uzbekistán', flag: '🇺🇿', debut: true },
    ],
  },
  {
    id: 'caf',
    name: 'CAF (África)',
    slots: 10,
    note: 'Más representantes africanos que en ediciones anteriores de 32 equipos.',
    teams: [
      { name: 'Argelia', flag: '🇩🇿' },
      { name: 'Cabo Verde', flag: '🇨🇻', debut: true },
      { name: 'Costa de Marfil', flag: '🇨🇮' },
      { name: 'Egipto', flag: '🇪🇬' },
      { name: 'Ghana', flag: '🇬🇭' },
      { name: 'Marruecos', flag: '🇲🇦' },
      { name: 'Rep. Dem. del Congo', flag: '🇨🇩' },
      { name: 'Senegal', flag: '🇸🇳' },
      { name: 'Sudáfrica', flag: '🇿🇦' },
      { name: 'Túnez', flag: '🇹🇳' },
    ],
  },
  {
    id: 'concacaf',
    name: 'CONCACAF (Norteamérica, Centroamérica y Caribe)',
    slots: 6,
    note: 'Además de los 3 anfitriones, clasificaron 3 selecciones más de la zona.',
    teams: [
      { name: 'Curazao', flag: '🇨🇼', debut: true },
      { name: 'Haití', flag: '🇭🇹' },
      { name: 'Panamá', flag: '🇵🇦' },
    ],
  },
  {
    id: 'conmebol',
    name: 'CONMEBOL (Sudamérica)',
    slots: 6,
    note: 'Todas las selecciones sudamericanas clasificaron en la misma ronda.',
    teams: [
      { name: 'Argentina', flag: '🇦🇷', note: 'Campeón defensor (Qatar 2022)' },
      { name: 'Brasil', flag: '🇧🇷', note: '5 veces campeón del mundo' },
      { name: 'Colombia', flag: '🇨🇴' },
      { name: 'Ecuador', flag: '🇪🇨' },
      { name: 'Paraguay', flag: '🇵🇾' },
      { name: 'Uruguay', flag: '🇺🇾' },
    ],
  },
  {
    id: 'ofc',
    name: 'OFC (Oceanía)',
    slots: 1,
    note: 'Un cupo para la confederación de Oceanía en el formato de 48.',
    teams: [{ name: 'Nueva Zelanda', flag: '🇳🇿' }],
  },
];

/** Apodos habituales en español (opcional; el grabado usa el nombre oficial). */
export const SELECCION_APODOS = {
  Argentina: 'La Albiceleste',
  Brasil: 'A Seleção',
  Uruguay: 'La Celeste',
  Colombia: 'Los Cafeteros',
  Ecuador: 'La Tri',
  Paraguay: 'La Albirroja',
  México: 'El Tri',
  'Estados Unidos': 'Team USA',
  Canadá: 'CanMNT',
  España: 'La Roja',
  Francia: 'Les Bleus',
  Alemania: 'Die Mannschaft',
  Inglaterra: 'Los Tres Leones',
  Portugal: 'A Seleção das Quinas',
  'Países Bajos': 'La Naranja Mecánica',
  Bélgica: 'Los Diablos Rojos',
  Croacia: 'Los Leones de Dalmacia',
  Escocia: 'Los Tartan Army',
  Suiza: 'La Nati',
  Marruecos: 'Los Leones del Atlas',
  Senegal: 'Los Leones de Teranga',
  Ghana: 'Black Stars',
  'Costa de Marfil': 'Los Elefantes',
  Japón: 'Samurái Blue',
  'Corea del Sur': 'Red Devils',
  'Arabia Saudita': 'Los Halcones Verdes',
  Irán: 'Team Melli',
  Australia: 'Los Socceroos',
  'Nueva Zelanda': 'All Whites',
  Panamá: 'Los Canaleros',
  Haití: 'Les Grenadiers',
  Curazao: 'La Isla Feliz',
  Qatar: 'Los Cataríes',
  Turquía: 'Los Halcones',
  Noruega: 'Løvene',
  Austria: 'Das Team',
  Chequia: 'La República Checa',
  'Rep. Dem. del Congo': 'Los Leopards',
  Argelia: 'Los Zorros del Desierto',
  Egipto: 'Los Faraones',
  Túnez: 'Las Águilas de Cartago',
  'Sudáfrica': 'Bafana Bafana',
  Jordania: 'Los Nashama',
  Uzbekistán: 'Los Lobos de Uzbekistán',
  'Bosnia y Herzegovina': 'El Dragón Azul',
  'Cabo Verde': 'Los Tiburones Azules',
};

function buildSeleccionEntry(team, conf) {
  const apodo = SELECCION_APODOS[team.name] ?? null;
  const flag = team.flag ?? '';
  const label = flag ? `${flag} ${team.name}` : team.name;
  const optionLabel = apodo ? `${label} — ${apodo}` : label;
  return {
    name: team.name,
    flag,
    apodo,
    confederacion: conf.name,
    confederacionId: conf.id,
    label,
    optionLabel,
    debut: Boolean(team.debut),
  };
}

/**
 * Las 48 selecciones (equipos nacionales) clasificadas al Mundial 2026.
 * Fuente única para el personalizador y el hub del torneo.
 */
export const SELECCIONES_MUNDIAL_2026 = QUALIFIED_TEAMS.flatMap((conf) =>
  conf.teams.map((team) => buildSeleccionEntry(team, conf))
).sort((a, b) => a.name.localeCompare(b.name, 'es'));

/** Misma lista agrupada por confederación (para el selector del personalizador). */
export const SELECCIONES_POR_CONFEDERACION = QUALIFIED_TEAMS.map((conf) => ({
  id: conf.id,
  name: conf.name,
  teams: conf.teams.map((team) => buildSeleccionEntry(team, conf)),
}));

export function getSeleccionMundial2026(nombre) {
  return SELECCIONES_MUNDIAL_2026.find((s) => s.name === nombre);
}

export function normalizeSeleccionQuery(texto) {
  return texto
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim();
}

export function seleccionCoincideBusqueda(seleccion, query) {
  if (!query) return true;
  const q = normalizeSeleccionQuery(query);
  const campos = [seleccion.name, seleccion.apodo, seleccion.confederacion].filter(Boolean);
  return campos.some((c) => normalizeSeleccionQuery(c).includes(q));
}

export const FIRST_TIME_TEAMS = [
  {
    name: 'Cabo Verde',
    flag: '🇨🇻',
    text: 'Primera participación en un Mundial masculino.',
  },
  {
    name: 'Curazao',
    flag: '🇨🇼',
    text: 'El país más pequeño en población que clasifica en esta edición.',
  },
  {
    name: 'Uzbekistán',
    flag: '🇺🇿',
    text: 'Debut asiático tras años de proceso clasificatorio.',
  },
  {
    name: 'Jordania',
    flag: '🇯🇴',
    text: 'Primera vez en la Copa del Mundo masculina.',
  },
  {
    name: 'Bosnia y Herzegovina',
    flag: '🇧🇦',
    text: 'Regresa al Mundial; para muchos aficionados es un debut emocional.',
  },
];

export const TOURNAMENT_FORMAT = {
  intro:
    'Por primera vez juegan 48 selecciones. El torneo sigue teniendo fase de grupos, pero con más equipos y más partidos que nunca.',
  phases: [
    {
      title: 'Fase de grupos',
      detail:
        '12 grupos de 4 equipos (48 en total). Cada selección juega 3 partidos. Clasifican los 2 mejores de cada grupo y los 8 mejores terceros lugares (32 equipos a dieciseisavos).',
    },
    {
      title: 'Dieciseisavos de final',
      detail: '32 equipos, partidos de eliminación directa. El ganador avanza, el perdedor queda fuera.',
    },
    {
      title: 'Octavos, cuartos y semifinales',
      detail: 'Misma dinámica de eliminación directa hasta quedar 2 finalistas.',
    },
    {
      title: 'Tercer puesto y final',
      detail:
        'Partido por el bronce y gran final. La final está prevista en el área de Nueva York / Nueva Jersey (MetLife Stadium).',
    },
  ],
  numbers: [
    { label: 'Partidos totales', value: '104' },
    { label: 'Grupos', value: '12' },
    { label: 'Equipos por grupo', value: '4' },
    { label: 'Clasificados a octavos', value: '32' },
  ],
};

export const KEY_DATES = [
  {
    date: '11 jun 2026',
    title: 'Inicio del torneo',
    text: 'Arranca la fase de grupos. Se espera partido inaugural en México (Estadio Azteca).',
  },
  {
    date: 'Jun–Jul 2026',
    title: 'Fase de grupos',
    text: 'Un mes de partidos diarios en distintas ciudades de EE. UU., México y Canadá.',
  },
  {
    date: 'Finales de junio',
    title: 'Dieciseisavos y octavos',
    text: 'Comienzan las eliminatorias; un error y tu selección se va a casa.',
  },
  {
    date: 'Julio 2026',
    title: 'Cuartos y semifinales',
    text: 'Los cruces se definen; aumenta la tensión y la afición viaja entre sedes.',
  },
  {
    date: '18 jul 2026',
    title: 'Partido por el tercer puesto',
    text: 'Los perdedores de semifinal buscan cerrar con medalla de bronce.',
  },
  {
    date: '19 jul 2026',
    title: 'Gran final',
    text: 'Se corona al campeón del mundo en el MetLife Stadium (Nueva York / Nueva Jersey).',
  },
];

export const MUNDIAL_STADIUMS = [
  { name: 'Estadio Azteca', city: 'Ciudad de México', country: 'México', capacity: '72.766', highlight: 'Partido inaugural' },
  { name: 'Estadio Akron', city: 'Guadalajara (Zapopan)', country: 'México', capacity: '44.330' },
  { name: 'Estadio BBVA', city: 'Monterrey (Guadalupe)', country: 'México', capacity: '50.113' },
  { name: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'EE. UU.', capacity: '78.576', highlight: 'Gran final' },
  { name: 'AT&T Stadium', city: 'Dallas (Arlington)', country: 'EE. UU.', capacity: '70.122', highlight: 'Semifinal' },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'EE. UU.', capacity: '67.382' },
  { name: 'SoFi Stadium', city: 'Los Ángeles (Inglewood)', country: 'EE. UU.', capacity: '69.650' },
  { name: 'Hard Rock Stadium', city: 'Miami Gardens', country: 'EE. UU.', capacity: '64.091' },
  { name: 'NRG Stadium', city: 'Houston', country: 'EE. UU.', capacity: '68.311' },
  { name: 'Arrowhead Stadium', city: 'Kansas City', country: 'EE. UU.', capacity: '67.513' },
  { name: 'Levi\'s Stadium', city: 'Santa Clara (SF Bay)', country: 'EE. UU.', capacity: '69.391' },
  { name: 'Lumen Field', city: 'Seattle', country: 'EE. UU.', capacity: '65.123' },
  { name: 'Gillette Stadium', city: 'Boston (Foxborough)', country: 'EE. UU.', capacity: '63.815' },
  { name: 'Lincoln Financial Field', city: 'Filadelfia', country: 'EE. UU.', capacity: '65.827' },
  { name: 'BMO Field', city: 'Toronto', country: 'Canadá', capacity: '44.315' },
  { name: 'BC Place', city: 'Vancouver', country: 'Canadá', capacity: '48.821' },
];

export const HISTORY_FACTS = [
  {
    title: 'El Mundial más grande',
    text: 'De 32 equipos (1998–2022) se pasa a 48. Habrá 40 partidos más que en Qatar 2022.',
  },
  {
    title: 'Tres países anfitriones',
    text: 'Estados Unidos, México y Canadá organizan juntos. México será el primer país en albergar 3 Mundiales.',
  },
  {
    title: 'Campeón defensor',
    text: 'Argentina llega como campeona tras ganar en Qatar 2022 (la tercera estrella albiceleste).',
  },
  {
    title: 'Brasil, el más laureado',
    text: 'Brasil es la única selección con 5 títulos mundiales (1958, 1962, 1970, 1994 y 2002).',
  },
  {
    title: 'Más inclusión global',
    text: 'África, Asia y Concacaf tienen más cupos: más países sueñan con llegar lejos.',
  },
  {
    title: 'Tecnología en el campo',
    text: 'VAR, comunicación con vestuarios y estadios inteligentes marcan la experiencia moderna.',
  },
];

export const SUDAMERICA_NOTE = {
  title: 'Sudamérica en el 2026',
  text: 'Clasificaron las 6 selecciones de CONMEBOL: Argentina, Brasil, Colombia, Ecuador, Paraguay y Uruguay. Bolivia no clasificó en esta edición, pero la pasión sudamericana sigue presente en la afición y en productos como GoalDesk inspirados en el Mundial.',
};
