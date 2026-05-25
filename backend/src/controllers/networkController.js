import { getLanIpv4Addresses, getSuggestedFrontendUrl } from '../lib/network.js';

const FRONTEND_PORT = Number(process.env.FRONTEND_PORT) || 5173;
const LOCALHOST_RE = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i;

function normalizePublicUrl(url) {
  const trimmed = url?.trim().replace(/\/$/, '');
  if (!trimmed || LOCALHOST_RE.test(trimmed)) return null;
  return trimmed;
}

export function getNetworkInfo(req, res) {
  const addresses = getLanIpv4Addresses();
  const publicAppUrl = normalizePublicUrl(process.env.PUBLIC_APP_URL);
  const suggestedAppUrl = getSuggestedFrontendUrl(FRONTEND_PORT);
  const internet = Boolean(publicAppUrl);

  res.json({
    frontendPort: FRONTEND_PORT,
    publicAppUrl,
    qrMode: internet ? 'internet' : 'lan',
    addresses: addresses.map((a) => a.address),
    interfaces: addresses.map((a) => ({
      address: a.address,
      name: a.interface,
      label: a.interface,
    })),
    suggestedAppUrl,
    qrTargetUrl: suggestedAppUrl ? `${suggestedAppUrl}/` : null,
    hint: internet
      ? 'QR listo para internet (datos móviles u otra WiFi). Mantén el túnel y el backend encendidos.'
      : suggestedAppUrl
        ? 'Solo misma WiFi. Para otra red, configura PUBLIC_APP_URL con un túnel (ver docs/PUBLICAR-EN-INTERNET.md).'
        : 'No se detectó IP de red. Configura PUBLIC_APP_URL en backend/.env',
  });
}
