import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductPreview from '../components/ProductPreview';
import PageHeader from '../components/ui/PageHeader';
import { createPersonalizacion } from '../services/api';
import { COLORS, CARRERAS, PRODUCTO_BASE, PLUS_OPCIONES } from '../data/constants';
import { MUNDIAL_META } from '../data/mundial2026';
import SeleccionPicker from '../components/SeleccionPicker';
import { calcularPrecio } from '../utils/producto';
import { formatBs } from '../utils/currency';
import MotionField from '../components/motion/MotionField';

export default function CustomizerPage() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    carrera: 'Ingeniería de Sistemas',
    color: 'dorado',
    seleccion_favorita: 'Argentina',
    extras: [],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const toggleExtra = (id) => {
    setForm((f) => ({
      ...f,
      extras: f.extras.includes(id)
        ? f.extras.filter((x) => x !== id)
        : [...f.extras, id],
    }));
  };

  const precio = calcularPrecio(form.extras);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const { data } = await createPersonalizacion({
        nombre: form.nombre,
        correo: form.correo,
        carrera: form.carrera,
        color: form.color,
        seleccion_favorita: form.seleccion_favorita,
        texto_personalizado: form.nombre,
        modelo: PRODUCTO_BASE.id,
        extras: form.extras,
      });
      setSuccess(data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'No pudimos registrar tu pedido. Intenta de nuevo en unos segundos.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell page-shell--spacious">
      <div className="container-app">
        <PageHeader
          center
          eyebrow="Tu pedido"
          title="Arma tu"
          highlight="GoalDesk"
          description="Un solo modelo: portalapicero con soporte de celular. Suma extras plus si necesitas más compartimentos."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.form
            onSubmit={handleSubmit}
            className="card card-body space-y-6 form-motion"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="rounded-xl border border-[var(--border-accent)] bg-[var(--color-gold-muted)] p-4 text-sm">
              <p className="font-semibold">{PRODUCTO_BASE.name}</p>
              <p className="mt-1 text-muted leading-relaxed">{PRODUCTO_BASE.desc}</p>
              <p className="price-tag price-tag--sm mt-3">
                Desde {formatBs(PRODUCTO_BASE.price)}
              </p>
            </div>

            <MotionField>
              <label className="field-label" htmlFor="nombre">
                Nombre completo
              </label>
              <input
                id="nombre"
                type="text"
                required
                value={form.nombre}
                onChange={(e) => update('nombre', e.target.value)}
                className="input-field"
                placeholder="Ej: Carlos Mendoza"
              />
            </MotionField>

            <MotionField>
              <label className="field-label" htmlFor="correo">
                Correo
              </label>
              <input
                id="correo"
                type="email"
                required
                value={form.correo}
                onChange={(e) => update('correo', e.target.value)}
                className="input-field"
                placeholder="nombre@unifranz.edu.bo"
              />
            </MotionField>

            <MotionField>
              <label className="field-label" htmlFor="carrera">
                Carrera
              </label>
              <select
                id="carrera"
                value={form.carrera}
                onChange={(e) => update('carrera', e.target.value)}
                className="select-field"
              >
                {CARRERAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </MotionField>

            <MotionField>
              <span className="field-label">Color del filamento</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => update('color', c.id)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                      form.color === c.id
                        ? 'border-[var(--color-gold)] bg-[var(--color-gold-muted)]'
                        : 'border-[var(--border-subtle)]'
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.label}
                  </button>
                ))}
              </div>
            </MotionField>

            <MotionField>
              <span className="field-label">Tu selección del Mundial 2026</span>
              <p className="mt-1 text-xs text-muted">
                Elige una de las {MUNDIAL_META.totalTeams} selecciones clasificadas (equipos
                nacionales, no clubes). El nombre que ves abajo es el que figurará en tu
                pedido.
              </p>
              <div className="mt-2">
                <SeleccionPicker
                  id="seleccion"
                  value={form.seleccion_favorita}
                  onChange={(v) => update('seleccion_favorita', v)}
                />
              </div>
            </MotionField>

            <MotionField>
              <span className="field-label">Extras plus (opcional)</span>
              <p className="mt-1 text-xs text-muted">
                El mismo portalapicero; solo cambia la cantidad de compartimentos u otros
                detalles al imprimir.
              </p>
              <div className="mt-3 space-y-3">
                {PLUS_OPCIONES.map((o) => {
                  const on = form.extras.includes(o.id);
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => toggleExtra(o.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                        on
                          ? 'border-[var(--color-gold)] bg-[var(--color-gold-muted)]'
                          : 'border-[var(--border-subtle)] hover:border-[var(--border-accent)]'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-bold ${
                          on
                            ? 'border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--bg-base)]'
                            : 'border-[var(--border-subtle)]'
                        }`}
                        aria-hidden
                      >
                        {on ? '+' : ''}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="font-semibold">{o.label}</span>
                        <span className="mt-1 block text-xs text-muted">{o.desc}</span>
                        <span className="price-tag price-tag--sm mt-2 inline-block">
                          +{formatBs(o.price)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </MotionField>

            <motion.button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Guardando...' : `Confirmar pedido · ${formatBs(precio)}`}
            </motion.button>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="alert alert--error"
                  role="alert"
                >
                  {error}
                </motion.p>
              )}
              {success && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="alert alert--success"
                  role="status"
                >
                  Pedido #{success.pedido?.id} registrado correctamente.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>

          <aside className="lg:sticky lg:top-28 lg:self-start space-y-6">
            <p className="text-center text-sm font-medium text-muted">Así se verá el tuyo</p>
            <ProductPreview
              nombre={form.nombre || 'TU NOMBRE'}
              color={form.color}
              seleccion={form.seleccion_favorita}
              extras={form.extras}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
