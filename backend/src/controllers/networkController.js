import { getLanIpv4Addresses, getSuggestedFrontendUrl } from '../lib/network.js';

const FRONTEND_PORT = Number(process.env.FRONTEND_PORT) || 5173;

export function getNetworkInfo(req, res) {
  const addresses = getLanIpv4Addresses();
  const suggestedAppUrl = getSuggestedFrontendUrl(FRONTEND_PORT);

  res.json({
    frontendPort: FRONTEND_PORT,
    addresses: addresses.map((a) => a.address),
    interfaces: addresses.map((a) => ({
      address: a.address,
      name: a.interface,
      label: a.interface,
    })),
    suggestedAppUrl,
    qrTargetUrl: suggestedAppUrl ? `${suggestedAppUrl}/` : null,
    hint: suggestedAppUrl
      ? 'Usa esta URL en el QR. PC y celular deben estar en la misma WiFi.'
      : 'No se detectó IP de red. Configura PUBLIC_APP_URL en backend/.env',
  });
}
