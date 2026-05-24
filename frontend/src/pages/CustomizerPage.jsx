import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductPreview from '../components/ProductPreview';
import PageHeader from '../components/ui/PageHeader';
import { createPersonalizacion } from '../services/api';
import { COLORS, CARRERAS, SELECCIONES, MODELOS } from '../data/constants';
import { formatBs } from '../utils/currency';
import MediaImage from '../components/ui/MediaImage';
import MotionField from '../components/motion/MotionField';
import { SITE_IMAGES } from '../data/siteImages';

export default function CustomizerPage() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    carrera: 'Ingeniería de Sistemas',
    color: 'dorado',
    seleccion_favorita: 'Argentina',
    modelo: 'classic',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const precio = MODELOS.find((m) => m.id === form.modelo)?.price ?? 50;

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
        modelo: form.modelo,
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
          description="Completa tus datos, elige el modelo y revisa cómo se verá antes de confirmar."
        />

        <div className="mt-8 max-w-2xl mx-auto lg:hidden">
          <MediaImage
            src={SITE_IMAGES.customizer.src}
            alt={SITE_IMAGES.customizer.alt}
            aspect="wide"
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <motion.form
              onSubmit={handleSubmit}
              className="card card-body space-y-6 form-motion"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
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
              <span className="field-label">Color</span>
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
              <label className="field-label" htmlFor="seleccion">
                Selección favorita
              </label>
              <select
                id="seleccion"
                value={form.seleccion_favorita}
                onChange={(e) => update('seleccion_favorita', e.target.value)}
                className="select-field"
              >
                {SELECCIONES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </MotionField>

            <MotionField>
              <span className="field-label">Modelo y precio</span>
              <div className="mt-3 grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                {MODELOS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => update('modelo', m.id)}
                    className={`rounded-xl border p-4 text-left transition ${
                      form.modelo === m.id
                        ? 'border-[var(--color-gold)] bg-[var(--color-gold-muted)]'
                        : 'border-[var(--border-subtle)] hover:border-[var(--border-accent)]'
                    }`}
                  >
                    <p className="font-semibold">{m.name}</p>
                    <p className="mt-1 text-xs text-muted line-clamp-2">{m.desc}</p>
                    <p className="price-tag price-tag--sm mt-3">{formatBs(m.price)}</p>
                  </button>
                ))}
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
            <MediaImage
              src={SITE_IMAGES.customizer.src}
              alt={SITE_IMAGES.customizer.alt}
              aspect="wide"
              className="hidden lg:block"
            />
            <p className="text-center text-sm font-medium text-muted">Así se verá el tuyo</p>
            <ProductPreview
              nombre={form.nombre || 'TU NOMBRE'}
              color={form.color}
              seleccion={form.seleccion_favorita}
              modelo={form.modelo}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
