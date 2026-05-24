import { useTheme } from '../context/ThemeContext';

const labels = { system: 'Sistema', dark: 'Oscuro', light: 'Claro' };

export default function ThemeToggle({ className = '' }) {
  const { mode, cycleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={`rounded-full border border-gold/30 px-3 py-1.5 text-xs text-slate-300 transition hover:border-gold hover:text-gold ${className}`}
      title={`Tema: ${labels[mode]}. Clic para cambiar.`}
      aria-label={`Cambiar tema. Actual: ${labels[mode]}`}
    >
      {labels[mode]}
    </button>
  );
}
