/**
 * Descarga hero-mundial.mp4 desde Mixkit (gol / jugador destacado, no partido genérico).
 * Uso: node scripts/download-hero-video.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.join(__dirname, '../public/videos/hero-mundial.mp4');

const MIXKIT_SOCCER = [
  {
    url: 'https://assets.mixkit.co/videos/2925/2925-720.mp4',
    name: 'Player scoring a goal at night',
    license: 'https://mixkit.co/free-stock-video/player-scoring-a-goal-at-night-2925/',
  },
  {
    url: 'https://assets.mixkit.co/videos/42566/42566-720.mp4',
    name: 'Portrait of a confident football player',
    license: 'https://mixkit.co/free-stock-video/portrait-of-a-confident-football-player-42566/',
  },
  {
    url: 'https://assets.mixkit.co/videos/15196/15196-720.mp4',
    name: 'Scoring a goal and celebrating',
    license: 'https://mixkit.co/free-stock-video/scoring-a-goal-and-celebrating-15196/',
  },
];

async function download(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0',
      Referer: 'https://mixkit.co/',
      Accept: 'video/mp4,*/*',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500_000) throw new Error(`Archivo muy pequeño (${buf.length} bytes)`);
  return buf;
}

async function main() {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

  for (const clip of MIXKIT_SOCCER) {
    try {
      console.log('Descargando:', clip.name);
      const buf = await download(clip.url);
      fs.writeFileSync(outFile, buf);
      console.log('Guardado:', outFile, `(${(buf.length / 1024 / 1024).toFixed(2)} MB)`);
      console.log('Licencia:', clip.license);
      return;
    } catch (e) {
      console.warn('  Falló:', e.message);
    }
  }

  console.error('No se pudo descargar ningún video.');
  process.exit(1);
}

main();
