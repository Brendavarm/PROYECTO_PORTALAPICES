import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroProduct from '../components/HeroProduct';
import PageHeader from '../components/ui/PageHeader';
import FeatureIcon from '../components/ui/FeatureIcon';
import EditorialCard from '../components/ui/EditorialCard';
import Countdown from '../components/Countdown';
import MediaImage from '../components/ui/MediaImage';
import MotionBackdrop from '../components/motion/MotionBackdrop';
import AnimatedHeadline from '../components/motion/AnimatedHeadline';
import MarqueeStrip from '../components/motion/MarqueeStrip';
import { StaggerGrid, StaggerItem } from '../components/motion/StaggerGrid';
import { formatBs } from '../utils/currency';
import { FUTURE_FEATURES, PRODUCTO_BASE, PLUS_OPCIONES } from '../data/constants';
import { MUNDIAL_TOPICS, MUNDIAL_META } from '../data/mundial2026';
import {
  SITE_IMAGES,
  FEATURE_IMAGES,
  PRODUCT_VIEWS_4,
  resolveImage,
} from '../data/siteImages';
import ProductGallery from '../components/ProductGallery';

const PRODUCT_FEATURES = [
  { icon: 'ball', title: 'Estilo Mundial', desc: 'Diseño inspirado en la Copa 2026 para tu escritorio.' },
  { icon: 'phone', title: 'Soporte de celular', desc: 'Ideal para clases en línea, videos o música.' },
  { icon: 'box', title: 'Todo ordenado', desc: 'Lapiceros, cables y accesorios en un solo lugar.' },
  { icon: 'palette', title: 'Personalizado', desc: 'Tu nombre, color y selección favorita.' },
];

function SectionWrap({ children, alt = false }) {
  return (
    <section className={`section-block ${alt ? 'section-block--alt' : ''}`}>
      <div className="section-centered">{children}</div>
    </section>
  );
}

function StaticEditorialCard({ featured, imageSrc, imageAlt, imageFallback, icon, title, desc, children }) {
  const img = resolveImage(
    typeof imageSrc === 'object' && imageSrc?.src
      ? imageSrc
      : { src: imageSrc, fallback: imageFallback, alt: imageAlt }
  );

  return (
    <StaggerItem>
      <motion.article
        className={`editorial-card editorial-card--static${
          featured ? ' editorial-card--featured' : ''
        }`}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="editorial-card__media-wrap"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <MediaImage
            src={img.src}
            fallback={img.fallback}
            alt={imageAlt || img.alt}
            aspect="banner"
            rounded={false}
            className="editorial-card__media"
          />
          <span className="editorial-card__shine" aria-hidden />
        </motion.div>
        <div className="editorial-card__body">
          {icon && <FeatureIcon name={icon} className="editorial-card__icon" />}
          <h3 className="editorial-card__title">{title}</h3>
          <p className="editorial-card__teaser">{desc}</p>
          {children}
        </div>
        <span className="editorial-card__accent" aria-hidden />
      </motion.article>
    </StaggerItem>
  );
}

