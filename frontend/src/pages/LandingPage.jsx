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
import { FUTURE_FEATURES, MODELOS } from '../data/constants';
import { MUNDIAL_TOPICS, MUNDIAL_META } from '../data/mundial2026';
import { SITE_IMAGES, FEATURE_IMAGES, MODEL_IMAGES } from '../data/siteImages';

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

function StaticEditorialCard({ featured, imageSrc, imageAlt, icon, title, desc, children }) {
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
            src={imageSrc}
            alt={imageAlt}
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
    <div className="landing-page landing-page--premium landing-page--motion">
      <section className="hero-cinematic">
        <motion.div
          className="hero-cinematic__bg-wrap"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <MediaImage
            src={SITE_IMAGES.hero.src}
            fallback={SITE_IMAGES.hero.fallback}
            alt={SITE_IMAGES.hero.alt}
            aspect="cinematic"
            rounded={false}
            priority
            className="hero-cinematic__bg"
          />
        </motion.div>
        <MotionBackdrop intensity="medium" />
        <div className="hero-cinematic__shade" aria-hidden />
        <div className="hero-cinematic__grid container-app">
          <div className="hero-cinematic__content">
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
              Organizador impreso en 3D. Elige modelo, color y selección — pídelo en minutos.
            </motion.p>
            <motion.div
              className="hero-cinematic__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              <Link to="/personalizar" className="btn btn-primary btn--lg">
                Quiero el mío — {formatBs(50)}
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
              {MODELOS.map((m) => (
                <span key={m.id} className="chip chip--glass">
                  {m.name} · {formatBs(m.price)}
                </span>
              ))}
            </motion.div>
          </div>
          <div className="hero-cinematic__product">
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
          title="Elige tu"
          highlight="modelo"
          description="Empieza en Bs 50. Cada plan suma Bs 10."
        />
        <StaggerGrid className="editorial-grid editorial-grid--3 mt-14">
          {MODELOS.map((m, i) => (
            <StaticEditorialCard
              key={m.id}
              featured={i === 1}
              imageSrc={MODEL_IMAGES[m.id]?.src}
              imageAlt={MODEL_IMAGES[m.id]?.alt ?? m.name}
              title={m.name}
              desc={m.desc}
            >
              {i === 1 ? (
                <span className="chip chip--gold mb-3 w-fit">Recomendado</span>
              ) : null}
              <p className="price-tag price-tag--lg mt-3">{formatBs(m.price)}</p>
              <Link to="/personalizar" className="btn btn-primary mt-5 w-full">
                Elegir {m.name}
              </Link>
            </StaticEditorialCard>
          ))}
        </StaggerGrid>
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
                imageSrc={topic.image?.src}
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
            Color, selección y modelo en pocos pasos. Desde {formatBs(50)}.
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
    </div>
  );
}
