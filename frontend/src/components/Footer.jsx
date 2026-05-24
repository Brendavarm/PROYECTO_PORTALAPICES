import { Link } from 'react-router-dom';

const SOCIAL_URL =
  import.meta.env.VITE_SOCIAL_URL || 'https://www.instagram.com/unifranzoficial';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-12">
      <div className="container-app grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">
            GoalDesk <span className="accent-word">Smart</span> 2026
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Emprendimiento de Ingeniería de Sistemas — UNIFRANZ. Organizador 3D temática Mundial
            FIFA 2026.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Navegación</p>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-muted">
            <Link to="/mundial" className="hover:text-[var(--color-gold)]">
              Centro del Mundial
            </Link>
            <Link to="/catalogo" className="hover:text-[var(--color-gold)]">
              Catálogo
            </Link>
            <Link to="/personalizar" className="hover:text-[var(--color-gold)]">
              Personalizar
            </Link>
            <Link to="/qr" className="hover:text-[var(--color-gold)]">
              Código QR
            </Link>
            <Link to="/admin" className="hover:text-[var(--color-gold)]">
              Administración
            </Link>
          </nav>
        </div>
        <div>
          <p className="text-sm font-semibold">Contacto</p>
          <a
            href={SOCIAL_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-muted underline-offset-4 hover:text-[var(--color-gold)] hover:underline"
          >
            Instagram
          </a>
          <p className="mt-6 text-xs text-muted">© 2026 GoalDesk Smart — UNIFRANZ</p>
        </div>
      </div>
    </footer>
  );
}
