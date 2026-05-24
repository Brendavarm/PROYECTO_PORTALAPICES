const paths = {
  ball: (
    <circle cx="12" cy="12" r="9" strokeWidth="1.5" fill="none" stroke="currentColor" />
  ),
  phone: (
    <rect x="7" y="3" width="10" height="18" rx="2" strokeWidth="1.5" fill="none" stroke="currentColor" />
  ),
  box: (
    <path d="M4 8l8-4 8 4v8l-8 4-8-4V8z" strokeWidth="1.5" fill="none" stroke="currentColor" />
  ),
  palette: (
    <path d="M12 3a9 9 0 100 18h1.5a1.5 1.5 0 001.5-1.5V18" strokeWidth="1.5" fill="none" stroke="currentColor" />
  ),
  catalog: (
    <path d="M4 6h16M4 12h16M4 18h10" strokeWidth="1.5" strokeLinecap="round" stroke="currentColor" />
  ),
  link: (
    <path d="M10 14a4 4 0 005.66 0l2-2a4 4 0 00-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0l-2 2a4 4 0 005.66 5.66l1-1" strokeWidth="1.5" fill="none" stroke="currentColor" />
  ),
  shield: (
    <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" strokeWidth="1.5" fill="none" stroke="currentColor" />
  ),
  chart: (
    <path d="M4 19V9M10 19V5M16 19v-6M22 19V3" strokeWidth="1.5" strokeLinecap="round" stroke="currentColor" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" strokeWidth="1.5" fill="none" stroke="currentColor" />
    </>
  ),
  money: (
    <path d="M12 3v18M8 7h6a3 3 0 110 6H10a3 3 0 100 6h6" strokeWidth="1.5" fill="none" stroke="currentColor" />
  ),
  check: (
    <path d="M5 12l4 4 10-10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
  ),
  eye: (
    <>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
        strokeWidth="1.5"
        fill="none"
        stroke="currentColor"
      />
      <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" fill="none" stroke="currentColor" />
    </>
  ),
  eyeOff: (
    <>
      <path
        d="M10.6 10.6a2.5 2.5 0 003.4 3.4M9.1 9.1A2.5 2.5 0 0112 9.5c2.2 0 4.3 1.5 6 4.5-1 1.6-2.2 2.8-3.5 3.6M6.7 6.7C4.6 8.1 3 10 2 12c1.7 3 3.8 4.5 6 4.5 1 0 1.9-.2 2.7-.6M3 3l18 18"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke="currentColor"
      />
    </>
  ),
};

export default function FeatureIcon({ name, className = 'h-6 w-6 text-gold' }) {
  const content = paths[name];
  if (!content) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {content}
    </svg>
  );
}
