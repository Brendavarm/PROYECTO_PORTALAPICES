/** Ilustración SVG del organizador GoalDesk — sin dependencia de fotos */
export default function GoalDeskIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 320 280"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gd-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e4c04d" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>
        <linearGradient id="gd-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a2d4a" />
          <stop offset="100%" stopColor="#0f1829" />
        </linearGradient>
        <filter id="gd-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="160" cy="252" rx="110" ry="14" fill="#000" opacity="0.35" />
      <path
        d="M70 95 L250 95 L265 210 L55 210 Z"
        fill="url(#gd-body)"
        stroke="url(#gd-gold)"
        strokeWidth="2"
      />
      <path d="M85 110 L235 110 L245 125 L75 125 Z" fill="#152238" opacity="0.9" />
      <rect x="95" y="130" width="50" height="55" rx="6" fill="#0c1222" stroke="#3b82f6" strokeWidth="1.5" opacity="0.8" />
      <rect x="155" y="130" width="70" height="35" rx="6" fill="#0c1222" stroke="url(#gd-gold)" strokeWidth="1.5" opacity="0.8" />
      <rect x="155" y="172" width="70" height="28" rx="6" fill="#0c1222" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
      <rect x="118" y="55" width="84" height="48" rx="10" fill="#1a2438" stroke="url(#gd-gold)" strokeWidth="2" />
      <rect x="128" y="62" width="64" height="34" rx="4" fill="#0f1628" />
      <circle cx="160" cy="78" r="6" fill="url(#gd-gold)" filter="url(#gd-glow)" />
      <path
        d="M130 200 Q160 188 190 200"
        fill="none"
        stroke="url(#gd-gold)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="55" cy="75" r="22" fill="none" stroke="url(#gd-gold)" strokeWidth="2" opacity="0.5" />
      <path
        d="M45 75 L52 82 L68 66"
        fill="none"
        stroke="#e4c04d"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="160" y="248" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="system-ui">
        GoalDesk Smart
      </text>
    </svg>
  );
}
