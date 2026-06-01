import fs from 'fs';

const candidates = [
  { id: 42566, note: 'Portrait confident football player night' },
  { id: 44602, note: 'World Cup goal celebration friends' },
  { id: 43477, note: 'Team cheering' },
  { id: 15196, note: 'Scoring goal celebration' },
  { id: 2804, note: 'Players in action' },
  { id: 6717, note: 'Young players scoring' },
  { id: 2925, note: 'Player scoring goal night' },
  { id: 44599, note: 'Brazil WC fan' },
];

for (const c of candidates) {
  const url = `https://assets.mixkit.co/videos/${c.id}/${c.id}-720.mp4`;
  try {
    const r = await fetch(url, {
      headers: { Referer: 'https://mixkit.co/', 'User-Agent': 'Mozilla/5.0' },
    });
    const buf = Buffer.from(await r.arrayBuffer());
    console.log(c.id, c.note, r.status, (buf.length / 1024 / 1024).toFixed(2), 'MB');
  } catch (e) {
    console.log(c.id, 'ERR', e.message);
  }
}
