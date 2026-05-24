/** Imágenes locales (siempre cargan) + respaldo opcional Unsplash */

const cover = (id) => `/images/covers/${id}.svg`;

const unsplash = (id, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SITE_IMAGES = {
  productHero: {
    src: cover('product-hero'),
    alt: 'GoalDesk Smart — organizador 3D temática Mundial',
  },
  hero: {
    src: cover('hero'),
    fallback: unsplash('photo-1574629810360-7efbbe195018', 1400),
    alt: 'Ambiente Copa Mundial 2026',
  },
  heroAccent: {
    src: cover('product-hero'),
    alt: 'GoalDesk impreso en 3D',
  },
  countdown: {
    src: cover('sedes'),
    alt: 'Estadio iluminado',
  },
  product: {
    src: cover('resumen'),
    alt: 'GoalDesk en tu escritorio',
  },
  football: {
    src: cover('curiosidades'),
    alt: 'Balón y cancha',
  },
  fans: {
    src: cover('equipos'),
    alt: 'Afición y selecciones',
  },
  trophy: {
    src: cover('historia'),
    alt: 'Historia del torneo',
  },
  northAmerica: {
    src: cover('resumen'),
    alt: 'Ciudades sede del Mundial 2026',
  },
  customizer: {
    src: cover('fechas'),
    alt: 'Personaliza tu pedido',
  },
  qr: {
    src: cover('debutantes'),
    alt: 'Escanea el código QR',
  },
};

export const MODEL_IMAGES = {
  classic: { src: cover('sedes'), alt: 'Modelo Básico GoalDesk' },
  pro: { src: cover('formato'), alt: 'Modelo Pro GoalDesk' },
  elite: { src: cover('historia'), alt: 'Modelo Elite GoalDesk' },
};

export const FEATURE_IMAGES = {
  ball: cover('curiosidades'),
  phone: cover('fechas'),
  box: cover('sedes'),
  palette: cover('debutantes'),
};

export const MUNDIAL_SECTION_IMAGES = {
  resumen: { src: cover('resumen'), alt: 'Ciudades sede del Mundial 2026' },
  equipos: { src: cover('equipos'), alt: 'Selecciones y afición mundial' },
  formato: { src: cover('formato'), alt: 'Partido y emoción del torneo' },
  fechas: { src: cover('fechas'), alt: 'Calendario del torneo' },
  sedes: { src: cover('sedes'), alt: 'Estadios del Mundial' },
  historia: { src: cover('historia'), alt: 'Historia de la Copa del Mundo' },
  debutantes: { src: cover('debutantes'), alt: 'Selecciones debutantes' },
  curiosidades: { src: cover('curiosidades'), alt: 'Curiosidades del fútbol' },
};

export const STADIUM_IMAGES = {
  México: cover('resumen'),
  'EE. UU.': cover('sedes'),
  Canadá: cover('equipos'),
};
