import { Link, useSearchParams } from 'react-router-dom';
import EditorialCard from '../components/ui/EditorialCard';
import MundialPanels from '../components/mundial/MundialPanels';
import Countdown from '../components/Countdown';
import { MUNDIAL_TOPICS, MUNDIAL_META } from '../data/mundial2026';
import MediaImage from '../components/ui/MediaImage';
import { SITE_IMAGES } from '../data/siteImages';
import MotionBackdrop from '../components/motion/MotionBackdrop';
import MarqueeStrip from '../components/motion/MarqueeStrip';

const DEFAULT_SECTION = 'resumen';

export default function MundialHubPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const section = searchParams.get('seccion') || DEFAULT_SECTION;
  const activeTopic =
    MUNDIAL_TOPICS.find((t) => t.id === section) ?? MUNDIAL_TOPICS[0];

  const setSection = (id) => {
    setSearchParams({ seccion: id }, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mundial-hub mundial-hub--premium">
      <section className="hero-cinematic hero-cinematic--short">
        <MediaImage
          src={SITE_IMAGES.football.src}
          fallback={SITE_IMAGES.football.fallback}
          alt={SITE_IMAGES.football.alt}
          aspect="cinematic"
          rounded={false}
          priority
          className="hero-cinematic__bg"
        />
        <MotionBackdrop intensity="light" />
        <div className="hero-cinematic__shade" aria-hidden />
        <div className="hero-cinematic__grid container-app">
          <div className="hero-cinematic__content">
            <Link to="/" className="mundial-hub__back">
              ← Volver al inicio
            </Link>
            <p className="eyebrow eyebrow--light mt-6">Centro informativo</p>
            <h1 className="heading-display heading-display--sm mt-3">
              Mundial <span className="accent-word">2026</span>
            </h1>
            <p className="hero-cinematic__lead">
              {MUNDIAL_META.totalTeams} selecciones · {MUNDIAL_META.totalMatches} partidos ·{' '}
              {MUNDIAL_META.hosts.join(', ')}.
            </p>
          </div>
          <div className="countdown-stage countdown-stage--inline">
            <Countdown />
          </div>
        </div>
        <MarqueeStrip />
      </section>

      <section className="section-block">
        <div className="section-centered mundial-hub__layout">
          <aside className="mundial-hub__nav" aria-label="Temas del Mundial">
            <p className="mundial-hub__nav-title">Elige un tema</p>
            <div className="mundial-topic-nav">
              {MUNDIAL_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSection(topic.id)}
                  className={`mundial-topic-pill${
                    section === topic.id ? ' mundial-topic-pill--active' : ''
                  }`}
                  aria-current={section === topic.id ? 'true' : undefined}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="mundial-hub__content">
            <header className="mundial-hub__content-head">
              <h2 className="heading-lg">{activeTopic.label}</h2>
              <p className="mt-2 text-muted">{activeTopic.teaser}</p>
            </header>
            <MundialPanels section={section} />
          </div>
        </div>
      </section>

      <section className="section-block section-block--alt border-t border-[var(--border-subtle)]">
        <div className="section-centered max-w-xl text-center">
          <h2 className="heading-lg">¿Quieres tu GoalDesk del Mundial?</h2>
          <p className="text-lead mx-auto mt-4">
            Personaliza color, selección y extras plus en tu portalapicero. Ideal para regalo o
            para tu escritorio en
            UNIFRANZ.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/personalizar" className="btn btn-primary">
              Crear el mío
            </Link>
            <Link to="/catalogo" className="btn btn-secondary">
              Ver precios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
