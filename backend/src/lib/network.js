import os from 'os';

const LOCALHOST_RE = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i;

function isPrivateIpv4(address) {
  if (address.startsWith('192.168.')) return true;
  if (address.startsWith('10.')) return true;
  const parts = address.split('.').map(Number);
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  return false;
}

/** Direcciones IPv4 de la PC en la red local (no loopback). */
export function getLanIpv4Addresses() {
  const nets = os.networkInterfaces();
  const result = [];

  for (const [interfaceName, entries] of Object.entries(nets)) {
    for (const entry of entries || []) {
      const family = entry.family === 'IPv4' || entry.family === 4;
      if (!family || entry.internal) continue;
      if (!isPrivateIpv4(entry.address)) continue;

      result.push({
        address: entry.address,
        interface: interfaceName,
      });
    }
  }

  const unique = [...new Map(result.map((r) => [r.address, r])).values()];

  const interfaceScore = (iface, address) => {
    const n = iface.toLowerCase();
    if (/virtualbox|vmware|vethernet|docker|wsl|hyper-v|default switch|loopback|bluetooth/i.test(n)) {
      return 100;
    }
    if (/wi-?fi|wlan|wireless/i.test(n)) return 0;
    if (/ethernet/i.test(n)) return 10;
    if (address.startsWith('192.168.0.') || address.startsWith('192.168.1.')) return 15;
    if (address.startsWith('192.168.56.') || address.startsWith('192.168.57.')) return 90;
    return 40;
  };

  unique.sort(
    (a, b) =>
      interfaceScore(a.interface, a.address) - interfaceScore(b.interface, b.address) ||
      a.address.localeCompare(b.address)
  );

  return unique;
}

export function getSuggestedFrontendUrl(port = 5173) {
  const fromEnv = process.env.PUBLIC_APP_URL?.trim() || process.env.FRONTEND_URL?.trim();
  if (fromEnv && !LOCALHOST_RE.test(fromEnv)) {
    return fromEnv.replace(/\/$/, '');
  }

  const lan = getLanIpv4Addresses();
  if (lan.length > 0) {
    return `http://${lan[0].address}:${port}`;
  }

  return null;
}
