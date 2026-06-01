import { SITE_IMAGES, PRODUCT_PHOTOS } from './siteImages';

const img = (file) => `/images/photos/${file}`;

/**
 * Video de fondo del hero — public/videos/hero-mundial.mp4
 * Enfoque: momento de estrella (gol / retrato), no partido genérico de lejos.
 * Stock Mixkit (sin clips oficiales FIFA con jugadores identificables).
 */
export const HERO_BACKGROUND_VIDEO = {
  title: 'Gol nocturno — jugador en primer plano — Mixkit',
  localSrc: '/videos/hero-mundial.mp4',
  fallbackImage: SITE_IMAGES.hero.src,
  matchPoster: img('photo-15-gd-celebration.jpg'),
  mp4Sources: [
    { src: '/videos/hero-mundial.mp4', type: 'video/mp4' },
    { src: 'https://assets.mixkit.co/videos/2925/2925-720.mp4', type: 'video/mp4' },
    { src: 'https://assets.mixkit.co/videos/42566/42566-720.mp4', type: 'video/mp4' },
    { src: 'https://assets.mixkit.co/videos/15196/15196-720.mp4', type: 'video/mp4' },
  ],
};

/** Videos promocionales propios — public/videos/ */
export const PROMO_VIDEOS = {
  main: {
    id: 'main',
    src: '/videos/videoprom.mp4',
    badge: 'Video promocional',
    title: 'GoalDesk en acción',
    lead: 'Así luce el portalapicero en uso: organización, soporte de celular y estilo Mundial 2026.',
    caption: 'GoalDesk Smart · UNIFRANZ · Emprendimiento 2026',
    poster: PRODUCT_PHOTOS.front.src,
    posterFallback: SITE_IMAGES.product.fallback,
    alt: 'Video promocional del organizador GoalDesk portalapicero',
  },
  secondary: {
    id: 'secondary',
    src: '/videos/videoprom2.mp4',
    badge: 'Segundo clip',
    title: 'Detalle del producto',
    lead: 'Otra toma del portalapicero para ver acabados, compartimentos y la base UNIFRANZ.',
    caption: 'Impresión 3D · Personalizable en la web',
    poster: PRODUCT_PHOTOS.lifestyle.src,
    posterFallback: SITE_IMAGES.product.fallback,
    alt: 'Video complementario del producto GoalDesk',
  },
};
