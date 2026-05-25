/**
 * Una imagen distinta por sección (sec-*.jpg).
 * Solo fútbol soccer / Mundiales FIFA — sin fútbol americano ni fotos de niños.
 */

import heroSvg from '../assets/covers/hero.svg';
import productHeroSvg from '../assets/covers/product-hero.svg';
import resumenSvg from '../assets/covers/resumen.svg';
import sedesSvg from '../assets/covers/sedes.svg';
import equiposSvg from '../assets/covers/equipos.svg';
import fechasSvg from '../assets/covers/fechas.svg';
import formatoSvg from '../assets/covers/formato.svg';
import historiaSvg from '../assets/covers/historia.svg';
import debutantesSvg from '../assets/covers/debutantes.svg';
import curiosidadesSvg from '../assets/covers/curiosidades.svg';

const img = (file) => `/images/photos/${file}`;
const productImg = (file) => `/images/product/${file}`;

const productAlt =
  'GoalDesk Portalapicero — balón organizador 3D con soporte para celular y base UNIFRANZ';

/**
 * Las 4 vistas oficiales del producto (orden del fabricante):
 * 1 frente · 2 de costado · 3 atrás · 4 otro costado
 */
export const PRODUCT_VIEWS_4 = [
  {
    id: 'front',
    label: 'Frente',
    src: productImg('goaldesk-portalapicero-01-frente.png'),
    alt: 'Vista frontal — 2026 Champions, soporte de celular y base UNIFRANZ',
  },
  {
    id: 'side',
    label: 'De costado',
    src: productImg('goaldesk-portalapicero-02-costado.png'),
    alt: 'Vista lateral — perfil del portalapicero y compartimentos',
  },
  {
    id: 'back',
    label: 'Atrás',
    src: productImg('goaldesk-portalapicero-03-atras.png'),
    alt: 'Vista trasera — balón organizador GoalDesk',
  },
  {
    id: 'sideAlt',
    label: 'Otro costado',
    src: productImg('goaldesk-portalapicero-04-costado.png'),
    alt: 'Vista lateral opuesta — gráfico de balón y base UNIFRANZ',
  },
];

/** Fotos reales del portalapicero (varias direcciones y contexto) */
export const PRODUCT_PHOTOS = {
  hero: {
    src: PRODUCT_VIEWS_4[0].src,
    alt: `${productAlt} — vista frontal con soporte de celular`,
  },
  main: {
    src: PRODUCT_VIEWS_4[0].src,
    alt: productAlt,
  },
  front: {
    src: PRODUCT_VIEWS_4[0].src,
    alt: PRODUCT_VIEWS_4[0].alt,
  },
  side: {
    src: PRODUCT_VIEWS_4[1].src,
    alt: PRODUCT_VIEWS_4[1].alt,
  },
  back: {
    src: PRODUCT_VIEWS_4[2].src,
    alt: PRODUCT_VIEWS_4[2].alt,
  },
  sideAlt: {
    src: PRODUCT_VIEWS_4[3].src,
    alt: PRODUCT_VIEWS_4[3].alt,
  },
  sideRight: {
    src: PRODUCT_VIEWS_4[3].src,
    alt: PRODUCT_VIEWS_4[3].alt,
  },
  angle: {
    src: productImg('goaldesk-portalapicero-angle.png'),
    alt: 'Vista en ángulo — portalapicero en uso con lapiceros',
  },
  top: {
    src: productImg('goaldesk-portalapicero-top.png'),
    alt: 'Vista desde arriba — compartimentos y escritorio de estudio',
  },
  pens: {
    src: productImg('goaldesk-portalapicero-pens.png'),
    alt: 'Vista frontal con lapiceros en los compartimentos',
  },
  group: {
    src: productImg('goaldesk-portalapicero-group.png'),
    alt: 'Varias unidades impresas en 3D — producción GoalDesk',
  },
  lifestyle: {
    src: productImg('goaldesk-portalapicero-lifestyle.png'),
    alt: 'Portalapicero en escritorio con lámpara y cuadernos',
  },
  detail: {
    src: productImg('goaldesk-portalapicero-detail.png'),
    alt: 'Detalle frontal — trofeo FIFA 2026 y marca UNIFRANZ',
  },
};

/** Galería: primero las 4 direcciones; luego fotos extra si existen */
export const PRODUCT_GALLERY = [
  ...PRODUCT_VIEWS_4,
  { id: 'angle', label: 'En ángulo', ...PRODUCT_PHOTOS.angle },
  { id: 'top', label: 'Desde arriba', ...PRODUCT_PHOTOS.top },
  { id: 'pens', label: 'Con lapiceros', ...PRODUCT_PHOTOS.pens },
  { id: 'group', label: 'Producción', ...PRODUCT_PHOTOS.group },
  { id: 'lifestyle', label: 'En tu escritorio', ...PRODUCT_PHOTOS.lifestyle },
];

export function resolveImage(entry) {
  if (!entry) return { src: '', fallback: undefined, alt: '' };
  if (typeof entry === 'string') return { src: entry, fallback: undefined, alt: '' };
  return {
    src: entry.src ?? '',
    fallback: entry.fallback,
    alt: entry.alt ?? '',
  };
}

