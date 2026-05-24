import { Link } from 'react-router-dom';
import FeatureIcon from '../ui/FeatureIcon';
import { ADMIN_SECTIONS } from './adminConfig';

export default function AdminNav({
  activeTab,
  onTabChange,
  onRefresh,
  onLogout,
  refreshing,
}) {
  return (
    <header className="admin-nav">
      <div className="admin-nav__bar">
        <div className="admin-nav__brand">
          <span className="admin-nav__logo">GoalDesk</span>
          <span className="admin-nav__badge">Gestión</span>
        </div>

        <nav className="admin-nav__menu" aria-label="Secciones de gestión">
          {ADMIN_SECTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`admin-nav__item${
                activeTab === item.id ? ' admin-nav__item--active' : ''
              }`}
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              <FeatureIcon name={item.icon} className="admin-nav__item-icon" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-nav__actions">
          <Link to="/" className="admin-nav__link" title="Abrir la página pública">
            <FeatureIcon name="link" className="h-4 w-4" />
            <span className="admin-nav__link-text">Ver sitio</span>
          </Link>
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="admin-nav__btn admin-nav__btn--ghost"
          >
            {refreshing ? 'Actualizando…' : 'Actualizar datos'}
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="admin-nav__btn admin-nav__btn--outline"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
