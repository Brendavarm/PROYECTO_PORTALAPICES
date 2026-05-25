import { useCallback, useEffect, useState } from 'react';
import { getNetworkInfo } from '../services/api';
import { getPublicAppUrl, isLocalhostUrl } from '../utils/appUrl';

const STORAGE_KEY = 'goaldesk-qr-base-url';

function normalizeBase(url) {
  return url?.trim().replace(/\/$/, '') ?? '';
}

export function useQrBaseUrl() {
  const [baseUrl, setBaseUrl] = useState('');
  const [manualUrl, setManualUrl] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [candidates, setCandidates] = useState([]);
  const [interfaceOptions, setInterfaceOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('');

  const resolveUrl = useCallback(async () => {
    setLoading(true);
    setError(null);

    const saved = normalizeBase(manualUrl);
    if (saved && !isLocalhostUrl(saved)) {
      setBaseUrl(saved);
      setSource('manual');
      setLoading(false);
      return;
    }

    const browserUrl = normalizeBase(
      typeof window !== 'undefined' ? window.location.origin : getPublicAppUrl()
    );
    if (!isLocalhostUrl(browserUrl)) {
      setBaseUrl(browserUrl);
      setSource('navegador');
      setCandidates([]);
      setLoading(false);
      return;
    }

    try {
      const { data } = await getNetworkInfo();
      const list = data.addresses || [];
      setCandidates(list);
      setInterfaceOptions(data.interfaces || []);

      const publicUrl = normalizeBase(data.publicAppUrl || data.suggestedAppUrl);
      if (publicUrl && !isLocalhostUrl(publicUrl)) {
        setBaseUrl(publicUrl);
        setSource(data.qrMode === 'internet' ? 'internet' : 'red-local');
        setLoading(false);
        return;
      }

      setBaseUrl('');
      setSource('');
      setError(
        'No se detectó IP de red. Escribe la IP de tu PC abajo (la muestra Vite al iniciar).'
      );
    } catch {
      setError(
        'No se pudo contactar el backend. Inicia npm run dev en la carpeta backend y recarga.'
      );
      setBaseUrl('');
    } finally {
      setLoading(false);
    }
  }, [manualUrl]);

  useEffect(() => {
    resolveUrl();
  }, [resolveUrl]);

  const saveManualUrl = (url) => {
    const normalized = normalizeBase(url);
    if (normalized && isLocalhostUrl(normalized)) {
      setError('No uses localhost en el celular. Usa la IP 192.168.x.x de tu WiFi.');
      return;
    }
    setManualUrl(normalized);
    if (normalized) localStorage.setItem(STORAGE_KEY, normalized);
    else localStorage.removeItem(STORAGE_KEY);
  };

  const applyManual = () => {
    saveManualUrl(manualUrl);
    resolveUrl();
  };

  const selectCandidate = (ip) => {
    const port = window.location.port || '5173';
    const url = `http://${ip}:${port}`;
    saveManualUrl(url);
    setBaseUrl(url);
    setSource('manual');
    setError(null);
  };

  return {
    baseUrl,
    qrValue: baseUrl ? `${baseUrl}/` : '',
    isLocalhost: !baseUrl || isLocalhostUrl(baseUrl),
    manualUrl,
    setManualUrl,
    applyManual,
    selectCandidate,
    candidates,
    interfaceOptions,
    loading,
    error,
    source,
    refresh: resolveUrl,
  };
}
