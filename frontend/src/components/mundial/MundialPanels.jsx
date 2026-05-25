import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FifaFactsPanel from '../FifaFactsPanel';
import MediaImage from '../ui/MediaImage';
import PanelHero from './PanelHero';
import { STADIUM_IMAGES, MUNDIAL_SECTION_IMAGES, resolveImage } from '../../data/siteImages';
import {
  MUNDIAL_META,
  QUALIFIED_TEAMS,
  TOURNAMENT_FORMAT,
  KEY_DATES,
  MUNDIAL_STADIUMS,
  HISTORY_FACTS,
  FIRST_TIME_TEAMS,
  SUDAMERICA_NOTE,
} from '../../data/mundial2026';

function ResumenPanel() {
  return (
    <div className="mundial-panel">
      <div className="mundial-stats-grid">
        <div className="mundial-stat">
          <span className="mundial-stat__value">{MUNDIAL_META.totalTeams}</span>
          <span className="mundial-stat__label">Selecciones</span>
        </div>
        <div className="mundial-stat">
          <span className="mundial-stat__value">{MUNDIAL_META.totalMatches}</span>
          <span className="mundial-stat__label">Partidos</span>
        </div>
        <div className="mundial-stat">
          <span className="mundial-stat__value">{MUNDIAL_META.totalStadiums}</span>
          <span className="mundial-stat__label">Estadios</span>
        </div>
        <div className="mundial-stat">
          <span className="mundial-stat__value">3</span>
          <span className="mundial-stat__label">Países sede</span>
        </div>
      </div>
      <div className="mundial-prose card card-body mt-8">
        <p>
          La <strong>{MUNDIAL_META.name}</strong> se juega del{' '}
          <strong>{MUNDIAL_META.startDate}</strong> al{' '}
          <strong>{MUNDIAL_META.endDate}</strong> en{' '}
          {MUNDIAL_META.hosts.join(', ')}. Es la primera Copa con{' '}
          {MUNDIAL_META.totalTeams} equipos y la edición con más partidos en la historia.
        </p>
        <p className="mt-4">
          GoalDesk Smart 2026 celebra este torneo con un organizador de escritorio temático:
          elige tu color, tu selección favorita y personaliza el tuyo desde Bolivia.
        </p>
      </div>
      <article className="mundial-highlight card card-body mt-6">
        <h3 className="heading-md">{SUDAMERICA_NOTE.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{SUDAMERICA_NOTE.text}</p>
      </article>
    </div>
  );
}

function EquiposPanel() {
  const [openId, setOpenId] = useState('conmebol');

  return (
    <div className="mundial-panel">
      <p className="mundial-panel__lead">
        Las 48 plazas están completas. Toca cada zona para ver las selecciones clasificadas.
      </p>
      <div className="mundial-accordion">
        {QUALIFIED_TEAMS.map((conf) => (
          <div key={conf.id} className="mundial-accordion__item">
            <button
              type="button"
              className={`mundial-accordion__head${
                openId === conf.id ? ' mundial-accordion__head--open' : ''
              }`}
              onClick={() => setOpenId(openId === conf.id ? '' : conf.id)}
              aria-expanded={openId === conf.id}
            >
              <span>
                <strong>{conf.name}</strong>
                <span className="mundial-accordion__slots">
                  {conf.teams.length} equipos
                </span>
              </span>
              <span className="mundial-accordion__chevron" aria-hidden>
                {openId === conf.id ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {openId === conf.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mundial-accordion__body"
                >
                  <p className="text-sm text-muted">{conf.note}</p>
                  <ul className="mundial-teams-list">
                    {conf.teams.map((t) => (
                      <li key={t.name} className="mundial-team-chip">
                        <span className="mundial-team-chip__flag">{t.flag}</span>
                        <span className="mundial-team-chip__name">{t.name}</span>
                        {t.debut && (
                          <span className="mundial-team-chip__tag">Debut</span>
                        )}
                        {t.note && (
                          <span className="mundial-team-chip__note">{t.note}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormatoPanel() {
  return (
    <div className="mundial-panel">
      <p className="mundial-panel__lead">{TOURNAMENT_FORMAT.intro}</p>
      <div className="mundial-format-numbers">
        {TOURNAMENT_FORMAT.numbers.map((n) => (
          <div key={n.label} className="mundial-format-num card card-body">
            <span className="mundial-format-num__value">{n.value}</span>
            <span className="mundial-format-num__label">{n.label}</span>
          </div>
        ))}
      </div>
      <ol className="mundial-timeline mt-8">
        {TOURNAMENT_FORMAT.phases.map((phase, i) => (
          <li key={phase.title} className="mundial-timeline__item">
            <span className="mundial-timeline__step">{i + 1}</span>
            <div>
              <h3 className="heading-md">{phase.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{phase.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FechasPanel() {
  return (
    <div className="mundial-panel">
      <p className="mundial-panel__lead">
        Marca estas fechas. El calendario exacto de cada partido lo publica FIFA más cerca del
        torneo.
      </p>
      <ul className="mundial-dates">
        {KEY_DATES.map((d) => (
          <li key={d.title} className="mundial-dates__item card card-body">
            <time className="mundial-dates__when">{d.date}</time>
            <h3 className="heading-md mt-2">{d.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{d.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SedesPanel() {
  const [filter, setFilter] = useState('todos');
  const countries = ['todos', 'México', 'EE. UU.', 'Canadá'];
  const filtered =
    filter === 'todos'
      ? MUNDIAL_STADIUMS
      : MUNDIAL_STADIUMS.filter((s) => s.country === filter);

  return (
    <div className="mundial-panel">
      <p className="mundial-panel__lead">
        11 estadios en Estados Unidos, 3 en México y 2 en Canadá. Capacidades según datos de
        FIFA para el torneo.
      </p>
      <div className="mundial-filter-row">
        {countries.map((c) => (
          <button
            key={c}
            type="button"
            className={`fact-chip ${filter === c ? 'fact-chip--active' : ''}`}
            onClick={() => setFilter(c)}
          >
            {c === 'todos' ? 'Todos' : c}
          </button>
        ))}
      </div>
      <div className="content-grid content-grid--stadiums mt-8">
        {filtered.map((s) => {
          const stadiumImg = resolveImage(STADIUM_IMAGES[s.country]);
          return (
          <article key={s.name} className="grid-cell card card--visual overflow-hidden text-left">
            <MediaImage
              src={stadiumImg.src}
              fallback={stadiumImg.fallback}
              alt={`Estadio ${s.name}`}
              aspect="landscape"
              rounded={false}
              className="card-visual-top"
            />
            <div className="card-body">
            {s.highlight && (
              <span className="chip mb-3 w-fit text-[10px]">{s.highlight}</span>
            )}
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-gold)]">
              {s.country}
            </p>
            <h3 className="heading-md mt-2 leading-snug">{s.name}</h3>
            <p className="mt-2 text-sm text-muted">{s.city}</p>
            <p className="mt-3 text-xs text-muted">
              Capacidad (FIFA): {s.capacity} espectadores
            </p>
            </div>
          </article>
        );
        })}
      </div>
    </div>
  );
}

function HistoriaPanel() {
  return (
    <div className="mundial-panel">
      <p className="mundial-panel__lead">
        Datos que ponen en contexto por qué este Mundial es histórico.
      </p>
      <div className="content-grid content-grid--features">
        {HISTORY_FACTS.map((f, idx) => (
          <article
            key={f.title}
            className={`grid-cell card text-left ${
              idx === 0 ? 'card--visual overflow-hidden' : 'card-body'
            }`}
          >
            {idx === 0 && (
              <MediaImage
                src={MUNDIAL_SECTION_IMAGES.historia.src}
                fallback={MUNDIAL_SECTION_IMAGES.historia.fallback}
                alt="Historia del Mundial"
                aspect="banner"
                rounded={false}
                className="card-visual-top"
              />
            )}
            <div className={idx === 0 ? 'card-body' : ''}>
              <h3 className="heading-md">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function DebutantesPanel() {
  return (
    <div className="mundial-panel">
      <p className="mundial-panel__lead">
        Estas selecciones nunca habían estado en un Mundial masculino (o vuelven tras muchos
        años). Su clasificación es noticia mundial.
      </p>
      <ul className="mundial-debut-list">
        {FIRST_TIME_TEAMS.map((t) => (
          <li key={t.name} className="mundial-debut card card-body">
            <span className="mundial-debut__flag">{t.flag}</span>
            <div>
              <h3 className="heading-md">{t.name}</h3>
              <p className="mt-2 text-sm text-muted">{t.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CuriosidadesPanel() {
  return (
    <div className="mundial-panel">
      <FifaFactsPanel />
    </div>
  );
}

const PANELS = {
  resumen: ResumenPanel,
  equipos: EquiposPanel,
  formato: FormatoPanel,
  fechas: FechasPanel,
  sedes: SedesPanel,
  historia: HistoriaPanel,
  debutantes: DebutantesPanel,
  curiosidades: CuriosidadesPanel,
};

export default function MundialPanels({ section }) {
  const Panel = PANELS[section] ?? ResumenPanel;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={section}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22 }}
      >
        <PanelHero section={section} />
        <Panel />
      </motion.div>
    </AnimatePresence>
  );
}
