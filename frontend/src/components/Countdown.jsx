import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORLD_CUP_DATE } from '../data/constants';

function getTimeLeft() {
  const diff = WORLD_CUP_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const units = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Minutos' },
  { key: 'seconds', label: 'Segundos' },
];

function CountdownDigit({ value }) {
  const text = String(value).padStart(2, '0');

  return (
    <span className="countdown-digit">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          className="countdown-digit__value"
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="countdown-row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {units.map((u, i) => (
        <motion.div
          key={u.key}
          className="countdown-box card px-5 py-4 text-center md:px-6 md:py-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55 + i * 0.08, duration: 0.4 }}
          whileHover={{ scale: 1.04, borderColor: 'rgba(201, 162, 39, 0.5)' }}
        >
          <CountdownDigit value={time[u.key]} />
          <span className="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted">
            {u.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
