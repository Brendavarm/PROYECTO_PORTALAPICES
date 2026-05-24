import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'goaldesk-theme';

const ThemeContext = createContext(null);

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function resolveTheme(mode) {
  if (mode === 'system') return getSystemTheme();
  return mode;
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'system';
  });
  const [resolved, setResolved] = useState(() => resolveTheme(mode));

  useEffect(() => {
    const next = resolveTheme(mode);
    setResolved(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    if (mode !== 'system') return undefined;

    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      const next = getSystemTheme();
      setResolved(next);
      document.documentElement.setAttribute('data-theme', next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mode]);

  const cycleTheme = () => {
    setMode((current) => {
      if (current === 'system') return 'dark';
      if (current === 'dark') return 'light';
      return 'system';
    });
  };

  const label =
    mode === 'system' ? `Auto (${resolved})` : mode === 'dark' ? 'Oscuro' : 'Claro';

  return (
    <ThemeContext.Provider value={{ mode, resolved, setMode, cycleTheme, label }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return ctx;
}
