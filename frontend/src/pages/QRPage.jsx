import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import FeatureIcon from '../components/ui/FeatureIcon';
import { useQrBaseUrl } from '../hooks/useQrBaseUrl';
import MediaImage from '../components/ui/MediaImage';
import { SITE_IMAGES } from '../data/siteImages';

const SOCIAL_URL =
  import.meta.env.VITE_SOCIAL_URL || 'https://www.instagram.com/unifranzoficial';

const STEPS = [
  { n: '1', text: 'Abre la cámara de tu celular.' },
  { n: '2', text: 'Apunta al código cuadrado de abajo.' },
  { n: '3', text: 'Toca el enlace que aparece en pantalla.' },
  { n: '4', text: '¡Listo! Verás el catálogo y podrás armar tu GoalDesk.' },
];

export default function QRPage() {
  const { qrValue, isLocalhost, loading, error, refresh, source } = useQrBaseUrl();
  const [copied, setCopied] = useState(false);

  const canShowQr = qrValue && !isLocalhost && !loading;

  const copyLink = async () => {
    if (!qrValue) return;
    try {
      await navigator.clipboard.writeText(qrValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="page-shell page-shell--spacious">
      <div className="container-app max-w-3xl">
        <PageHeader
          center
          eyebrow="Tu GoalDesk"
          title="Escanea y entra al"
          highlight="mundo GoalDesk"
          description="Cada organizador trae un código. Con él ves precios, personalizas el tuyo y conoces más del emprendimiento."
        />

        <div className="mt-8">
          <MediaImage
            src={SITE_IMAGES.qr.src}
            fallback={SITE_IMAGES.qr.fallback}
            alt="Escanea el código QR del producto"
            aspect="banner"
          />
        </div>

        <div className="qr-hero card mt-10 p-8 md:p-12 text-center">
          {loading ? (
            <p className="py-16 text-muted">Preparando tu código...</p>
          ) : canShowQr ? (
            <>
              <div className="qr-frame mx-auto inline-block rounded-2xl bg-white p-4 shadow-lg">
                <QRCodeSVG value={qrValue} size={240} level="H" includeMargin fgColor="#0c1222" />
              </div>
              <p className="mt-8 text-lg font-semibold">Escanea con tu celular</p>
              <p className="mt-2 text-sm text-muted">
                {source === 'internet'
                  ? 'Funciona con datos móviles u otra WiFi (enlace público).'
                  : source === 'red-local'
                    ? 'Solo funciona en la misma WiFi que esta PC.'
                    : 'Abre el enlace y llegarás a la página principal.'}
              </p>
              <button type="button" onClick={copyLink} className="btn btn-secondary btn-sm mt-6">
                {copied ? 'Enlace copiado' : 'Copiar enlace para compartir'}
              </button>
            </>
          ) : (
            <div className="py-12">
              <p className="text-muted">
                El código se está configurando. Si eres del equipo, abre las opciones avanzadas
                abajo.
              </p>
            </div>
          )}

          {error && (
            <p className="alert alert--error mt-6 text-left text-sm" role="alert">
              {error}
            </p>
          )}
        </div>

        <section className="mt-12">
          <h2 className="heading-md text-center">¿Cómo funciona?</h2>
          <ol className="steps-list mt-8">
            {STEPS.map((step) => (
              <li key={step.n} className="steps-list__item card card-body">
                <span className="steps-list__num">{step.n}</span>
                <span className="steps-list__text">{step.text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 grid gap-5 sm:grid-cols-3">
          <Link to="/catalogo" className="card card--interactive card-body text-center">
            <div className="card-icon-wrap mx-auto">
              <FeatureIcon name="catalog" className="h-5 w-5" />
            </div>
            <p className="heading-md mt-4">Ver precios</p>
            <p className="mt-2 text-sm text-muted">Desde Bs 50</p>
          </Link>
          <Link to="/personalizar" className="card card--interactive card-body text-center">
            <div className="card-icon-wrap mx-auto">
              <FeatureIcon name="palette" className="h-5 w-5" />
            </div>
            <p className="heading-md mt-4">Armar el mío</p>
            <p className="mt-2 text-sm text-muted">Elige color y selección</p>
          </Link>
          <a
            href={SOCIAL_URL}
            target="_blank"
            rel="noreferrer"
            className="card card--interactive card-body text-center"
          >
            <div className="card-icon-wrap mx-auto">
              <FeatureIcon name="link" className="h-5 w-5" />
            </div>
            <p className="heading-md mt-4">Síguenos</p>
            <p className="mt-2 text-sm text-muted">Redes UNIFRANZ</p>
          </a>
        </section>

        <details className="advanced-qr card card-body mt-14">
          <summary className="cursor-pointer text-sm font-semibold text-muted">
            Opciones para el equipo (configuración técnica)
          </summary>
          <div className="mt-6 space-y-4 border-t border-[var(--border-subtle)] pt-6 text-sm text-muted text-left">
            <p className="font-semibold text-[var(--text-primary)]">
              Para que funcione fuera de tu WiFi (datos del celular):
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Backend y frontend encendidos (`npm run dev` en cada carpeta).</li>
              <li>
                Túnel: en la raíz del proyecto ejecuta{' '}
                <code className="text-xs">npm run tunnel:cloudflare</code> y copia la URL{' '}
                <code className="text-xs">https://….trycloudflare.com</code>.
              </li>
              <li>
                En <code className="text-xs">backend/.env</code> pon{' '}
                <code className="text-xs">PUBLIC_APP_URL</code> y{' '}
                <code className="text-xs">FRONTEND_URL</code> con esa URL. Reinicia el backend.
              </li>
              <li>
                Recarga esta página y verifica que el enlace abajo sea HTTPS (no localhost ni
                192.168…).
              </li>
            </ol>
            <p>
              Guía completa:{' '}
              <span className="text-[var(--color-gold)]">docs/PUBLICAR-EN-INTERNET.md</span>
            </p>
            {qrValue && (
              <p className="break-all rounded-lg bg-[var(--bg-elevated)] p-3 font-mono text-xs">
                {qrValue}
              </p>
            )}
            <button type="button" onClick={refresh} className="btn btn-secondary btn-sm">
              Actualizar enlace del QR
            </button>
          </div>
        </details>
      </div>
    </div>
  );
}
