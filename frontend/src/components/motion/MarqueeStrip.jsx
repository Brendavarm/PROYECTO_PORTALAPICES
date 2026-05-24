import { MUNDIAL_META } from '../../data/mundial2026';

const ITEMS = [
  'MUNDIAL 2026',
  `${MUNDIAL_META.totalTeams} SELECCIONES`,
  `${MUNDIAL_META.totalMatches} PARTIDOS`,
  'EE. UU. · MÉXICO · CANADÁ',
  'GOALDESK SMART',
  'UNIFRANZ',
];

export default function MarqueeStrip() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee-strip" aria-hidden>
      <div className="marquee-strip__track">
        {track.map((text, i) => (
          <span key={i} className="marquee-strip__item">
            {text}
            <span className="marquee-strip__dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