export default function LandingPage() {
  return (
    <motion.div
      className="landing-page landing-page--premium landing-page--motion"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="hero-cinematic">
        <div className="hero-cinematic__bg-wrap hero-cinematic__bg-wrap--enter">
          <MediaImage
            src={SITE_IMAGES.hero.src}
            fallback={SITE_IMAGES.hero.fallback}
            alt={SITE_IMAGES.hero.alt}
            aspect="cinematic"
            rounded={false}
            priority
            className="hero-cinematic__bg"
          />
        </div>
        <MotionBackdrop intensity="medium" />
        <div className="hero-cinematic__shade" aria-hidden />
        <div className="hero-cinematic__grid container-app">
          <div className="hero-cinematic__content hero-cinematic__content--enter">
            <motion.p
              className="eyebrow eyebrow--light"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              UNIFRANZ · Emprendimiento 2026
            </motion.p>
            <AnimatedHeadline
              lines={[
                {
                  parts: [{ text: 'Tu escritorio,' }],
                },
                {
                  parts: [
                    { text: 'pasión', accent: true },
                    { text: 'mundial', accent: true },
                  ],
                },
              ]}
            />
            <motion.p
              className="hero-cinematic__lead"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              Portalapicero con soporte de celular. Elige color, selección y extras plus — desde{' '}
              {formatBs(PRODUCTO_BASE.price)}.
            </motion.p>
            <motion.div
              className="hero-cinematic__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              <Link to="/personalizar" className="btn btn-primary btn--lg">
                Quiero el mío — {formatBs(PRODUCTO_BASE.price)}
              </Link>
              <Link to="/mundial" className="btn btn-ghost">
                Centro del Mundial
              </Link>
            </motion.div>
            <motion.div
              className="hero-cinematic__chips"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="chip chip--glass">Soporte celular incluido</span>
              <span className="chip chip--glass">Base UNIFRANZ</span>
              <span className="chip chip--glass">Desde {formatBs(PRODUCTO_BASE.price)}</span>
            </motion.div>
          </div>
          <div className="hero-cinematic__product hero-cinematic__product--enter">
            <HeroProduct />
          </div>
        </div>
        <MarqueeStrip />
      </section>

      <SectionWrap>
        <PageHeader
          center
          eyebrow="Faltan pocos días"
          title="Cuenta regresiva al"
          highlight="Mundial 2026"
          description="11 de junio de 2026 · Estados Unidos, México y Canadá."
        />
        <motion.div
          className="countdown-stage mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <MediaImage
            src={SITE_IMAGES.countdown.src}
            fallback={SITE_IMAGES.countdown.fallback}
            alt={SITE_IMAGES.countdown.alt}
            aspect="wide"
            className="countdown-stage__bg"
            overlay={<div className="countdown-stage__overlay" />}
          />
          <div className="countdown-stage__content">
            <Countdown />
          </div>
        </motion.div>
      </SectionWrap>

      <SectionWrap alt>
        <PageHeader
          center
          eyebrow="El producto"
          title="¿Por qué te va a"
          highlight="gustar?"
          description="Práctico para estudiar o trabajar y con onda futbolera."
        />
        <StaggerGrid className="editorial-grid editorial-grid--4 mt-14">
          {PRODUCT_FEATURES.map((item, i) => (
            <StaticEditorialCard
              key={item.title}
              featured={i === 0}
              imageSrc={FEATURE_IMAGES[item.icon]}
              imageAlt={item.title}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </StaggerGrid>
      </SectionWrap>

      <SectionWrap>
        <PageHeader
          center
          eyebrow="Fotos reales"
          title="Visto desde"
          highlight="todos los ángulos"
          description="Impreso en 3D: frente con soporte de celular, laterales, vista superior y más."
        />
        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ProductGallery views={PRODUCT_VIEWS_4} defaultId="front" priority />
        </motion.div>
      </SectionWrap>

      <SectionWrap alt>
        <PageHeader
          center
          title="Un solo"
          highlight="producto"
          description={`${PRODUCTO_BASE.name}: balón organizador con ranura para celular. Suma extras plus si quieres más compartimentos.`}
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">
          <motion.article
            className="card overflow-hidden h-full flex flex-col"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)]">
              <ProductGallery views={PRODUCT_VIEWS_4} defaultId="front" priority />
            </div>
            <div className="card-body flex flex-col flex-1">
              <span className="chip chip--gold w-fit">Incluye soporte de celular</span>
              <h3 className="heading-md mt-4">{PRODUCTO_BASE.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted flex-1">{PRODUCTO_BASE.desc}</p>
              <p className="price-tag price-tag--lg mt-6">{formatBs(PRODUCTO_BASE.price)}</p>
              <Link to="/personalizar" className="btn btn-primary mt-5 w-full">
                Personalizar el mío
              </Link>
            </div>
          </motion.article>
          <StaggerGrid className="editorial-grid editorial-grid--2">
            {PLUS_OPCIONES.map((o) => (
              <StaggerItem key={o.id}>
                <motion.article
                  className="card card-body h-full text-left"
                  whileHover={{ y: -4, borderColor: 'rgba(201, 162, 39, 0.35)' }}
                >
                  <span className="chip chip--muted w-fit text-[10px]">Plus</span>
                  <h3 className="heading-md mt-3">{o.label}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{o.desc}</p>
                  <p className="price-tag price-tag--sm mt-4">+{formatBs(o.price)}</p>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </SectionWrap>

      <SectionWrap alt>
        <PageHeader
          center
          title="Centro del"
          highlight="Mundial 2026"
          description={`${MUNDIAL_META.totalTeams} selecciones · ${MUNDIAL_META.totalStadiums} estadios · ${MUNDIAL_META.totalMatches} partidos.`}
        />
        <StaggerGrid className="editorial-grid editorial-grid--4 mt-12">
          {MUNDIAL_TOPICS.map((topic, i) => (
            <StaggerItem key={topic.id}>
              <EditorialCard
                to={`/mundial?seccion=${topic.id}`}
                imageSrc={topic.image}
                imageAlt={topic.image?.alt ?? topic.label}
                icon={topic.icon}
                label={topic.label}
                teaser={topic.teaser}
                featured={i === 0}
              />
            </StaggerItem>
          ))}
        </StaggerGrid>
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/mundial" className="btn btn-primary btn--lg">
            Abrir centro completo del Mundial
          </Link>
        </motion.div>
      </SectionWrap>

      <SectionWrap>
        <PageHeader
          center
          eyebrow="Próximamente"
          title="Ideas para el"
          highlight="futuro"
          description="Versiones más inteligentes del GoalDesk."
        />
        <StaggerGrid className="content-grid content-grid--future mt-14">
          {FUTURE_FEATURES.map((f) => (
            <StaggerItem key={f.title}>
              <motion.article
                className="grid-cell card card-body h-full text-left"
                whileHover={{ y: -4, borderColor: 'rgba(201, 162, 39, 0.4)' }}
              >
                <span className="chip chip--muted w-fit text-[10px]">{f.tag}</span>
                <h3 className="heading-md mt-4">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.desc}</p>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </SectionWrap>

      <section className="section-block cta-cinematic">
        <motion.div
          className="cta-cinematic__bg-wrap"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MediaImage
            src={SITE_IMAGES.product.src}
            fallback={SITE_IMAGES.product.fallback}
            alt={SITE_IMAGES.product.alt}
            aspect="cinematic"
            rounded={false}
            className="cta-cinematic__bg"
          />
        </motion.div>
        <div className="cta-cinematic__shade" aria-hidden />
        <motion.div
          className="section-centered cta-cinematic__content max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display heading-display--sm">¿Listo para el tuyo?</h2>
          <p className="hero-cinematic__lead mt-5 text-center">
            Color, selección y extras plus en pocos pasos. Desde {formatBs(PRODUCTO_BASE.price)}.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/personalizar" className="btn btn-primary btn--lg">
              Empezar mi pedido
            </Link>
            <Link to="/qr" className="btn btn-ghost">
              Tengo código QR
            </Link>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
