import { useState } from 'react';
import { PRODUCT_VIEWS_4 } from '../data/siteImages';
import productHeroSvg from '../assets/covers/product-hero.svg';

/**
 * Galería del portalapicero — 4 direcciones (frente, costado, atrás, otro costado)
 */
export default function ProductGallery({
  views = PRODUCT_VIEWS_4,
  defaultId = 'front',
  className = '',
  priority = false,
}) {
  const safeViews = views.length ? views : PRODUCT_VIEWS_4;
  const [activeId, setActiveId] = useState(
    safeViews.some((v) => v.id === defaultId) ? defaultId : safeViews[0].id
  );
  const active = safeViews.find((v) => v.id === activeId) ?? safeViews[0];
  const [failed, setFailed] = useState(false);

  const selectView = (view) => {
    setActiveId(view.id);
    setFailed(false);
  };

  const mainSrc = failed ? productHeroSvg : active.src;

  return (
    <div className={`product-gallery ${className}`.trim()}>
      <div className="product-gallery__stage">
        <img
          key={active.id}
          src={mainSrc}
          alt={active.alt}
          className="product-gallery__main"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
        <span className="product-gallery__badge">{active.label}</span>
      </div>
      <div className="product-gallery__thumbs" role="tablist" aria-label="Vistas del producto">
        {safeViews.map((view) => (
          <button
            key={view.id}
            type="button"
            role="tab"
            aria-selected={view.id === activeId}
            aria-label={view.label}
            className={`product-gallery__thumb${
              view.id === activeId ? ' product-gallery__thumb--active' : ''
            }`}
            onClick={() => selectView(view)}
          >
            <img src={view.src} alt="" className="product-gallery__thumb-img" loading="lazy" />
            <span className="product-gallery__thumb-label">{view.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
