import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHeader from '../components/ui/PageHeader';
import { getProductos } from '../services/api';
import { PRODUCTO_BASE, PLUS_OPCIONES } from '../data/constants';
import { formatBs } from '../utils/currency';
import MediaImage from '../components/ui/MediaImage';
import { PRODUCT_VIEWS_4, PRODUCT_PHOTOS } from '../data/siteImages';
import ProductGallery from '../components/ProductGallery';
import productHeroSvg from '../assets/covers/product-hero.svg';

const fallbackProduct = {
  id: PRODUCTO_BASE.id,
  nombre: PRODUCTO_BASE.name,
  descripcion: PRODUCTO_BASE.desc,
  precio: PRODUCTO_BASE.price,
  stock: 40,
};

export default function CatalogPage() {
  const [producto, setProducto] = useState(fallbackProduct);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductos()
      .then(({ data }) => {
        const item = data?.length ? data[0] : fallbackProduct;
        setProducto({
          ...fallbackProduct,
          ...item,
          nombre: item.nombre || fallbackProduct.nombre,
          descripcion: item.descripcion || fallbackProduct.descripcion,
          precio: item.precio ?? fallbackProduct.precio,
        });
      })
      .catch(() => setProducto(fallbackProduct))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-shell page-shell--spacious">
      <div className="container-app">
        <PageHeader
          center
          eyebrow="Tienda"
          title="Nuestro"
          highlight="producto"
          description="Un solo diseño impreso en 3D. Personaliza color, selección y extras plus."
        />

        {loading ? (
          <p className="mt-20 text-center text-muted">Cargando...</p>
        ) : (
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <ScrollReveal>
              <article className="card card--interactive overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)]">
                  <ProductGallery views={PRODUCT_VIEWS_4} defaultId="front" priority />
                </div>
                <div className="card-body">
                  <span className="chip chip--gold w-fit">Portalapicero + celular</span>
                  <h2 className="heading-md mt-4">{producto.nombre}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{producto.descripcion}</p>
                  <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-[var(--border-subtle)] pt-5">
                    <span className="price-tag">{formatBs(producto.precio)}</span>
                    <span className="text-xs text-muted">Disponibles: {producto.stock}</span>
                  </div>
                  <Link to="/personalizar" className="btn btn-primary mt-6 w-full">
                    Personalizar y pedir
                  </Link>
                </div>
              </article>
            </ScrollReveal>

            <div className="space-y-6">
              <ScrollReveal delay={0.05}>
                <MediaImage
                  src={PRODUCT_PHOTOS.group.src}
                  fallback={productHeroSvg}
                  alt={PRODUCT_PHOTOS.group.alt}
                  aspect="square"
                />
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="card card-body">
                  <h3 className="heading-md">Extras plus</h3>
                  <p className="mt-2 text-sm text-muted">
                    Mismo modelo; puedes sumar compartimentos u otros detalles al pedir.
                  </p>
                  <ul className="mt-5 space-y-4">
                    {PLUS_OPCIONES.map((o) => (
                      <li
                        key={o.id}
                        className="flex justify-between gap-4 border-b border-[var(--border-subtle)] pb-3 last:border-0 last:pb-0"
                      >
                        <span>
                          <span className="font-medium text-sm">{o.label}</span>
                          <span className="mt-1 block text-xs text-muted">{o.desc}</span>
                        </span>
                        <span className="price-tag price-tag--sm shrink-0">+{formatBs(o.price)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
