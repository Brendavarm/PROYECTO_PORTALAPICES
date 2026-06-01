import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';

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
          <p className="text-sm font-semibold">Redes oficiales</p>
          <SocialLinks variant="text" className="mt-3" />
          <p className="mt-6 text-xs text-muted">© 2026 GoalDesk Smart — UNIFRANZ</p>
        </div>
      </div>
    </footer>
  );
}