export const SITE_IMAGES = {
  productHero: {
    src: PRODUCT_PHOTOS.hero.src,
    fallback: productHeroSvg,
    alt: PRODUCT_PHOTOS.hero.alt,
  },
  hero: {
    src: img('sec-hero.jpg'),
    fallback: heroSvg,
    alt: 'Mundial FIFA 2018 — final en el estadio Luzhniki',
  },
  heroAccent: {
    src: PRODUCT_PHOTOS.hero.src,
    fallback: productHeroSvg,
    alt: PRODUCT_PHOTOS.hero.alt,
  },
  countdown: {
    src: img('sec-countdown.jpg'),
    fallback: sedesSvg,
    alt: 'Afición en estadio viendo partido de fútbol',
  },
  product: {
    src: PRODUCT_PHOTOS.lifestyle.src,
    fallback: resumenSvg,
    alt: PRODUCT_PHOTOS.lifestyle.alt,
  },
  football: {
    src: img('sec-football-hub.jpg'),
    fallback: curiosidadesSvg,
    alt: 'Mundial 2018 — partido en Kazán Arena',
  },
  fans: {
    src: img('sec-fans.jpg'),
    fallback: equiposSvg,
    alt: 'Afición con banderas en estadio de fútbol',
  },
  trophy: {
    src: img('sec-trophy.jpg'),
    fallback: historiaSvg,
    alt: 'Trofeo Copa del Mundo FIFA',
  },
  northAmerica: {
    src: img('sec-north-america.jpg'),
    fallback: resumenSvg,
    alt: 'Estadio de fútbol soccer — sedes Mundial 2026',
  },
  customizer: {
    src: PRODUCT_PHOTOS.angle.src,
    fallback: fechasSvg,
    alt: PRODUCT_PHOTOS.angle.alt,
  },
  qr: {
    src: img('sec-qr.jpg'),
    fallback: debutantesSvg,
    alt: 'Mundial 2018 — Spartak Stadium',
  },
};

export const MODEL_IMAGES = {
  portalapicero: {
    src: PRODUCT_PHOTOS.main.src,
    fallback: productHeroSvg,
    alt: PRODUCT_PHOTOS.main.alt,
  },
};

export const FEATURE_IMAGES = {
  ball: {
    src: PRODUCT_PHOTOS.front.src,
    fallback: curiosidadesSvg,
    alt: PRODUCT_PHOTOS.front.alt,
  },
  phone: {
    src: PRODUCT_PHOTOS.front.src,
    fallback: fechasSvg,
    alt: 'Soporte integrado para celular',
  },
  box: {
    src: PRODUCT_PHOTOS.pens.src,
    fallback: sedesSvg,
    alt: PRODUCT_PHOTOS.pens.alt,
  },
  palette: {
    src: PRODUCT_PHOTOS.top.src,
    fallback: debutantesSvg,
    alt: PRODUCT_PHOTOS.top.alt,
  },
};

export const MUNDIAL_SECTION_IMAGES = {
  resumen: {
    src: img('sec-mundial-resumen.jpg'),
    fallback: resumenSvg,
    alt: 'Mundial 2018 — estadio durante partido oficial',
  },
  equipos: {
    src: img('sec-mundial-equipos.jpg'),
    fallback: equiposSvg,
    alt: 'Dos jugadores de fútbol en partido',
  },
  formato: {
    src: img('sec-mundial-formato.jpg'),
    fallback: formatoSvg,
    alt: 'Partido de fútbol con jugadores y afición',
  },
  fechas: {
    src: img('sec-mundial-fechas.jpg'),
    fallback: fechasSvg,
    alt: 'Cancha de fútbol iluminada — calendario del torneo',
  },
  sedes: {
    src: img('sec-mundial-sedes.jpg'),
    fallback: sedesSvg,
    alt: 'Mundial 2018 — Nizhny Novgorod Stadium',
  },
  historia: {
    src: img('sec-mundial-historia.jpg'),
    fallback: historiaSvg,
    alt: 'Maracaná — estadio de Copas del Mundo',
  },
  debutantes: {
    src: img('sec-mundial-debut.jpg'),
    fallback: debutantesSvg,
    alt: 'Jugador de fútbol — selecciones debutantes',
  },
  curiosidades: {
    src: img('sec-mundial-curiosidad.jpg'),
    fallback: curiosidadesSvg,
    alt: 'Público en estadio durante partido de fútbol',
  },
};

export const STADIUM_IMAGES = {
  México: {
    src: img('sec-stadium-mx.jpg'),
    fallback: resumenSvg,
    alt: 'Estadio Azteca — Mundial en México',
  },
  'EE. UU.': {
    src: img('sec-stadium-us.jpg'),
    fallback: sedesSvg,
    alt: 'Mundial 2018 — estadio sede (anfitrión EE. UU. 2026)',
  },
  Canadá: {
    src: img('sec-stadium-ca.jpg'),
    fallback: equiposSvg,
    alt: 'BC Place — estadio de fútbol en Vancouver',
  },
};
