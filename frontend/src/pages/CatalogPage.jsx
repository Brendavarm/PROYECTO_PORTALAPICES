import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHeader from '../components/ui/PageHeader';
import { getProductos } from '../services/api';
import { MODELOS } from '../data/constants';
import { formatBs } from '../utils/currency';
import MediaImage from '../components/ui/MediaImage';
import { MODEL_IMAGES, SITE_IMAGES } from '../data/siteImages';

const fallbackProducts = MODELOS.map((m) => ({
  id: m.id,
  nombre: `GoalDesk ${m.name}`,
  descripcion: m.desc,
  precio: m.price,
  stock: 25,
}));

export default function CatalogPage() {
  const [productos, setProductos] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductos()
      .then(({ data }) => setProductos(data.length ? data : fallbackProducts))
      .catch(() => setProductos(fallbackProducts))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-shell page-shell--spacious">
      <div className="container-app">
        <PageHeader
          center
          eyebrow="Tienda"
          title="Nuestros"
          highlight="modelos"
          description="Todos los precios están en bolivianos. Elige y personaliza en el siguiente paso."
        />

        <div className="mt-10 max-w-3xl mx-auto">
          <MediaImage
            src={SITE_IMAGES.heroAccent.src}
            alt={SITE_IMAGES.heroAccent.alt}
            aspect="wide"
          />
        </div>

        {loading ? (
          <p className="mt-20 text-center text-muted">Cargando modelos...</p>
        ) : (
          <div className="mt-14 grid grid-loose md:grid-cols-3">
            {productos.map((p, i) => (
              <ScrollReveal key={p.id ?? i} delay={i * 0.08}>
                <article className="card card--interactive card--visual flex h-full flex-col overflow-hidden">
                  <MediaImage
                    src={
                      MODEL_IMAGES[MODELOS[i]?.id]?.src ?? MODEL_IMAGES.classic.src
                    }
                    alt={p.nombre}
                    aspect="landscape"
                    rounded={false}
                    className="card-visual-top card-visual-top--tall"
                  />
                  <div className="card-body flex flex-1 flex-col">
                    <span className="chip chip--muted w-fit text-[10px]">
                      {MODELOS[i]?.name ?? 'Modelo'}
                    </span>
                    <h3 className="heading-md mt-4 leading-snug">{p.nombre}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.descripcion}</p>
                    <div className="mt-8 flex items-end justify-between gap-4 border-t border-[var(--border-subtle)] pt-5">
                      <span className="price-tag">{formatBs(p.precio)}</span>
                      <span className="text-xs text-muted">Disponibles: {p.stock}</span>
                    </div>
                    <Link to="/personalizar" className="btn btn-primary mt-5 w-full">
                      Personalizar este modelo
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
