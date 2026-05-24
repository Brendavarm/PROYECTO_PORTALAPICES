import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <div className="h-24 w-24 rounded-full border-2 border-gold/30 border-t-gold glow-gold" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold text-gold">
          GD
        </span>
      </motion.div>
      <motion.h1
        className="font-display text-2xl font-bold gradient-text md:text-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        GoalDesk Smart 2026
      </motion.h1>
      <motion.p
        className="mt-2 text-sm text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Cargando experiencia...
      </motion.p>
      <motion.div
        className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-navy-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-gold to-gold-light"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
