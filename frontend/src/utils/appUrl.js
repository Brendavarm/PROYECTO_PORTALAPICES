const LOCALHOST_RE = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

function normalize(url) {
  return url?.replace(/\/$/, '') ?? '';
}

/**
 * URL pública para códigos QR.
 * En el navegador usa el origen actual (p. ej. IP de red en el celular).
 * Si VITE_APP_URL apunta a una IP/host accesible en LAN, también se respeta.
 */
export function getPublicAppUrl() {
  const envUrl = normalize(import.meta.env.VITE_APP_URL);

  if (typeof window !== 'undefined') {
    const origin = normalize(window.location.origin);
    if (!LOCALHOST_RE.test(origin)) return origin;
    if (envUrl && !LOCALHOST_RE.test(envUrl)) return envUrl;
    return origin;
  }

  return envUrl || 'http://localhost:5173';
}

export function isLocalhostUrl(url) {
  return LOCALHOST_RE.test(url || '');
}
