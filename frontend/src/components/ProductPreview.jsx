import { COLORS, MODELOS } from '../data/constants';
import { formatBs } from '../utils/currency';
import FeatureIcon from './ui/FeatureIcon';

export default function ProductPreview({
  nombre = 'TU NOMBRE',
  color = 'dorado',
  seleccion = 'Argentina',
  modelo = 'classic',
}) {
  const colorHex = COLORS.find((c) => c.id === color)?.hex || '#c9a227';
  const modelInfo = MODELOS.find((m) => m.id === modelo);
  const displayName = nombre.trim() || 'TU NOMBRE';

  return (
    <div className="card overflow-hidden">
      <div
        className="flex min-h-[220px] flex-col items-center justify-center px-6 py-10"
        style={{
          background: `linear-gradient(165deg, ${colorHex}22 0%, var(--bg-elevated) 55%)`,
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2"
          style={{ borderColor: colorHex, color: colorHex }}
        >
          <FeatureIcon name="box" className="h-8 w-8" />
        </div>
        <p
          className="max-w-full truncate text-center text-lg font-bold tracking-wide"
          style={{ color: colorHex }}
          title={displayName.toUpperCase()}
        >
          {displayName.toUpperCase()}
        </p>
        <p className="mt-1 text-sm text-muted">{seleccion}</p>
      </div>

      <div className="card-body space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted">Modelo</span>
          <span className="font-medium">{modelInfo?.name ?? modelo}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted">Color</span>
          <span className="flex items-center gap-2 capitalize">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colorHex }} />
            {color}
          </span>
        </div>
        <div className="flex justify-between gap-4 border-t border-[var(--border-subtle)] pt-3">
          <span className="text-muted">Precio</span>
          <span className="price-tag price-tag--sm">{formatBs(modelInfo?.price ?? 50)}</span>
        </div>
      </div>
    </div>
  );
}
