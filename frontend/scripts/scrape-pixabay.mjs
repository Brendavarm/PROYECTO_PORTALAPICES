import fs from 'fs';

const pages = [
  'https://pixabay.com/videos/soccer-players-running-on-a-soccer-field-19993/',
  'https://pixabay.com/videos/football-soccer-players-4423/',
  'https://pixabay.com/videos/soccer-game-4176/',
  'https://pixabay.com/videos/stadium-football-8574/',
];

for (const page of pages) {
  const res = await fetch(page, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const urls = [
    ...html.matchAll(/https:\/\/cdn\.pixabay\.com\/video\/[^\s"']+\.mp4/g),
  ].map((m) => m[0]);
  const large = html.match(/"large":\s*\{\s*"url":\s*"([^"]+)"/);
  const medium = html.match(/"medium":\s*\{\s*"url":\s*"([^"]+)"/);
  console.log('\n', page, 'status', res.status);
  console.log('  urls', urls.slice(0, 3));
  console.log('  large', large?.[1]);
  console.log('  medium', medium?.[1]);
}
