import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import SocialLinks from './SocialLinks';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/mundial', label: 'Mundial' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/personalizar', label: 'Personalizar' },
  { to: '/qr', label: 'QR' },
];

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden fill="none" stroke="currentColor">
      {open ? (
        <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`nav-bar nav-bar--premium fixed top-0 right-0 left-0 z-50 ${scrolled ? 'nav-bar--scrolled py-3' : 'py-4'}`}
    >
      <div className="container-app flex items-center justify-between gap-4">
        <Link to="/" className="nav-brand">
          <span className="nav-brand__title text-[var(--text-primary)]">
            GoalDesk <span className="accent-word">Smart</span>
          </span>
          <span className="nav-brand__tag">2026</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${location.pathname === l.to ? 'nav-link--active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/admin" className="nav-link text-xs">
            Admin
          </Link>
          <SocialLinks variant="icons" className="nav-social" />
          <ThemeToggle />
          <Link to="/personalizar" className="btn btn-primary btn-sm">
            Pedir el mío
          </Link>
        </nav>

        <button
          type="button"
          className="text-[var(--color-gold)] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="card mx-4 mt-3 p-4 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <SocialLinks variant="pills" className="social-links--mobile-menu flex-1" />
              <ThemeToggle />
            </div>
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="block border-b border-[var(--border-subtle)] py-3 text-center font-medium last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/admin" className="block py-3 text-center text-sm text-muted">
              Admin
            </Link>
            <Link to="/personalizar" className="btn btn-primary mt-3 w-full">
              Pedir el mío
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
