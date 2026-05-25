import { COLORS, PRODUCTO_BASE, PLUS_OPCIONES } from '../data/constants';
import { getSeleccionMundial2026 } from '../data/mundial2026';
import { calcularPrecio, etiquetaExtras } from '../utils/producto';
import { formatBs } from '../utils/currency';
import MediaImage from './ui/MediaImage';
import { PRODUCT_PHOTOS } from '../data/siteImages';
import productHeroSvg from '../assets/covers/product-hero.svg';

export default function ProductPreview({
  nombre = 'TU NOMBRE',
  color = 'dorado',
  seleccion = 'Argentina',
  extras = [],
}) {
  const colorHex = COLORS.find((c) => c.id === color)?.hex || '#c9a227';
  const displayName = nombre.trim() || 'TU NOMBRE';
  const seleccionInfo = getSeleccionMundial2026(seleccion);
  const seleccionNombre = seleccionInfo?.name ?? seleccion;
  const seleccionFlag = seleccionInfo?.flag ?? '';
  const seleccionApodo = seleccionInfo?.apodo ?? null;
  const precio = calcularPrecio(extras);
  const extrasActivos = PLUS_OPCIONES.filter((o) => extras.includes(o.id));

  return (
    <div className="card overflow-hidden">
      <MediaImage
        src={PRODUCT_PHOTOS.main.src}
        fallback={productHeroSvg}
        alt={PRODUCT_PHOTOS.main.alt}
        aspect="landscape"
        rounded={false}
        className="border-b border-[var(--border-subtle)]"
      />
      <div
        className="px-6 py-5"
        style={{
          background: `linear-gradient(165deg, ${colorHex}22 0%, var(--bg-elevated) 55%)`,
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          {PRODUCTO_BASE.name}
        </p>
        <p
          className="mt-2 max-w-full truncate text-lg font-bold tracking-wide"
          style={{ color: colorHex }}
          title={displayName.toUpperCase()}
        >
          {displayName.toUpperCase()}
        </p>
        <div className="seleccion-engrave mt-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted">
            Selección favorita
          </p>
          <p className="mt-1 flex items-center gap-2 text-base font-bold">
            {seleccionFlag && (
              <span className="text-xl leading-none" aria-hidden>
                {seleccionFlag}
              </span>
            )}
            <span>{seleccionNombre}</span>
          </p>
          {seleccionApodo && (
            <p className="mt-0.5 text-xs text-muted">{seleccionApodo}</p>
          )}
        </div>
      </div>

      <div className="card-body space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted">Selección</span>
          <span className="text-right font-medium">
            {seleccionFlag ? `${seleccionFlag} ` : ''}
            {seleccionNombre}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted">Base</span>
          <span className="font-medium">{formatBs(PRODUCTO_BASE.price)}</span>
        </div>
        {extrasActivos.length > 0 ? (
          <ul className="space-y-2 border-t border-[var(--border-subtle)] pt-3">
            {extrasActivos.map((o) => (
              <li key={o.id} className="flex justify-between gap-4 text-xs">
                <span className="text-muted">{o.label}</span>
                <span>+{formatBs(o.price)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-muted border-t border-[var(--border-subtle)] pt-3">
            {etiquetaExtras(extras)}
          </p>
        )}
        <div className="flex justify-between gap-4">
          <span className="text-muted">Color</span>
          <span className="flex items-center gap-2 capitalize">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colorHex }} />
            {color}
          </span>
        </div>
        <div className="flex justify-between gap-4 border-t border-[var(--border-subtle)] pt-3">
          <span className="text-muted">Total</span>
          <span className="price-tag price-tag--sm">{formatBs(precio)}</span>
        </div>
      </div>
    </div>
  );
}
