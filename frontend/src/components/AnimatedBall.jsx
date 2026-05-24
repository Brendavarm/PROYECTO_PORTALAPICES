import { motion } from 'framer-motion';

export default function AnimatedBall({ className = '' }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ y: [0, -20, 0], rotate: [0, 360] }}
      transition={{
        y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
      }}
    >
      <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-white via-slate-200 to-slate-400 shadow-2xl glow-gold md:h-48 md:w-48">
        <div className="absolute inset-0 rounded-full border-2 border-slate-600/30" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full p-2 opacity-60">
          <polygon
            points="50,10 65,30 50,50 35,30"
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
          <polygon
            points="50,50 65,70 50,90 35,70"
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#1e293b" strokeWidth="1" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="#1e293b" strokeWidth="1" />
        </svg>
      </div>
      <motion.div
        className="absolute -bottom-4 left-1/2 h-4 w-20 -translate-x-1/2 rounded-full bg-black/40 blur-md"
        animate={{ scaleX: [1, 0.7, 1], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
